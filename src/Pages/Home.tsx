import { useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [cntDate, setCntDate] = useState(new Date());
  const headText = `${cntDate.getFullYear()}년 ${cntDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        cntDate.getFullYear(),
        cntDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        cntDate.getFullYear(),
        cntDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();
      setData(
        diaryList.filter(
          (it) => firstDay <= it["date"] && it["date"] <= lastDay
        )
      );
    }
  }, [diaryList, cntDate]);

  const increaseMonth = () => {
    setCntDate(
      new Date(cntDate.getFullYear(), cntDate.getMonth() + 1, cntDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCntDate(
      new Date(cntDate.getFullYear(), cntDate.getMonth() - 1, cntDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={
          <MyButton text={"<"} type={"default"} onClick={decreaseMonth} />
        }
        rightChild={
          <MyButton text={">"} type={"default"} onClick={increaseMonth} />
        }
      />
      <DiaryList diaryList={data} />
    </div>
  );
};
export default Home;
