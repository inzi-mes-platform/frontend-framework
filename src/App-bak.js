import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import Home from './Home';
import CheckIfHoliday from './CheckIfHoliday';
import NoFound from './NoFound';
import PackForHoliday from './PackForHoliday';
import PackForWork from './PackForWork';
import TodoList from './TodoList';

function App() {
  return (
    <BrowserRouter>
        <div>
            <h3>메뉴</h3>
            <ul>
                <Link to="/todo-list"><li>나의할일</li></Link>
                <Link to="/check-if-holiday"><li>휴일체크</li></Link>
                <Link to="/pack-for-holiday"><li>휴일진행</li></Link>
                <Link to="/pack-for-work"><li>업무진행</li></Link>
            </ul>
        </div>
        <div>
           
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/todo-list" element={<TodoList/>}></Route>
                    <Route path="/check-if-holiday" element={<CheckIfHoliday />}></Route>
                    <Route path="/pack-for-holiday" element={<PackForHoliday />}></Route>
                    <Route path="/pack-for-work" element={<PackForWork />}></Route>
                    <Route path="*" element={<NoFound/>}></Route>
                </Routes>
            
        </div>
    </BrowserRouter>
  );
}

export default App;