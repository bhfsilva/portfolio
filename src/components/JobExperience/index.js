import styles from "./jobExperienceComponent.module.scss";
import { useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

export default function JobExperience({organizationLogo, organizationName, position, startMonthYear, endMonthYear, skills, tasks, showTaskListOption}) {

  const [showTaskListState, setShowTaskList] = useState(showTaskListOption);

  return (
    <div className="custom-container padding-20-px border-radius-10-px display-flex flex-direction-column gap-10-px">
      <div className="display-flex justify-content-space-between">
        <div className="display-flex gap-25-px align-items-center">
          <img src={organizationLogo} alt={`${organizationName} logo`} className="height-120-px width-120-px"/>
          <div className="display-flex flex-direction-column justify-content-center gap-10-px">
            <div className="display-flex align-items-center gap-3-px">
              <MdOutlineCalendarMonth className="font-size-25-px"/>
              <p>De {startMonthYear} até {endMonthYear ? endMonthYear : "atualmente"}</p>
            </div>
            <h3 className="font-weight-500">{position}</h3>
            <h4 className="font-weight-500">{organizationName}</h4>
          </div>
        </div>
        <button
          onClick={() => setShowTaskList(!showTaskListState)}
          className={`
            ${styles.showTasksButton}
            ${showTaskListState ? styles.rotateButton : ""}
            font-size-2-rem display-flex align-items-center justify-content-center width-50-px height-50-px border-radius-40-px
          `}>
          <FiChevronDown className="margin-top-2-px"/>
        </button>
      </div>
      <div className="display-flex flex-flow-wrap gap-5-px">
        <b className="font-weight-600">Tecnologias:</b>
        {skills.map((skill, index) => (
          <p key={`${index}-skill`} className={`${index == skills.length - 1 ? styles.dotEnd : styles.slashSeparated}`}>
            {skill}
          </p>
        ))}
      </div>
      {showTaskListState && <ul className="font-size-1-rem">
        {tasks.map((task, index) => (
          <li key={`${index}-task`} className="line-height-30-px margin-bottom-5-px">
            {task}
          </li>
        ))}
      </ul>}
    </div>
  )
}