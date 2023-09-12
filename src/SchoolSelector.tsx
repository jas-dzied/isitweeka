import { useState } from "react";

interface SchoolSelectorProps {
  callback: (value: School) => void
}

function SchoolSelector(props: SchoolSelectorProps) {

  const [school, setSchool] = useState<School>("KECHB");

  function set(value: School) {
    props.callback(value);
    setSchool(value);
  }

  return (
    <div className="school-selector">
      <button 
        onClick={() => set("KECHB")}
        className={school === "KECHB" ? "selected-school" : "unselected-school"} 
      >
        KECHB
      </button>

      <button 
        onClick={() => set("KECHG")}
        className={school === "KECHG" ? "selected-school" : "unselected-school"} 
      >
        KECHG
      </button>
    </div>
  )
}

export default SchoolSelector
