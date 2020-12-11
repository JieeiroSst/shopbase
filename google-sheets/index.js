const { google } = require("googleapis");
const _ = require("lodash");

const config = require("../config");
const db = require("../db/knex");
const client = new google.auth.JWT(
  config.sheets.clientMail,
  null,
  _.replace(config.sheets.privateKey, new RegExp("\\\\n", "g"), "\n"),
  [config.sheets.apiUrl]
);

const getGGSheets = async (spreadsheetId, range) => {
  const gsApi = google.sheets({ version: "v4", auth: client });
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await gsApi.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (err) {
    throw err;
  }
};

const sortedCategories = (list) => {
  list.sort((a, b) => b.type.length - a.type.length);
  return list;
};

const getCategoriesSheets = async () => {
  let categories = [];
  const data = await getGGSheets(
    config.sheets.categoriesSheetId,
    config.sheets.categoriesSheetRange
  );
  if (data.length) {
    data.map((row) => {
      categories.push({ type: row[0], category: row[1] });
    });
  } else {
    console.log("no data found");
  }
  categories = sortedCategories(categories);
  await db("google_categories").truncate();
  for (let category of categories) {
    await db("google_categories").insert({ ...category, shop: "all" });
  }
};

module.exports = { getCategoriesSheets };
