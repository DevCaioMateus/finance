import { z } from 'zod'

import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { useCreateAccount } from '@/features/accounts/api/use-create-accounts'
import { AccountForm } from '@/features/accounts/components/account-form'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { insertAccountSchema } from '@/db/schema'

const formSchema = insertAccountSchema.pick({ name: true })

export type FormValues = z.input<typeof formSchema>

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount()

  const mutation = useCreateAccount()

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Nova conta</SheetTitle>
          <SheetDescription>
            Crie uma nova conta para administrar suas transações.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: '' }}
        />
      </SheetContent>
    </Sheet>
  )
}
