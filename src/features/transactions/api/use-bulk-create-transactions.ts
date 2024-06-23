import { toast } from 'sonner'

import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.transactions)['bulk-create']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.transactions)['bulk-create']['$post']
>['json']

export const useBulkCreateTransactions = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions['bulk-create'].$post({
        json,
      })
      const data = await response.json()
      return data
    },
    onSuccess: () => {
      toast.success('Transactions created')
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: (err) => {
      console.error('Faile to create', err)
      toast.error('Failed to create transactions')
    },
  })

  return mutation
}
