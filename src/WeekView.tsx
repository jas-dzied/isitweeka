import { useState } from "react";

type CalendarData = {
  [id: string]: Week;
}

interface WeekData {
  isWeekend: boolean,
  week: Week,
}

interface WeekViewProps {
  school: School
}

function addDays(date: Date, days: number): Date {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getWeekData(data: CalendarData): WeekData {
  const currentDate = new Date();

  let startDate = new Date();
  let isWeekend = false;

  const currentDay = currentDate.getDay();
  if (currentDay === 0 || currentDay === 6) {
    isWeekend = true;
    startDate = addDays(startDate, (currentDay + 1) % 6);
  } else {
    isWeekend = false;
    startDate = addDays(startDate, 1 - currentDay);
  }

  const year = String(startDate.getFullYear());
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const day = String(startDate.getDate()).padStart(2, '0');
  const lookupDate = year + month + day;

  if (lookupDate in data) {
    return {
      "isWeekend": isWeekend,
      "week": data[lookupDate]
    };
  } else {
    return {
      "isWeekend": isWeekend,
      "week": "unknown"
    };
  }
}

function WeekView(props: WeekViewProps) {

  const [loaded, setLoaded] = useState<boolean>(false);
  const [week, setWeek] = useState<Week>("A");
  const [isWeekend, setIsWeekend] = useState<boolean>(false);

  function findWeek(data: CalendarData) {
    const weekData = getWeekData(data);
    setWeek(weekData.week);
    setIsWeekend(weekData.isWeekend);
    setLoaded(true);
    console.log("Successfully retrieved week data for school `", props.school, "`, Results: ", weekData);
  }

  fetch(`/${props.school}/calendar.json`)
    .then(res => res.json())
    .then(json => findWeek(json));

  let message = isWeekend ? "Next week is" : "It is";
  let display;

  if (loaded && week === "unknown") {
    display = (
      <>
        <p className="main-text">We could not find out what week it is</p>
        <p className="sub-text">It may be the holiday, or the website could be broken</p>
      </>
    )
  } else if (loaded) {
    display =  (
      <>
        <p className="main-text">{message}</p>
        <p className="sub-text">Week {week}</p>
      </>
    )
  } else {
    display = (
      <p>Loading...</p>
    )
  }

  return (
    <div className="weekview">
      {display}
    </div>
  )
}

export default WeekView
