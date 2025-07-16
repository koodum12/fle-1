import React from 'react';

import {Route,Routes,BrowserRouter} from 'react-router-dom';

import './App.css';
import './index.css';

import './api/API.js';

import StartPage from './page/StartPage';
import QuizPage1 from './page/QuizPage1';
import QuizPage2 from './page/QuizPage2';
import QuizPage3 from './page/QUizPage3';

function App() {
    
  return (
    <div>
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/Quiz1' element={<QuizPage1/>} />
        <Route path='/Quiz2' element={<QuizPage2 />} />
        <Route path='/Quiz3' element={<QuizPage3 />}/>
      </Routes>
    </div>
  )
}

export default App
