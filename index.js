const db = require("./db/knex");
const { updateToken } = require("./shopbase");
const { insertProduct } = require("./product");
const { getCategoriesSheets } = require("./google-sheets");

async function main() {
  getCategoriesSheets();
  const shops = await db("shopbase_stores").select("shop");
  const arrayShop = shops.map((item) => item.shop);
  for (let item of arrayShop) {
    console.log(item);
    updateToken(item);
    insertProduct(item);
  }
}

main();
