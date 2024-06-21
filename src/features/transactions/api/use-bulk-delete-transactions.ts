import { toast } from 'sonner'

import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.transactions)['bulk-delete']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.transactions)['bulk-delete']['$post']
>['json']

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions['bulk-delete'].$post({
        json,
      })
      const data = await response.json()
      return data
    },
    onSuccess: () => {
      toast.success('Transactions deleted')
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      // TODO: Also invalidate summary
    },
    onError: (err) => {
      console.error('Faile to delete', err)
      toast.error('Failed to delete transactions')
    },
  })

  return mutation
}
