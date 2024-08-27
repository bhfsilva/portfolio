import styles from "./jobExperienceComponent.module.scss";
import { useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

export default function JobExperience({
  organizationLogo,
  organizationName,
  position,
  startMonthYear,
  endMonthYear,
  skills,
  tasks,
  showTaskListOption,
  isLoading
}) {

  const [showTaskListState, setShowTaskList] = useState(showTaskListOption);

  return (
    <div id="job-experience-component" className="custom-container padding-20-px border-radius-10-px display-flex flex-direction-column gap-10-px">
      <div id="job-experience-component-header" className="display-flex gap-20-px align-items-center position-relative">
        { !isLoading ? 
          <img src={organizationLogo} alt={`${organizationName} logo`} className="height-120-px width-120-px"/>
          :
          <div loading={isLoading.toString()} className="height-120-px width-120-px"/>
        }
        <div className="display-flex flex-direction-column justify-content-center gap-10-px">
          <div className="display-flex align-items-center gap-3-px" loading={isLoading.toString()}>
            <MdOutlineCalendarMonth className="font-size-25-px"/>
            <p>De {startMonthYear} até {endMonthYear != "null" ? endMonthYear : "atualmente"}</p>
          </div>
          <h3 className="font-weight-500" loading={isLoading.toString()}>{position}</h3>
          <h4 className="font-weight-500 width-fit-content" loading={isLoading.toString()}>{organizationName}</h4>
        </div>
        <button
          onClick={() => setShowTaskList(!showTaskListState)}
          className={`
            ${styles.showTasksButton}
            ${showTaskListState ? styles.rotateButton : ""}
            font-size-2-rem display-flex align-items-center justify-content-center width-50-px height-50-px border-radius-40-px position-absolute top--10-px right-10-px
          `}>
          <FiChevronDown className="margin-top-2-px"/>
        </button>
      </div>
      <div className="display-flex flex-flow-wrap gap-5-px" loading={isLoading.toString()}>
        <b className="font-weight-600">Tecnologias:</b>
        {skills.map((skill, index) => (
          <p key={`${index}-skill`} className={`${index == skills.length - 1 ? styles.dotEnd : styles.slashSeparated}`}>
            {skill}
          </p>
        ))}
      </div>
      {showTaskListState && <ul className="font-size-1-rem">
        {tasks.map((task, index) => (
          <li key={`${index}-task`} className="line-height-30-px margin-bottom-5-px" loading={isLoading.toString()}>
            {task}
          </li>
        ))}
      </ul>}
    </div>
  )
}