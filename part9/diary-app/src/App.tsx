import { useState, useEffect } from 'react';
import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' }>({ message: '', type: 'success' });

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const fetchedDiaries = await getAllDiaries();
      setDiaries(fetchedDiaries);
    } catch (error) {
      console.error('Error fetching diaries:', error);
      setNotification({ message: 'Failed to fetch diaries', type: 'error' });
    }
  };

  const handleSubmit = async (newDiary: NewDiaryEntry) => {
    try {
      const createdDiary = await createDiary(newDiary);
      setDiaries(diaries.concat(createdDiary));
      setNotification({ message: 'Diary entry created successfully!', type: 'success' });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setNotification({ message: '', type: 'success' });
      }, 3000);
    } catch (error) {
      let errorMessage = 'Failed to create diary entry';
      
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data || errorMessage;
      }
      
      setNotification({ message: errorMessage, type: 'error' });
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setNotification({ message: '', type: 'error' });
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      <Notification message={notification.message} type={notification.type} />
      <DiaryForm onSubmit={handleSubmit} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
