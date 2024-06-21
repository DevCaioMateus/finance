'use client'

import { useMountedState } from 'react-use'

// accounts
import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet'
import { EditAccountSheet } from '@/features/accounts/components/edit-account-sheet'

// categories
import { NewCategorySheet } from '@/features/categories/components/new-category-sheet'
import { EditCategorySheet } from '@/features/categories/components/edit-category-sheet'

// transactions
import { NewTransactionSheet } from '@/features/transactions/components/new-transaction-sheet'

export const SheetProvider = () => {
  const isMounted = useMountedState()

  if (!isMounted) return null

  return (
    <>
      {/* accounts */}
      <NewAccountSheet />
      <EditAccountSheet />
      {/* categories */}
      <NewCategorySheet />
      <EditCategorySheet />
      {/* transactions */}
      <NewTransactionSheet />
    </>
  )
}
