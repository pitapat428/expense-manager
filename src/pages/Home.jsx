import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MonthNavigation from '../components/MonthNavigation';
import ExpenseList from '../components/ExpenseList';
import CreateExpense from '../components/CreateExpense';
import ExpenseSummary from '../components/ExpenseSummary';
import { useAuth } from '../context/AuthContext';

const Container = styled.main`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;

export const Section = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
`;

const fetchExpenses = async () => {
  const { data } = await axios.get('http://localhost:5000/expenses');
  return data;
};

export default function Home() {
  const [month, setMonth] = useState(1);
  const { userData } = useAuth();

  const {
    data: expenses = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses,
  });

  const [localExpenses, setLocalExpenses] = useState([]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const filteredExpenses =
    localExpenses.length > 0
      ? localExpenses.filter((expense) => expense.month === month)
      : expenses.filter((expense) => expense.month === month);

  const handleSetExpenses = (newExpenses) => {
    setLocalExpenses(newExpenses);
  };

  return (
    <Container>
      <MonthNavigation month={month} setMonth={setMonth} />
      <CreateExpense
        month={month}
        expenses={localExpenses.length > 0 ? localExpenses : expenses}
        setExpenses={handleSetExpenses}
        userData={userData}
      />
      <ExpenseSummary month={month} expenses={filteredExpenses} />
      <ExpenseList expenses={filteredExpenses} userData={userData} />
    </Container>
  );
}
