import { Route, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationContainer from './components/NotificationContainer/NotificationContainer';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import NewsPage from './pages/NewsPage/NewsPage';
import NoticesPage from './pages/NoticesPage/NoticesPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AddPetPage from './pages/AddPetPage/AddPetPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <NotificationProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="notices" element={<NoticesPage />} />
            <Route path="friends" element={<FriendsPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="add-pet" element={<AddPetPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <NotificationContainer />
      </UserProvider>
    </NotificationProvider>
  );
}

export default App;
