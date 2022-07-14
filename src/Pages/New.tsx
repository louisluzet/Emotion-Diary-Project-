import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const getStringDate = (date: any) => {
  return date.toISOString().slice(0, 10);
};

const New = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  return (
    <div>
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
          <div className="input-box">
            <input
              className="input-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
export default New;
