const { Client } = require("@notionhq/client");
const notionClient = new Client({ auth: process.env.NOTION_KEY });

export const config = {
  api: {
    externalResolver: true,
  },
}

export default async function handler(req, res) {
  try {
    await notionClient.blocks.children.append({
      block_id:"69c02b393ca0440baab59b9aa49ab297",
      children:[{
        "type":"callout",
        "callout":{
          "rich_text":[{
            "text": {
              "content":`${req.body.author} | ${req.body.contact}`,
              "link": null
            },
            "annotations": {
              "bold": true
            }
          }],
          "icon":{
            "emoji":"💬"
          },
          "children":[{
            "bulleted_list_item":{
              "rich_text":[{
                "text":{
                  "content":`${req.body.comment}`,
                  "link": null
                }
              }]
            }
          }]
        }
      }]
    })
    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error('Notion API handler error:', error);
    res.status(500).json({ message: error.message });
  }
}