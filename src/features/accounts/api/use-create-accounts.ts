import { toast } from 'sonner'

import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type RequestType = InferRequestType<typeof client.api.accounts.$post>['json']

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log('Sending request with json:', json)
      const response = await client.api.accounts.$post({ json })
      const data = await response.json()
      console.log('received response:', data)
      return data
    },
    onSuccess: () => {
      toast.success('Account created')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
    onError: (err) => {
      console.error('Faile to create', err)
      toast.error('Failed to create account')
    },
  })

  return mutation
}
