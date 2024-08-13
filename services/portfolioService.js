import { FiGithub, FiMail, FiLinkedin } from "react-icons/fi";

export function getSocialMediaList() {
  return [
    {url: "https://github.com/bhfsilva?tab=repositories", Icon: FiGithub, username: "bhfsilva", socialMediaName: "GitHub"},
    {url: "mailto:bhfs.contato@gmail.com", Icon: FiMail, username: "bhfs.contato@gmail.com", socialMediaName: "Email"},
    {url: "https://linkedin.com/in/bhfsilva", Icon: FiLinkedin, username: "Bruno Henrique", socialMediaName: "Linkedin"}
  ]
}

export function getJobExperienceList() {
  return [
    {
      organizationLogo: "/static/jobs-experiences/MPConsultoria-logo.png",
      organizationName: "MPConsultoria",
      position: "Desenvolvedor Java Júnior",
      startMonthYear: "Julho/2023",
      endMonthYear: null,
      showTaskList: true,
      skills: [
        "Java 11",
        "SpringBoot",
        "Angular",
        "MongoDB",
        "Azure Service Bus (mensageria)",
        "WebServices SOAP",
        "Python",
        "Selenium",
        "Git",
        "Azure"
      ],
      tasks: [
        "Participei na criação de uma API e de um software SaaS para obtenção do XML de notas fiscais eletrônicas utilizando Java com SpringBoot para integração com Webservices municipais, desenvolvendo interfaces com Angular e gerenciando dados com MongoDB;",
        "Participei de um projeto de web scraping (raspagem de dados), criando automações com as bibliotecas Selenium e BeautifulSoup em Python;",
        "Refatorei e escrevi a documentação do projeto de web scraping, melhorando a escalabilidade e manutenção do código."
      ]
    },
    {
      organizationLogo: "/static/jobs-experiences/scala-data-center-logo.png",
      organizationName: "Scala Data Centers",
      position: "Estagiário em Redes de Computadores e Monitoração",
      startMonthYear: "Junho/2021",
      endMonthYear: "Maio/2023",
      showTaskList: false,
      skills: [
        "Python",
        "HTML",
        "CSS",
        "Peakflow API",
        "Grafana"
      ],
      tasks: [
        "Criei scripts para configuração de ativos de rede, como switches e roteadores;",
        "Utilizando a linguagem Python, participei do desenvolvimento de um script que, acessando a API da ferramenta Arbor Peakflow, mapeava quais clientes ainda possuíam vínculo com a empresa;",
        "Utilizando HTML e CSS, desenvolvi uma tela de login responsiva para um site interno;",
        "Criei gráficos na ferramenta Grafana que mediam o tráfego de dados de equipamentos."
      ]
    }
  ]
}

export async function getGithubRepositories() {
  try {
    //requisicao sendo feita para API customizada do Next.JS para que token nao seja mostrado no chrome dev tools
    const response = await fetch("/api/github");
    const responseData = await response.json();
    const returnObject = {
      responseStatus: response.status
    }
    if (response.ok) {
      const repositoryList = responseData["data"]["result"]["repositories"]["list"].map(repository => {
        const repositoryObject = repository.item;
        return {
          id: repositoryObject.id,
          owner: repositoryObject.owner.name,
          image: repositoryObject.image,
          name: repositoryObject.name,
          description: repositoryObject.description,
          url: repositoryObject.url,
          isFork: repositoryObject.isFork,
          isPrivate: repositoryObject.isPrivate,
          isUserConfigurationRepository: repositoryObject.isUserConfigurationRepository,
          languages: repositoryObject.languages.list.map(language => language.item.name)
        }
      });
      return {
        ...returnObject,
        responseList: repositoryList
      }
    }
    return {
      ...returnObject,
      responseList: []
    }
  } catch (error) {
    console.log(error);
  }
};