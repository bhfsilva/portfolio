const { Client } = require("@notionhq/client");
const notionClient = new Client({ auth: process.env.NOTION_KEY });

export default async function handler(_, res) {
  try {
    await notionClient.blocks.children.list({block_id: `${process.env.NOTION_PAGE_ID}`}).then(response => {

      if (!response) {
        throw new Error(`Notion API error: ${response}`);
      }

      const pdf = response.results.find(notionBlock => notionBlock.file != undefined);
      res.status(200).send(pdf.file.file.url);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error('Notion API handler error:', error);
  }
}