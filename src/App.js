import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import HomePage from './pages/home/HomePage';
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage';
import RegisterPage from './pages/register/RegisterPage';

function App() {
  return (
    <div className="App font-opensans">
      <Router>
        <Routes>
          <Route index path='/' element={<HomePage/>}/>
          <Route path='/blog/:id' element={<ArticleDetailPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
