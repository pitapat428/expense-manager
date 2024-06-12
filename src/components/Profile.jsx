import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(248, 249, 250);
  border-radius: 8px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  text-align: left;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font: inherit;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: rgb(160, 160, 160);
  }
`;

const Profile = () => {
  const { userData, token, updateProfile } = useAuth();
  const [nickname, setNickname] = useState(userData?.nickname || '');
  const [avatar, setAvatar] = useState(null);
  const [isFormValid, setIsFormValid] = useState(true);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    validateForm(e.target.value, avatar);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
    validateForm(nickname, e.target.files[0]);
  };

  const validateForm = (nickname, avatar) => {
    setIsFormValid(nickname.trim().length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', nickname);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await axios.patch(
        'https://moneyfulpublicpolicy.co.kr/profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      updateProfile(response.data.updatedUserData);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <FormContainer>
        <h2>프로필 수정</h2>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="nickname">닉네임:</Label>
          <Input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            required
            maxLength="10"
          />
          <Label htmlFor="avatar">아바타:</Label>
          <Input type="file" id="avatar" onChange={handleAvatarChange} />
          <Button type="submit" disabled={!isFormValid}>
            수정
          </Button>
        </Form>
      </FormContainer>
      <ToastContainer />
    </Container>
  );
};

export default Profile;
