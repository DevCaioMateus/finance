import { toast } from 'sonner'

import { InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.categories)[':id']['$delete']
>

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      console.log('Sending request with json:', json)
      const response = await client.api.categories[':id'].$delete({
        param: { id },
      })
      const data = await response.json()
      return data
    },
    onSuccess: () => {
      toast.success('Category deleted')
      queryClient.invalidateQueries({ queryKey: ['category', { id }] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      // TODO: Invalidate summary and transactions
    },
    onError: (err) => {
      console.error('Faile to update', err)
      toast.error('Failed to delete category')
    },
  })

  return mutation
}