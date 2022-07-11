import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import New from "./Pages/New";
import Edit from "./Pages/Edit";
import Diary from "./Pages/Diary";
type contentProp = {
  date: any,
  content: string,
  emotion: number
}

const reducer = (state: any, action: any) => {
  let newState: any[] = [];
  switch(action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newItem = {
        ...action.data
      };
      newState = [newItem, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it: any) => it.id !== action.targetId);
      break;
    }
    case 'Edit': {
      newState = state.map((it: any) => {it.id === action.data.id ? {...action.data} : it});
      break;
    }
    default: 
      return state;
  }
  return newState
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  // CREATE
  const onCreate = ({date, content, emotion}: contentProp) => {
    dispatch({type: 'CREATE', data:{
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      emotion
    }})
    dataId.current += 1;
  }
  // REMOVE
  // EDIT

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/new' element={<New />}/>
          <Route path='/edit' element={<Edit />}/>
          <Route path='/diary/:id' element={<Diary />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
