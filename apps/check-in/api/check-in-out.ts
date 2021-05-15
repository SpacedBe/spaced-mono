import { Client } from  '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_AUTH_KEY,
});

const transform = (data) => {
  return {
    id: data.id,
    type: data.properties.type?.select.name || null,
    question: extractTitle(data.properties.question?.title) || null,
  };
}

const extractTitle = (titleArray) => {
  return titleArray.reduce((title, titlePiece) => {
    return `${title}${titlePiece.plain_text}`;
  }, '');
}

export const checkInOut = async () => {
  const data = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID,
  });

  return data.results.map(transform);
}
