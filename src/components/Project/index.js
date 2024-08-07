import styles from "./projectComponent.module.scss";

export default function Project({url, imageUrl, projectName, description, languagesList, isGridStyle}) {
  
  const sanitizedProjectName = projectName.replaceAll("-", " ")

  let formattedLanguagesList = languagesList.map(language => { 
    switch(language) {
      case "HTML":
        return "html5";
      case "CSS":
        return "css3";
      case "SCSS":
        return "sass";
      case "Dockerfile":
        return "docker";
      default:
        return language.toLowerCase();
    }
  })

  const isLongListOfLanguages = formattedLanguagesList.length >= 5;

  if (isLongListOfLanguages) {
    formattedLanguagesList.splice(0,2)
  }

  return (
    <a
      href={url}
      target="_blank"
      className={
        `${isGridStyle ? "flex-direction-column width-500-px justify-content-center" : ""}
        custom-container position-relative padding-20-px position-relative display-flex align-items-center gap-20-px border-radius-8-px ${styles.projectComponentBox} 
      `}
      >
      <img src={imageUrl} alt={`${projectName} project image`} className="width-40-percent min-width-200-px border-radius-4-px"/>
      <div className={`
        ${isGridStyle ? "text-align-center align-items-center" : ""}
        display-flex flex-direction-column gap-10-px width-100-percent height-100-percent justify-content-space-evenly`}>
        <h1
          className={`${isGridStyle ? "" : "width-70-percent"}
          text-transform-capitalize font-weight-500`}
        >
          {sanitizedProjectName}
        </h1>
        <p className="line-height-30-px font-size-18-px">{description}</p>
        <div className={`${isGridStyle ? "justify-content-center" : ""} display-flex gap-5-px flex-flow-wrap`}>
          <b className="font-weight-600">Tecnologias:</b>
          {languagesList.map((language, index) => (
            <p key={`${index}-language`} className={`${index == languagesList.length - 1 ? "" : styles.slashSeparated}`}>
              {language}
            </p>
          ))}
        </div>
      </div>
      <div className="position-absolute display-flex gap-5-px top--13-px right-30-px">
        {formattedLanguagesList.map((language, index) => (
          <div key={`${index}-${projectName}-language`} className="position-relative width-50-px height-80-px">
            <img className="width-30-px top-17-px right--11-px position-relative z-index-1" src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${language}/${language}-original.svg`} alt={`${language} logo`}/>
            <svg className="position-absolute top-2-px right-4-px" width="40" height="74" viewBox="0 0 40 74" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 5C0 2.23858 2.23858 0 5 0H35C37.7614 0 40 2.23858 40 5V74L20 59L0 74V5Z"/>
            </svg>
          </div>
        ))}
      </div>
    </a>
  )
}
