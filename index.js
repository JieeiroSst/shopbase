const { transformProductGroup } = require("./transfrom");
const { CatalogProcessor } = require("./catalog");
const { getCategories } = require("./google-sheets");
const { updateToken } = require("./shopbase");
const db = require("./db/knex");
const { insertProduct } = require("./product");

insertProduct();

async function main() {
  getCategories();
  const shops = await db("shopbase_stores").select("shop");
  const arrayShop = shops.map((item) => item.shop);
  for (let item of arrayShop) {
    console.log(item);
    updateToken(item);
    insertProduct(item);
  }
}

main();
