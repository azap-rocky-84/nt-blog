import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import HomePage from './pages/home/HomePage';
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';

function App() {
  return (
    <div className="App font-opensans">
      <Router>
        <Routes>
          <Route index path='/' element={<HomePage/>}/>
          <Route path='/blog/:slug' element={<ArticleDetailPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/profile' element={<ProfilePage/>}></Route>
        </Routes>
      </Router>
      <Toaster/>
    </div>
  );
}

export default App;
