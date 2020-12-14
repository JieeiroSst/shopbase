const db = require("./db/knex");
const { updateToken } = require("./shopbase");
const { insertProduct } = require("./product");
const { getCategoriesSheets } = require("./google-sheets");
const { productBatch } = require("./catalog");
const { saveDataDB } = require("./excel-data");

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const main = async () => {
  await saveDataDB();
  await getCategoriesSheets();
  sleep(1000);
  const shops = await db("shopbase_stores").select("shop");
  const arrayShop = shops.map((item) => item.shop);
  for (let item of arrayShop) {
    await updateToken(item);
    sleep(100);
    await insertProduct(item);
  }
  await sleep(10000);
  await productBatch();
};

main();
