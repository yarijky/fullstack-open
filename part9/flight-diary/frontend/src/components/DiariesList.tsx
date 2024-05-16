import { DiaryEntry } from "../types";

type DiariesProp = { diaries: DiaryEntry[] };

const DiariesList = ({ diaries }: DiariesProp) => {
  return (
    <div>
      <h1>{"Diary entries"}</h1>
      {diaries.map((diary) => {
        return (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <div>{`visibility: ${diary.visibility}`}</div>
            <div>{`weather: ${diary.weather}`}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DiariesList;
