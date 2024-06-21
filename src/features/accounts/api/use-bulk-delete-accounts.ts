import { toast } from 'sonner'

import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.accounts)['bulk-delete']['$post']
>
type RequestType = InferRequestType<
  (typeof client.api.accounts)['bulk-delete']['$post']
>['json']

export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log('Sending request with json:', json)
      const response = await client.api.accounts['bulk-delete'].$post({
        json,
      })
      const data = await response.json()
      console.log('received response:', data)
      return data
    },
    onSuccess: () => {
      toast.success('Accounts deleted')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      // TODO: Also invalidate summary
    },
    onError: (err) => {
      console.error('Faile to delete', err)
      toast.error('Failed to delete accounts')
    },
  })

  return mutation
}