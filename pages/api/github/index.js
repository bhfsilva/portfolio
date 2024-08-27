export default async function handler(_, res) {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      headers: {
        "Authorization": `Bearer ${process.env.GITHUB_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "bhfsilva",
      },
      method: 'POST',
      body: JSON.stringify({
        query: `query {
          result: viewer {
            repositories(first: 100) {
              list: edges {
                item: node {
                  id,
                  owner {
                    name: login
                  },
                  image: openGraphImageUrl,
                  name,
                  description,
                  url,
                  isFork,
                  isPrivate,
                  isUserConfigurationRepository
                  languages(first: 100) {
                    list: edges {
                      item: node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API handler error: ${response.status}`);
    }

    const responseData = await response.json();

    let repositoryList = responseData["data"]["result"]["repositories"]["list"].map(repository => {
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

    repositoryList = repositoryList.filter(repoObject =>
      repoObject.owner === "bhfsilva" &&
      !repoObject.isFork &&
      !repoObject.isPrivate &&
      !repoObject.isUserConfigurationRepository
    );

    res.status(200).json(repositoryList);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error('GitHub API handler error:', error);
  }
}