import { toast } from 'sonner'

import { InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[':id']['$delete']
>

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      console.log('Sending request with json:', json)
      const response = await client.api.accounts[':id'].$delete({
        param: { id },
      })
      const data = await response.json()
      console.log('received response:', data)
      return data
    },
    onSuccess: () => {
      toast.success('Account deleted')
      queryClient.invalidateQueries({ queryKey: ['account', { id }] })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      // TODO: Invalidate summary
    },
    onError: (err) => {
      console.error('Faile to update', err)
      toast.error('Failed to delete account')
    },
  })

  return mutation
}
