import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id }: any = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData]: any = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it: any) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("존재하지 않는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다....</div>;
  } else {
    const cntEmotionData = emotionList.find(
      (it: { emotion_id: any }) =>
        parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))}기록`}
          leftChild={
            <MyButton
              text={"뒤로가기"}
              type={"default"}
              onClick={() => {
                navigate(-1);
              }}
            />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              type={"default"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
            <section>
                <h4>오늘의 감정</h4>
                <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                    <img src={cntEmotionData?.emotion_img} />
                    <div className="diary_emotion_descript">
                        {cntEmotionData?.emotion_descript}
                    </div>
                </div>
            </section>
            <section>
                <h4>오늘의 일기</h4>
                <div className="diary_content_wrapper">
                    <p>{data.content}</p>
                </div>
            </section>
        </article>
      </div>
    );
  }
};
export default Diary;
