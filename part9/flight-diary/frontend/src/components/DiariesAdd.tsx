import { useState } from "react";
import { NewDiaryEntry, Weather, Visibility } from "../types";

type PropOnClick = { onClick: (NewDiaryEntry: NewDiaryEntry) => void };

const DiariesAdd = ({ onClick }: PropOnClick) => {
  const today = new Date().toISOString().slice(0, 10);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: today,
    weather: Weather.Sunny,
    visibility: Visibility.Ok,
    comment: " ",
  });

  const onDateChange = (et: EventTarget | null | undefined) => {
    if (et)
      setNewDiary({ ...newDiary, date: (et as HTMLTextAreaElement).value });
  };
  const onVisibilityClick = (value: Visibility) => {
    setNewDiary({ ...newDiary, visibility: value });
  };
  const onWeatherClick = (value: Weather) => {
    setNewDiary({ ...newDiary, weather: value });
  };
  const onCommentChange = (et: EventTarget | null | undefined) => {
    if (et)
    setNewDiary({ ...newDiary, comment: (et as HTMLTextAreaElement).value });
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <div>
        date{" "}
        <input
          type="date"
          value={newDiary.date}
          onChange={() => onDateChange(event?.target)}
        />
      </div>
      <div>
        visibility{" "}
        {Object.keys(Visibility).map((item) => {
          return (
            <span key={item}>
              <input
                type="radio"
                id={item}
                name="visibility"
                value={Visibility[item as keyof typeof Visibility]}
                checked={
                  newDiary.visibility ===
                  Visibility[item as keyof typeof Visibility]
                }
                onChange={() =>
                  onVisibilityClick(Visibility[item as keyof typeof Visibility])
                }
              />
              <label htmlFor={item}>{item}</label>
            </span>
          );
        })}
      </div>
      <div>
        weather
        {Object.keys(Weather).map((item) => {
          return (
            <span key={item}>
              <input
                type="radio"
                id={item}
                name="weather"
                value={Weather[item as keyof typeof Weather]}
                checked={
                  newDiary.weather === Weather[item as keyof typeof Weather]
                }
                onChange={() =>
                  onWeatherClick(Weather[item as keyof typeof Weather])
                }
              />
              <label htmlFor={item}>{item}</label>
            </span>
          );
        })}
      </div>
      <div>
        comment{" "}
        <input
          value={newDiary.comment.trim()}
          onChange={() => onCommentChange(event?.target)}
        />
      </div>
      <button onClick={() => onClick(newDiary)}>add</button>
    </div>
  );
};

export default DiariesAdd;
