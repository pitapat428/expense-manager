import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const NavBar = styled.nav`
  background-color: rgb(51, 51, 51);
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: calc(100% - 2rem);
  top: 0px;
  z-index: 1000;
  max-width: 1240px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const LogoutButton = styled.button`
  padding: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const UserName = styled.span`
  color: white;
`;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { userData, logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <NavBar>
        <NavLinks>
          <StyledLink to="/">HOME</StyledLink>
          <StyledLink to="/profile">내 프로필</StyledLink>
        </NavLinks>
        <UserSection>
          {userData?.avatar && (
            <UserAvatar src={userData.avatar} alt="User Avatar" />
          )}
          {userData?.nickname && <UserName>{userData.nickname}</UserName>}
          <LogoutButton onClick={handleLogoutClick}>로그아웃</LogoutButton>
        </UserSection>
      </NavBar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
