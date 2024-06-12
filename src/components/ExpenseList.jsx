import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Section } from '../pages/Home';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  span {
    font-size: 16px;
    color: #333;
  }

  span:last-child {
    font-weight: bold;
    color: #007bff;
    flex-shrink: 0;
  }
`;

const ExpenseDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    &:first-child {
      margin-bottom: 5px;
      color: #666;
      font-size: 14px;
    }

    &:last-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  }
`;

const NoExpensesMessage = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  padding: 20px;
  margin-top: 20px;
`;

const ExpenseList = ({ expenses, userData }) => {
  const navigate = useNavigate();

  const handleItemClick = (expense) => {
    if (expense.createdBy === userData.nickname) {
      navigate(`/detail/${expense.id}`);
    } else {
      toast.error('본인의 지출만 수정할 수 있습니다.');
    }
  };

  return (
    <Section>
      {expenses.length === 0 ? (
        <NoExpensesMessage>지출이 없습니다.</NoExpensesMessage>
      ) : (
        <ExpenseItemList>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              onClick={() => handleItemClick(expense)}
            >
              <ExpenseDetails>
                <span>{expense.date}</span>
                <span>{`${expense.item} - ${expense.description} (by ${expense.createdBy})`}</span>
              </ExpenseDetails>
              <span>{expense.amount.toLocaleString()} 원</span>
            </ExpenseItem>
          ))}
        </ExpenseItemList>
      )}
    </Section>
  );
};

export default ExpenseList;
