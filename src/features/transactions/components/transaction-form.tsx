import { z } from 'zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { inserTransactionSchema } from '@/db/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

import { Select } from '@/components/select'
import { DatePicker } from '@/components/date-picker'
import { AmountInput } from '@/components/amount-input'

import { convertAmountToMiliunits } from '@/lib/utils'

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
})

const apiSchema = inserTransactionSchema.omit({ id: true })

type FormValues = z.input<typeof formSchema>
type ApiFormValues = z.input<typeof apiSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (values: ApiFormValues) => void
  onDelete?: () => void
  disabled?: boolean
  accountOptions: { label: string; value: string }[]
  categoryOptions: { label: string; value: string }[]
  onCreateAccount: (name: string) => void
  onCreateCategory: (name: string) => void
}

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const handleSubmit = (values: FormValues) => {
    const amount = parseFloat(values.amount)
    const amountInMiliunits = convertAmountToMiliunits(amount)
    onSubmit({
      ...values,
      amount: amountInMiliunits,
    })
  }

  const handleDelete = () => {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta</FormLabel>
              <FormControl>
                <Select
                  placeholder="Selecione uma conta"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catogoria</FormLabel>
              <FormControl>
                <Select
                  placeholder="Selecione uma categoria"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beneficiário</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Adicione um beneficiário"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <AmountInput
                  {...field}
                  disabled={disabled}
                  placeholder="0.00"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  disabled={disabled}
                  placeholder="Observações opcionais"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? 'Salvar mudanças' : 'Criar transação'}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Deletar transação
          </Button>
        )}
      </form>
    </Form>
  )
}
