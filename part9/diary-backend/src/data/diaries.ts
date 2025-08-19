import { DiaryEntry, Weather, Visibility } from '../types';

const diaries: DiaryEntry[] = [
  {
    id: 1,
    date: '2017-01-01',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: 'Perfect flying day!'
  },
  {
    id: 2,
    date: '2017-04-15',
    weather: Weather.Rainy,
    visibility: Visibility.Poor,
    comment: 'Not a great day for flying'
  },
  {
    id: 3,
    date: '2017-04-21',
    weather: Weather.Cloudy,
    visibility: Visibility.Good,
    comment: 'Decent conditions'
  }
];

export default diaries;
