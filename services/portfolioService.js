import { FiGithub, FiMail, FiLinkedin } from "react-icons/fi";

export function getSocialMediaList() {
  return [
    {url: "https://github.com/bhfsilva?tab=repositories", Icon: FiGithub, username: "bhfsilva", socialMediaName: "GitHub"},
    {url: "mailto:bhfs.contato@gmail.com", Icon: FiMail, username: "bhfs.contato@gmail.com", socialMediaName: "Email"},
    {url: "https://linkedin.com/in/bhfsilva", Icon: FiLinkedin, username: "Bruno Henrique", socialMediaName: "Linkedin"}
  ]
}

export const jobExperienceMock = {
  organizationLogo: "Mock Mock Mock Mock Mock Mock Mock Mock",
  organizationName: "Mock Mock Mock",
  position: "Mock",
  startMonthYear: "Mock Mock",
  endMonthYear: "Mock Mock",
  showTaskList: false,
  skills: ["Mock","Mock",],
  tasks: ["Mock","Mock","Mock"]
};

export const projectsMock = {
  id: "Mock",
  url: "",
  image: "Mock",
  name: "Mock",
  description: "Mock Mock Mock Mock Mock Mock Mock Mock",
  languages: ["Mock", "Mock"]
}

//requisicao sendo feita para API customizada do Next.JS para que token nao seja mostrado no chrome dev tools
export async function getGithubRepositories() {
  const response = await fetch("/api/github");
  const responseBody = await response.json();
  return {
    body: responseBody,
    status: response.status
  }
};

//requisicoes sendo feitas para API customizada do Next.JS para que erro de CORS nao seja gerado
export async function postNotionComment(contactObject){
  const response = await fetch("/api/notion/comment",
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        author: contactObject.username,
        contact: contactObject.email,
        comment: contactObject.message
      })
    }
  );
  const responseBody = await response.json();
  return {
    body: responseBody,
    status: response.status
  }
}

export async function getNotionCurriculumPdfUrl(){
  const response = await fetch("api/notion/curriculum-pdf-url", {
    headers: {
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28"
    },
    method: "GET"
  });
  const responseBody = await response.text();
  return {
    body: responseBody,
    status: response.status
  }
}

export async function postNotionJobExperienceDatabase(){
  const response = await fetch("/api/notion/job-experience-database",{
    method: "POST"
  });
  const responseBody = await response.json();
  return {
    body: responseBody,
    status: response.status
  }
}