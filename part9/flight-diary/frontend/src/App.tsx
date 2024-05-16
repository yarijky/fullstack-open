import { useState, useEffect } from "react";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { DiaryEntry, NewDiaryEntry } from "./types";

import diaryServices from "./services/diary";
import DiariesList from "./components/DiariesList";
import DiariesAdd from "./components/DiariesAdd";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiariesList = async () => {
      const diaries = await diaryServices.getAll();
      setDiaries(diaries);
    };
    void fetchDiariesList(); 
  }, []);

  const onAddDiary = (newDiary: NewDiaryEntry): void => {
    const fetchNewDiaryPost = async () => {
      const diary = await diaryServices.create(newDiary)
      setDiaries(diaries.concat(diary));
    }
    void fetchNewDiaryPost()
  };

  return (
    <div>
      <DiariesAdd onClick={onAddDiary} />
      <DiariesList diaries={diaries} />
    </div>
  );
};

export default App;
