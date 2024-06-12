import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 320px;
  text-align: center;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  background-color: ${({ $isActive }) =>
    $isActive ? '#007bff' : 'rgb(160, 160, 160)'};
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: ${({ theme }) =>
    theme.secondaryButtonColor || 'rgb(108, 117, 125)'};
`;

const API_URL = 'https://moneyfulpublicpolicy.co.kr';

const Login = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    nickname: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { id, password } = formData;
    setIsFormValid(
      id.length >= 4 &&
        id.length <= 10 &&
        password.length >= 4 &&
        password.length <= 15
    );
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    try {
      const url = isLogin ? `${API_URL}/login` : `${API_URL}/register`;
      console.log('Sending request to:', url);
      const response = await axios.post(url, formData);
      console.log('Response received:', response.data);

      if (isLogin) {
        login(response.data);
        navigate('/');
      } else {
        alert('회원가입 완료');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('인증 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>{isLogin ? '로그인' : '회원가입'}</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="id">아이디</Label>
          <Input
            type="text"
            id="id"
            name="id"
            placeholder="아이디"
            value={formData.id}
            onChange={handleChange}
            required
            minLength="4"
            maxLength="10"
            tabIndex="0"
          />
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="4"
            maxLength="15"
            tabIndex="0"
          />
          {!isLogin && (
            <>
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                type="text"
                id="nickname"
                name="nickname"
                placeholder="닉네임"
                value={formData.nickname}
                onChange={handleChange}
                required
                maxLength="10"
                tabIndex="0"
              />
            </>
          )}
          <Button
            type="submit"
            $isActive={isFormValid}
            tabIndex="0"
            disabled={!isFormValid}
          >
            {isLogin ? '로그인' : '회원가입'}
          </Button>
        </Form>
        <SecondaryButton onClick={() => setIsLogin(!isLogin)} tabIndex="0">
          {isLogin ? '회원가입' : '로그인'}
        </SecondaryButton>
      </FormContainer>
    </Container>
  );
};

export default Login;
