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
        updated_at: product.updated_at,
        shop,
        shopbase_id: product.id,
        published_at: product.published_at,
        handle: product.handle,
      };
      await db("products").insert(entities);
    }
  } else {
    for (const product of products) {
      if (!arrayId.includes(product.id)) {
        entities = {
          shopbase_data: product,
          created_at: product.created_at,
          updated_at: product.updated_at,
          shop,
          shopbase_id: product.id,
          published_at: product.published_at,
          handle: product.handle,
        };
        await db("products").insert(entities);
      }
    }
  }
};

module.exports = { insertProduct };
