import axios from "axios";
import { useEffect, useState } from "react";

import { apiBaseUrl } from "../constants";
import { DiaryEntry, NewDiaryEntry } from "./types";

import DiariesAdd from "./components/DiariesAdd";
import DiariesList from "./components/DiariesList";
import diaryServices from "./services/diary";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiariesList = async () => {
      const diaries = await diaryServices.getAll();
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, []);

  const onAddDiary = (newDiary: NewDiaryEntry): void => {
    try {
      const fetchNewDiaryPost = async () => {
        const diary = await diaryServices.create(newDiary);
        setDiaries(diaries.concat(diary));
      };
      void fetchNewDiaryPost();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setErrorMessage(e.response?.data);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <DiariesAdd onClick={onAddDiary} />
      <DiariesList diaries={diaries} />
    </div>
  );
};

export default App;
