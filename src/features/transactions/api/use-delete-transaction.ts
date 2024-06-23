import { toast } from 'sonner'

import { InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[':id']['$delete']
>

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      console.log('Sending request with json:', json)
      const response = await client.api.transactions[':id'].$delete({
        param: { id },
      })
      const data = await response.json()
      console.log('received response:', data)
      return data
    },
    onSuccess: () => {
      toast.success('Transaction deleted')
      queryClient.invalidateQueries({ queryKey: ['transaction', { id }] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    },
    onError: (err) => {
      console.error('Faile to update', err)
      toast.error('Failed to delete transaction')
    },
  })

  return mutation
}
