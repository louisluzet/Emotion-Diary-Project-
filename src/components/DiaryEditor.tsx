import { useNavigate } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const getStringDate = (date: any) => {
  return date.toISOString().slice(0, 10);
};
export type emotionListProps = {
  emotion_id: number;
  emotion_img: string;
  emotion_descript: string;
};

const emotionList: emotionListProps[] = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion1.png`,
    emotion_descript: "HAPPY",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion2.png`,
    emotion_descript: "GOOD",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion3.png`,
    emotion_descript: "NOT BAD",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion4.png`,
    emotion_descript: "BAD",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `assets/emotion5.png`,
    emotion_descript: "ANGLY",
  },
];

const DiaryEditor = () => {
  const navigate = useNavigate();
  const contentRef: any = useRef();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");

  const { onCreate }: any = useContext(DiaryDispatchContext);

  const handleClickEmotion = (emotion: any) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate({date, content, emotion});
    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새로운 일기쓰기"}
        leftChild={
          <MyButton
            type={"default"}
            text={"뒤로가기"}
            onClick={() => navigate(-1)}
          />
        }
        rightChild={() => {}}
      />
      <div>
        <section>
          <h4>Today is?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 기분</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmotion}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘 하루는 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
export default DiaryEditor;
