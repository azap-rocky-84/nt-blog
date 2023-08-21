import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import HomePage from './pages/home/HomePage';
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import AdminLayout from './pages/admin/AdminLayout';
import Admin from './pages/admin/screens/Admin';
import Comment from './pages/admin/screens/comments/Comment';
import NewPost from './pages/admin/screens/posts/NewPost';
import ManagePost from './pages/admin/screens/posts/ManagePost';
import TeamsDatabase from './pages/database/TeamsDatabase';
import EditPost from './pages/admin/screens/posts/EditPost';
import AddNt from './pages/admin/screens/nt/AddNt';
import ManageNt from './pages/admin/screens/nt/ManageNt';
import EditNt from './pages/admin/screens/nt/EditNt';

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
          <Route path='/database' element={<TeamsDatabase/>}></Route>
          <Route path='/admin' element={<AdminLayout/>}>
            <Route index element={<Admin/>}/>
            <Route path="comments" element={<Comment/>}/>
            <Route path="posts/new" element={<NewPost/>}/>
            <Route path="posts/manage" element={<ManagePost/>}/>
            <Route path="posts/manage/edit/:slug" element={<EditPost/>}/>
            <Route path="nt/add" element={<AddNt/>}/>
            <Route path="nt/managent" element={<ManageNt/>}/>
            <Route path="nt/managent/editnt/:fifaCode" element={<EditNt/>}/>
          </Route>
        </Routes>
      </Router>
      <Toaster/>
    </div>
  );
}

export default App;
