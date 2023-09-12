import { useState } from 'react'
import './App.css'
import SchoolSelector from './SchoolSelector';
import WeekView from './WeekView';

function App() {

  const [school, setSchool] = useState<School>("KECHB");

  return (
    <>
      <SchoolSelector
        callback = {(value) => setSchool(value)}
      />
      <WeekView
        school = {school}
      />
      <p>After weekview</p>
    </>
  )
}

export default App
