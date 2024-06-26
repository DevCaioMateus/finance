import { z } from 'zod'

import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { CategoryForm } from '@/features/categories/components/category-form'
import { useGetCategory } from '@/features/categories/api/use-get-category'
import { useEditCategory } from '@/features/categories/api/use-edit-category'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { insertCategoriesSchema } from '@/db/schema'
import { Loader2 } from 'lucide-react'

import { useConfirm } from '@/hooks/use-confirm'

const formSchema = insertCategoriesSchema.pick({ name: true })

export type FormValues = z.input<typeof formSchema>

export const EditCategorySheet = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Tem certeza?',
    'Você está prestes a excluir esta categoria.',
  )

  const { isOpen, onClose, id } = useOpenCategory()

  const categoryQuery = useGetCategory(id)
  const editMutation = useEditCategory(id)
  const deleteMutation = useDeleteCategory(id)

  const isPending = editMutation.isPending || deleteMutation.isPending

  const isLoading = categoryQuery.isLoading

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  const onDelete = async () => {
    const ok = await confirm()

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        },
      })
    }
  }

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: '',
      }

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Editar categoria</SheetTitle>
            <SheetDescription>Editar uma categoria existente</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
