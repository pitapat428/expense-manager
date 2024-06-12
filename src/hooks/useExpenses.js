import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../api/expenses';

export const useExpenses = () => {
  const queryClient = useQueryClient();

  const {
    data: expenses,
    error,
    isLoading,
  } = useQuery(['expenses'], fetchExpenses);

  const addExpenseMutation = useMutation(createExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries(['expenses']);
    },
  });

  const updateExpenseMutation = useMutation(updateExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries(['expenses']);
    },
  });

  const deleteExpenseMutation = useMutation(deleteExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries(['expenses']);
    },
  });

  return {
    expenses,
    error,
    isLoading,
    addExpenseMutation,
    updateExpenseMutation,
    deleteExpenseMutation,
  };
};
