import { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "모든 감정" },
  { value: "good", name: "좋은 감정" },
  { value: "bad", name: "안좋은 감정" },
];

const ControlMenu = ({ value, onChange, optionList }: any) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it: { name: string; value: string }, idx: number) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }: any) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("lastest");
  const [filter, setFilter] = useState("all");

  /* 정렬 함수 */
  const getProcessedDiaryList = () => {
    const filterCallback = (item: { emotion: any }) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a: { date: any }, b: { date: any }) => {
      if (sortType === "oldest") {
        return parseInt(a.date) - parseInt(b.date);
      } else {
        return parseInt(b.date) - parseInt(a.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((it: { emotion: any }) => filterCallback(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            text={"새로운 일기 작성하기"}
            type={"positive"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map(
        (it: { id: number; content: string; emotion: number }) => (
          <div key={it.id}>
            {/* {it.content} 감정 점수: {it.emotion} */}
            <DiaryItem key={it.id} {...it} />
          </div>
        )
      )}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
