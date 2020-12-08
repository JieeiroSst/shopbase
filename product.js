const db = require("./db/knex");
const { sendRequest } = require("./shopbase");

const insertProduct = async (shop) => {
  const data = await sendRequest();
  const products = data.data.products;
  const ids = await db("products").select(db.raw(`shopbase_id`));
  const arrayId = ids.map((item) => Number(item.shopbase_id));
  let entities = {};
  if (arrayId.length < 1 || arrayId == undefined) {
    for (const product of products) {
      entities = {
        shopbase_data: product,
        created_at: product.created_at,
        shop,
        updated_at: product.updated_at,
        shopbase_id: product.id,
        published_at: product.published_at,
        handle: product.handle,
      };
      await db("products").insert(entities);
    }
  } else {
    for (const product of products) {
      entities = {
        shopbase_data: product,
        created_at: product.created_at,
        shop,
        updated_at: product.updated_at,
        shopbase_id: product.id,
        published_at: product.published_at,
        handle: product.handle,
      };
      if (!arrayId.includes(product.id)) {
        await db("products").insert(entities);
      }
    }
  }
};

module.exports = { insertProduct };
