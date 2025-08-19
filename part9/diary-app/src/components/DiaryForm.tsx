import { useState } from 'react';
import type { NewDiaryEntry } from '../types';
import { Weather, Visibility } from '../types';

interface DiaryFormProps {
  onSubmit: (diary: NewDiaryEntry) => void;
}

const DiaryForm = ({ onSubmit }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const newDiary: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment
    };

    onSubmit(newDiary);
    
    // Reset form
    setDate('');
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Weather:</label>
          {Object.values(Weather).map(w => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={(e) => setWeather(e.target.value as Weather)}
              />
              {w}
            </label>
          ))}
        </div>
        
        <div>
          <label>Visibility:</label>
          {Object.values(Visibility).map(v => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
              />
              {v}
            </label>
          ))}
        </div>
        
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
