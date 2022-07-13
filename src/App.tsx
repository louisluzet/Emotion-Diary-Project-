import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import New from "./Pages/New";
import Edit from "./Pages/Edit";
import Diary from "./Pages/Diary";
type contentProp = {
  date: any;
  content: string;
  emotion: number;
};

const reducer = (state: any, action: any) => {
  let newState: any[] = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it: any) => it.id !== action.targetId);
      break;
    }
    case "Edit": {
      newState = state.map((it: { id: any }) => {
        return it.id === action.data.id ? { ...action.data } : it;
      });
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext<[] | null>([]);
export const DiaryDispatchContext = React.createContext<{} | null>({});

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: '오늘의 일기 1번',
    date: 1657687702406
  },
  {
    id: 2,
    emotion: 2,
    content: '오늘의 일기 2번',
    date: 1657687749241
  },
  {
    id: 3,
    emotion: 3,
    content: '오늘의 일기 3번',
    date: 1657687756972
  },
  {
    id: 4,
    emotion: 4,
    content: '오늘의 일기 4번',
    date: 1657687767125
  }
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);
  // CREATE
  const onCreate = ({ date, content, emotion }: contentProp) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId: number) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (
    targetId: number,
    date: Date,
    content: string,
    emotion: number
  ) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate, onEdit, onRemove
      }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
