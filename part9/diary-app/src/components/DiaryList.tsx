import type { DiaryEntry } from '../types';

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>{diary.date}</h3>
          <p><strong>Weather:</strong> {diary.weather}</p>
          <p><strong>Visibility:</strong> {diary.visibility}</p>
          {diary.comment && <p><strong>Comment:</strong> {diary.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
