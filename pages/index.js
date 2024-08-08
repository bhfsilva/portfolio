import { useEffect, useState } from "react";
import { getJobExperienceList, getSocialMediaList, getGithubRepositories } from "/services/portfolioService.js";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiGrid, FiList } from "react-icons/fi";
import { PiMaskSad } from "react-icons/pi";
import JobExperience from "/src/components/JobExperience";
import SocialMediaLink from "/src/components/SocialMediaLink";
import Project from "/src/components/Project";

function renderStatusIcon(responseStatusCode) {
    switch(responseStatusCode) {
        case 1:
            return (<AiOutlineLoading3Quarters color="gray" id="loading-icon" className="font-size-2-rem"/>);
        case 200:
            return (<IoMdCheckmark color="green" className="font-size-2-rem"/>);
        case 500:
            return (<IoMdClose color="red" className="font-size-2-rem"/>);
        default:
            return "";
    }
}

export default function Main() {
    const jobsExperiencesList = getJobExperienceList();
    const socialMediasList = getSocialMediaList();
    const [projectsList, setProjectsList] = useState([]);
    const [projectViewGrid, setProjectViewGrid] = useState(false);
    const [responseStatusGithubAPI, setResponseStatusGithubAPI] = useState(1);
    const [responseStatusNotionAPI, setResponseStatusNotionAPI] = useState(0);
    const [contactObject, setContactObject] = useState({ username: "", email: "", message: "" });

    function submitForm(event){
        setResponseStatusNotionAPI(1);
        event.preventDefault();
        setContactObject({ username: "", email: "", message: "" });
        fetch("/api/notion",
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ author: contactObject.username, contact: contactObject.email, comment: contactObject.message })
            }
        ).then(response => {
            setResponseStatusNotionAPI(response.status);
            setTimeout(() => {
                setResponseStatusNotionAPI(0);
            }, 3000);
        })
    }

    useEffect(() => {
        CSS.paintWorklet.addModule("https://unpkg.com/houdini-paint-dot-grid/dist/dot-grid-worklet.js");

        getGithubRepositories().then(data => {
            setProjectsList(data.responseList)
            setResponseStatusGithubAPI(data.responseStatus)
        });
    }, []);

  return(
    <main> 
        <header className="default-outer-container position-relative z-index-2 height-125-px align-items-center">
            <div className="default-inner-container width-100-percent display-flex align-items-center justify-content-space-between">
                <img src="/static/header/bh-logo.svg" alt="BH! Logo"/>
                <nav className="display-flex gap-35-px font-size-1-dot-3-rem">
                    <a href="#experiencias">Experiências</a>
                    <a href="#projetos">Projetos</a>
                    <a href="#contato">Contato</a>
                </nav>
            </div>
        </header>
        <div>
            <section className="default-outer-container position-relative">
                <div className="position-relative height-600-px default-inner-container display-flex align-items-center gap-55-px">
                    <div className="display-flex flex-direction-column justify-content-space-between z-index-2">
                        <h1 className="font-weight-normal font-size-3-rem">
                            Olá, me chamo <mark>Bruno Henrique!</mark>
                            <span id="waving-emoji" className="margin-left-10-px">&#128075;</span>
                        </h1>
                        <p className="font-size-1-dot-3-rem margin-top-30-px margin-bottom-30-px width-55-percent line-height-40-px text-align-justify">
                            Estou continuamente me especializando em desenvolvimento back-end, focando na criação de aplicações robustas e soluções criativas.
                            Com um vasto conhecimento em linguagens como Java, Python e frameworks JavaScript modernos,
                            busco sempre resolver os mais variados problemas buscando as melhores soluções!
                        </p>
                        <div className="display-flex flex-flow-wrap gap-70-px">
                            {socialMediasList.map((socialMedia, index) => (
                                <SocialMediaLink 
                                    key={`${index}-social-media`}
                                    Icon={socialMedia.Icon}
                                    url={socialMedia.url}
                                    username={socialMedia.username}
                                    socialMediaName={socialMedia.socialMediaName}
                                />
                            ))}
                        </div>
                    </div>
                    <img className="position-absolute top--90-px right--4-percent z-index-1" src="/static/intro/background-blob.gif" alt="blob gif"/>
                </div>
            </section>
            <section className="default-outer-container">
                <div className="default-inner-container">
                    <h1 id="experiencias" className="section-title">Experiências profissionais</h1>
                    <div className="display-flex flex-direction-column gap-20-px">
                        {jobsExperiencesList.map((jobExperience, index) => (
                            <JobExperience
                                key={`${index}-job-experience`}
                                organizationLogo={jobExperience.organizationLogo}
                                organizationName={jobExperience.organizationName}
                                position={jobExperience.position}
                                startMonthYear={jobExperience.startMonthYear}
                                endMonthYear={jobExperience.endMonthYear}
                                skills={jobExperience.skills}
                                tasks={jobExperience.tasks}
                                showTaskListOption={jobExperience.showTaskList}
                            />
                        ))}
                        <div className="display-flex justify-content-center">
                            <a className="custom-button" download href="static/jobs-experiences/assets/Bruno Henrique Fernandes da Silva.pdf">
                                <LiaFileDownloadSolid className="font-size-2-rem"/>
                                <p style={{ fontSize: "1.5rem" }}>Download CV</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="default-outer-container">
                <div className="default-inner-container">
                    <div className="display-flex justify-content-space-between align-items-center">
                        <div className="display-flex align-items-center gap-15-px">
                            <h1 id="projetos" className="section-title">Projetos</h1>
                            {renderStatusIcon(responseStatusGithubAPI)}
                        </div>
                        <button className="custom-button padding-15-px" onClick={() => setProjectViewGrid(!projectViewGrid)}>
                            {
                                projectViewGrid ?
                                    <FiGrid className="font-size-25-px"/>
                                :
                                    <FiList className="font-size-25-px"/>
                            }
                        </button>
                    </div>
                    <div className={`${projectViewGrid ? "flex-flow-wrap gap-40-px" : "flex-direction-column gap-20-px"} display-flex justify-content-center`}>
                        {
                            responseStatusGithubAPI == 200 ?
                                (projectsList.map(project => (

                                    (project.owner == "bhfsilva" && !project.isFork && !project.isPrivate && !project.isUserConfigurationRepository) &&

                                    <Project
                                        key={project.id}
                                        url={project.url}
                                        imageUrl={project.image}
                                        projectName={project.name}
                                        description={project.description}
                                        languagesList={project.languages}
                                        isGridStyle={projectViewGrid}
                                    />
                                )))
                            :
                                responseStatusGithubAPI == 500 && (
                                    <div className="width-100-percent font-size-1-dot-3-rem">
                                        <p>Erro ao consultar repositórios do Github <PiMaskSad/></p>
                                        <p>Acesse:&nbsp;
                                            <a style={{color: 'blue', textDecoration: 'underline'}} target="_blank" href="https://github.com/bhfsilva?tab=repositories">
                                                https://github.com/bhfsilva?tab=repositories
                                            </a>
                                        </p>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </section>  
            <section className="default-outer-container">
                <div className="default-inner-container">
                    <div id="contato" className="margin-top-80-px">
                        <fieldset className="custom-container contact-fieldset-component padding-top-40-px padding-30-px">
                            <legend className="section-title margin-bottom-0-px">Entre em contato!</legend>
                            <div className="flex-flow-wrap display-flex justify-content-center gap-20-px">
                                <div className="display-flex flex-direction-column justify-content-space-between">
                                    {socialMediasList.map((socialMedia, index) => (
                                        <SocialMediaLink 
                                            key={`${index}-social-media-contact`}
                                            Icon={socialMedia.Icon}
                                            url={socialMedia.url}
                                            username={socialMedia.username}
                                            socialMediaName={socialMedia.socialMediaName}
                                            size="medium"
                                        />
                                    ))}
                                </div>
                                <hr/>
                                <form onSubmit={(event) => submitForm(event)} className="width-60-percent height-340-px display-flex flex-direction-column justify-content-space-between"> 
                                    <input
                                        onChange={(event) => setContactObject(prevState => ({...prevState, username: event.target.value}))}
                                        value={ contactObject.username }
                                        className="font-size-1-dot-1-rem border-radius-5-px padding-10-px height-50-px"
                                        type="text"
                                        placeholder="Insira seu nome *"
                                        required
                                    />
                                    <input
                                        onChange={(event) => setContactObject(prevState => ({...prevState, email: event.target.value}))}
                                        value={ contactObject.email }
                                        className="font-size-1-dot-1-rem border-radius-5-px padding-10-px height-50-px"
                                        type="email"
                                        placeholder="Insira seu email *"
                                        required
                                    />
                                    <textarea
                                        onChange={(event) => setContactObject(prevState => ({...prevState, message: event.target.value}))}
                                        value={ contactObject.message }
                                        className="font-size-1-dot-1-rem border-radius-5-px padding-10-px height-150-px"
                                        placeholder="Deixe um comentário *"
                                        required
                                    />
                                    <div className="display-flex align-items-center gap-10-px">
                                        <button
                                            className="font-size-1-dot-1-rem custom-button border-radius-5-px"
                                            type="submit"
                                            disabled={contactObject.username && contactObject.email && contactObject.message ? false : true}
                                        >        
                                            Enviar
                                        </button>
                                        {
                                            renderStatusIcon(responseStatusNotionAPI)
                                        }
                                    </div>
                                </form>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </section>
            <footer className="default-outer-container margin-top-30-px height-50-px">
                <div className="default-inner-container display-flex align-items-center justify-content-center">
                    <p>&copy; <a href="https://github.com/bhfsilva" target="_blank" rel="noreferrer">Bruno Henrique</a> - {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    </main> 
  )
}