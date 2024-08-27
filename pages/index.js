import * as service from "/services/portfolioService.js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { FiGrid, FiList } from "react-icons/fi";
import { useEffect, useState } from "react";
import { RiMenuFill } from "react-icons/ri";
import { PiMaskSad } from "react-icons/pi";
import JobExperience from "/src/components/JobExperience";
import SocialMediaLink from "/src/components/SocialMediaLink";
import JobExperience from "/src/components/JobExperience";
import Project from "/src/components/Project";

const spinLoadingIcon = <AiOutlineLoading3Quarters color="gray" className="font-size-2-rem spin-animation"/>;

function renderStatusIcon(responseStatusCode) {
    switch(responseStatusCode) {
        case 1: return (spinLoadingIcon);
        case 200: return (<IoMdCheckmark color="green" className="font-size-2-rem"/>);
        case 500: return (<IoMdClose color="red" className="font-size-2-rem"/>);
        default: return "";
    }
}

export default function Main() {
    const [notionCurriculumResponse, setNotionCurriculumResponse] = useState({
        status: 0,
        payload: "",
        is_loading: false
    });

    const [notionCommentResponse, setNotionCommentResponse] = useState({
        status: 0,
        payload: { username: "", email: "", message: "" },
        is_loading: true
    });

    const [githubResponse, setGithubResponse] = useState({
        status: 0,
        payload: [service.projectsMock, service.projectsMock],
        is_loading: true
    });

    function setNotionCommentPayloadValue(payloadKey, value) {
        setNotionCommentResponse(prevState => ({
            ...prevState,
            payload: {
                ...prevState.payload,
                [payloadKey]: value
            }
        }));
    }

    function submitForm(event) {
        event.preventDefault();
        setNotionCommentResponse(prevState => ({ ...prevState, status: 1 }));
        service.postNotionComment(notionCommentResponse.payload).then(response => {
            setNotionCommentResponse(prevState => ({ ...prevState, status: response.status }));
            setTimeout(() => {
                setNotionCommentResponse(prevState => ({ ...prevState, status: 0 }));
            }, 3000);
        })
        setNotionCommentResponse(prevState => ({ ...prevState, payload: { username: "", email: "", message: "" }}));
    }

    function getCurriculumURL() {
        setNotionCurriculumResponse(prevState => ({ ...prevState, is_loading: true }));
        service.getNotionCurriculumPdfUrl().then(response => {
            let pdfUrl = "static/jobs-experiences/assets/Bruno_Henrique_Fernandes_da_Silva.pdf";

            if (response.status == 200) {
                pdfUrl = response.body;
            }

            setNotionCurriculumResponse({
                status: response.status,
                payload: pdfUrl,
                is_loading: false
            });

            window.open(pdfUrl, '_blank');
        });
    }

    useEffect(() => {
        service.getGithubRepositories().then(response => {
            setGithubResponse({
                status: response.status,
                payload: response.body,
                is_loading: false
            });
        });

        });
    }, []);

    return (
        <main>
            <header id="header" className="default-outer-container position-relative z-index-3 height-125-px align-items-center">
                <div className="default-inner-container width-100-percent display-flex align-items-center justify-content-space-between">
                    <img src="/static/header/bh-logo.svg" alt="BH! Logo"/>
                    <RiMenuFill id="header-menu-button" className="display-none font-size-3-rem" onClick={() => setShowResponsiveMenu(!showResponsiveMenu)} />
                    <nav id="nav-container" responsive-menu-active={showResponsiveMenu.toString()} className="display-flex font-size-1-dot-3-rem gap-35-px">
                        <a onClick={() => setShowMenu(false)} href="#experiencias">Experiências</a>
                        <a onClick={() => setShowMenu(false)} href="#projetos">Projetos</a>
                        <a onClick={() => setShowMenu(false)} href="#contato">Contato</a>
                    </nav>
                </div>
            </header>
            <div>
                <section className="default-outer-container position-relative">
                    <div id="intro-container" className="position-relative height-600-px default-inner-container display-flex align-items-center gap-55-px">
                        <div className="display-flex flex-direction-column justify-content-space-between z-index-2">
                            <h1 className="font-weight-normal font-size-3-rem">
                                Olá, me chamo <mark>Bruno Henrique!</mark>
                                <span className="margin-left-15-px waving-animation"><img width="50" src="/static/intro/waving-emoji.svg" /></span>
                            </h1>
                            <p className="font-size-1-dot-3-rem margin-top-30-px margin-bottom-30-px width-55-percent line-height-40-px text-align-justify">
                                Estou continuamente me especializando em desenvolvimento back-end, focando na criação de aplicações robustas e soluções criativas.
                                Com um vasto conhecimento em linguagens como Java, Python e frameworks JavaScript modernos,
                                busco sempre resolver os mais variados problemas buscando as melhores soluções!
                            </p>
                            <div id="social-media-intro-component" className="display-flex flex-flow-wrap gap-70-px">
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
                        <img className="position-absolute top--90-px right-0-px z-index-1" src="/static/intro/background-blob.gif" alt="blob gif" />
                    </div>
                </section>
                <section className="default-outer-container">
                    <div className="default-inner-container">
                        <h1 id="experiencias" className="section-title">Experiências profissionais</h1>
                        <div className="display-flex flex-direction-column gap-20-px">
                            {notionJobExperienceResponse.payload.map((jobExperience, index) => (
                                <JobExperience
                                    key={`${index}-job-experience`}
                                    organizationLogo={jobExperience.organizationLogo}
                                    organizationName={jobExperience.organizationName}
                                    position={jobExperience.position}
                                    startMonthYear={jobExperience.startMonthYear}
                                    endMonthYear={jobExperience.endMonthYear}
                                    skills={jobExperience.skills}
                                    tasks={jobExperience.tasks}
                                    showTaskListOption={index == 0}
                                    isLoading={notionJobExperienceResponse.is_loading}
                                />
                            ))}
                            <div className="display-flex flex-direction-column justify-content-center align-items-center">
                                <button
                                    className="custom-button width-fit-content"
                                    target="_blank"
                                    href={notionCurriculumResponse.payload}
                                    onClick={() => getCurriculumURL()}
                                    disabled={notionCurriculumResponse.is_loading}
                                >
                                    {notionCurriculumResponse.is_loading ? spinLoadingIcon : <LiaFileDownloadSolid className="font-size-2-rem" />}
                                    <p style={{ fontSize: "1.5rem" }}>Download CV</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="default-outer-container">
                    <div id="projects-container" className="default-inner-container">
                        <div className="display-flex justify-content-space-between align-items-center">
                            <h1 id="projetos" className="section-title">Projetos</h1>
                            <button className="custom-button padding-15-px" onClick={() => setProjectViewGrid(!projectViewGrid)}>
                                {
                                    projectViewGrid ? <FiGrid className="font-size-25-px" /> : <FiList className="font-size-25-px" />
                                }
                            </button>
                        </div>
                        <div className={`${projectViewGrid ? "flex-flow-wrap gap-40-px" : "flex-direction-column gap-20-px"} display-flex justify-content-center`}>                            
                            {
                                githubResponse.status != 500 ?
                                    (githubResponse.payload.map((project, index) => (
                                        <Project
                                            key={`${project.id}-${index}`}
                                            url={project.url}
                                            imageUrl={project.image}
                                            projectName={project.name}
                                            description={project.description}
                                            languagesList={project.languages}
                                            isGridStyle={projectViewGrid}
                                            isLoading={githubResponse.is_loading}
                                        />                                       
                                    )))
                                    :
                                    <div className="width-100-percent font-size-1-dot-3-rem">
                                        <p>Erro ao consultar repositórios do Github <PiMaskSad/></p>
                                        <p>Acesse em:&nbsp;
                                            <a style={{ color: 'blue', textDecoration: 'underline' }} target="_blank" href="https://github.com/bhfsilva?tab=repositories">
                                                https://github.com/bhfsilva?tab=repositories
                                            </a>
                                        </p>
                                    </div>
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
                                    <hr />
                                    <form onSubmit={(event) => submitForm(event)} className="width-60-percent height-340-px display-flex flex-direction-column justify-content-space-between">
                                        <input
                                            onChange={(event) => setNotionCommentPayloadValue("username", event.target.value)}
                                            value={notionCommentResponse.payload.username}
                                            className="font-size-1-rem border-radius-5-px padding-10-px height-50-px"
                                            type="text"
                                            placeholder="Insira seu nome *"
                                            required
                                        />
                                        <input
                                            onChange={(event) => setNotionCommentPayloadValue("email", event.target.value)}
                                            value={notionCommentResponse.payload.email}
                                            className="font-size-1-rem border-radius-5-px padding-10-px height-50-px"
                                            type="email"
                                            placeholder="Insira seu email *"
                                            required
                                        />
                                        <textarea
                                            onChange={(event) => setNotionCommentPayloadValue("message", event.target.value)}
                                            value={notionCommentResponse.payload.message}
                                            className="font-size-1-rem border-radius-5-px padding-10-px height-150-px"
                                            placeholder="Deixe um comentário *"
                                            required
                                        />
                                        <div className="display-flex align-items-center gap-10-px">
                                            <button
                                                className="font-size-1-rem custom-button border-radius-5-px"
                                                type="submit"
                                                disabled={
                                                    notionCommentResponse.payload.username &&
                                                    notionCommentResponse.payload.email &&
                                                    notionCommentResponse.payload.message ? false : true
                                                }
                                            >        
                                                Enviar
                                            </button>
                                            {
                                                renderStatusIcon(notionCommentResponse.status)
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