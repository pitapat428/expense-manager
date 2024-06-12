import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
  }

  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .save {
    background-color: #007bff;
    color: white;
  }

  .delete {
    background-color: #dc3545;
    color: white;
  }

  .back {
    background-color: #6c757d;
    color: white;
  }
`;

const fetchExpense = async (id) => {
  const { data } = await axios.get(`http://localhost:5000/expenses/${id}`);
  return data;
};

const updateExpense = async (id, updatedExpense) => {
  await axios.put(`http://localhost:5000/expenses/${id}`, updatedExpense);
};

const deleteExpense = async (id) => {
  await axios.delete(`http://localhost:5000/expenses/${id}`);
};

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);

  React.useEffect(() => {
    const getExpense = async () => {
      const data = await fetchExpense(id);
      setExpense(data);
    };
    getExpense();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await updateExpense(id, expense);
    navigate(-1);
  };

  const handleDelete = async () => {
    await deleteExpense(id);
    navigate(-1);
  };

  if (!expense) return <div>Loading...</div>;

  return (
    <Container>
      <InputGroup>
        <label htmlFor="date">날짜</label>
        <input
          type="text"
          id="date"
          name="date"
          value={expense.date}
          onChange={handleInputChange}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="item">항목</label>
        <input
          type="text"
          id="item"
          name="item"
          value={expense.item}
          onChange={handleInputChange}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="amount">금액</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleInputChange}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="description">내용</label>
        <input
          type="text"
          id="description"
          name="description"
          value={expense.description}
          onChange={handleInputChange}
        />
      </InputGroup>
      <ButtonGroup>
        <button className="save" onClick={handleSave}>
          수정
        </button>
        <button className="delete" onClick={handleDelete}>
          삭제
        </button>
        <button className="back" onClick={() => navigate(-1)}>
          뒤로 가기
        </button>
      </ButtonGroup>
    </Container>
  );
};

export default ExpenseDetail;
