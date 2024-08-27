const { Client } = require("@notionhq/client");
const notionClient = new Client({ auth: process.env.NOTION_KEY });

export default async function handler(_, res) {
  try {
    await notionClient.databases.query({
      database_id: `${process.env.NOTION_DATABASE_ID}`,
      sorts: [
        {
          property: "index",
          direction: "ascending"
        }
      ]
    }).then(response => {    
      if (!response) {
        throw new Error(`Notion API error: ${response}`);
      }

      const jobExperiences = []
      
      response.results.forEach(notionDatabaseRow => {
        const databaseFields = [
          "endMonthYear",
          "organizationLogo",
          "organizationName",
          "position",
          "skills",
          "startMonthYear",
          "tasks"
        ]
        
        let jobExperienceObject = {}        

        for (let index = 0; index < databaseFields.length; index++){
          const propertyName = databaseFields[index];
          let propertyValue = "";
          let textPropertyName = "rich_text";

          // organizationName eh o titulo do database no notion
          if (propertyName == "organizationName") {
            textPropertyName = "title";
          }

          propertyValue = notionDatabaseRow["properties"][propertyName][textPropertyName][0]["plain_text"];
          jobExperienceObject[propertyName] = propertyValue;
        }

        jobExperienceObject["tasks"] = jobExperienceObject["tasks"].split("$");
        jobExperienceObject["skills"] = jobExperienceObject["skills"].split("$");

        jobExperiences.push(jobExperienceObject);
      });

      res.status(200).json(jobExperiences);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error('Notion API handler error:', error);
  }
}