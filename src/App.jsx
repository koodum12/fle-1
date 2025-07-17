import React,{useState} from 'react';

import {Route,Routes,BrowserRouter} from 'react-router-dom';

import './App.css';
import './index.css';

import './api/API.js';

import StartPage from './page/StartPage';
import QuizPage1 from './page/QuizPage1';
import QuizPage2 from './page/QuizPage2';
import QuizPage3 from './page/QUizPage3';

function App() {
  const [level, setLevel] = useState(0);
    
  return (
    <div>
      <Routes>
        <Route path='/' element={<StartPage level={level} setLevel={setLevel}/>} />
        <Route path='/Quiz1' element={<QuizPage1 setLevel={setLevel}/>} />
        <Route path='/Quiz2' element={<QuizPage2 setLevel={setLevel}/>} />
        <Route path='/Quiz3' element={<QuizPage3 setLevel={setLevel}/>}/>
      </Routes>
    </div>
  )
}

export default App
