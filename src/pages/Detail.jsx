import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Section } from '../pages/Home';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

const fetchExpense = async (id) => {
  const { data } = await axios.get(`/api/expenses/${id}`);
  return data;
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;

  label {
    margin-bottom: 5px;
    text-align: left;
  }

  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.$danger ? '#e74c3c' : '#007bff')};
  color: white;

  &:hover {
    background-color: ${(props) => (props.$danger ? '#c0392b' : '#0056b3')};
  }
`;

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [expense, setExpense] = useState(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ['expense', id],
    queryFn: () => fetchExpense(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setExpense(data);
    }
  }, [data]);

  const handleUpdate = async () => {
    try {
      await axios.patch(`/api/expenses/${id}`, expense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('지출 항목이 업데이트되었습니다.');
    } catch (error) {
      toast.error('지출 항목 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('지출 항목이 삭제되었습니다.');
      navigate('/');
    } catch (error) {
      toast.error('지출 항목 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseInt(value, 10) : value,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Section>
      <DetailContainer>
        <DetailRow>
          <label htmlFor="date">날짜</label>
          <input
            type="text"
            id="date"
            name="date"
            value={expense?.date || ''}
            onChange={handleChange}
          />
        </DetailRow>
        <DetailRow>
          <label htmlFor="item">항목</label>
          <input
            type="text"
            id="item"
            name="item"
            value={expense?.item || ''}
            onChange={handleChange}
          />
        </DetailRow>
        <DetailRow>
          <label htmlFor="amount">금액</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={expense?.amount || ''}
            onChange={handleChange}
          />
        </DetailRow>
        <DetailRow>
          <label htmlFor="description">내용</label>
          <input
            type="text"
            id="description"
            name="description"
            value={expense?.description || ''}
            onChange={handleChange}
          />
        </DetailRow>
        <ButtonGroup>
          <Button onClick={handleUpdate}>수정</Button>
          <Button $danger="true" onClick={handleDelete}>
            삭제
          </Button>
          <Button onClick={() => navigate('/')}>뒤로 가기</Button>
        </ButtonGroup>
      </DetailContainer>
      <ToastContainer />
    </Section>
  );
};

export default Detail;
