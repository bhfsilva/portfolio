const GITHUB_KEY = "<ADD KEY>";

export const config = {
  api: {
    externalResolver: true,
  }
}

export default async function handler(_, res) {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      headers: {
        "Authorization": `Bearer ${GITHUB_KEY}`,
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
      throw new Error(`API response error: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('GitHub API handler error:', error);
    res.status(500).json({ error: error.message });
  }
}