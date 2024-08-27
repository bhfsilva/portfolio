const { Client } = require("@notionhq/client");
const notionClient = new Client({ auth: process.env.NOTION_KEY });

export default async function handler(req, res) {
  try {
    await notionClient.comments.create({
      "parent": {
        "page_id": `${process.env.NOTION_PAGE_ID}`
      },
      "rich_text": [
        {
          "text": {
            "content":`${req.body.author} | ${req.body.contact}\n${req.body.comment}\nEnviado dia: ${new Date().toLocaleString('pt-BR')}`,
          }
        }
      ]
    });
    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error('Notion API handler error:', error);
  }
}