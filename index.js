const db = require("./db/knex");
const { updateToken } = require("./shopbase");
const { insertProduct } = require("./product");
const { getCategoriesSheets } = require("./google-sheets");
const { productBatch } = require("./catalog");
const { saveDataDB } = require("./excel-data");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const main = async () => {
  getCategoriesSheets();
  saveDataDB();
  const shops = await db("shopbase_stores").select("shop");
  const arrayShop = shops.map((item) => item.shop);
  for (let item of arrayShop) {
    updateToken(item);
    insertProduct(item);
  }
  await sleep(10000);
  productBatch();
};

main();
