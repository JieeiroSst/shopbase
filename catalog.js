const _ = require("lodash");
const axios = require("axios");
const tranform = require("./transfrom");
const db = require("./db/knex");

const sendBatch = async (data, token) => {
  return await axios({
    method: "post",
    url: "https://www.googleapis.com/content/v2.1/products/batch",
    data: {
      entries: data,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const processBatch = async (store, data, categories) => {
  const googleInfo = store.google_sync;
  if (googleInfo) {
    let values = googleInfo.values;
    for (const item of values) {
      const mmMerchantId = item.mmc_merchant_id;
      const mmcLocation = item.location;
      let requestBody = [];
      for (const item of data) {
        const product = await tranform.transformProductGroup(
          item,
          mmcLocation,
          store,
          categories,
          Number(mmMerchantId),
          googleInfo.single_variant
        );
        if (product) requestBody = requestBody.concat(product);
      }
      const bodies = _.chunk(requestBody, 500);
      for (const body of bodies) {
        for (const index in body) {
          const numIndex = Number(index);
          body[numIndex].batchId = numIndex;
        }
        await sendBatch(body, googleInfo.google_sync_token);
      }
    }
  }
};

const productBatch = async () => {
  const stores = await db("shopbase_stores");
  const googleCategories = await db("google_categories");
  const products = await db("products").select("shopbase_data");
  const data = products.map((item) => item.shopbase_data);
  for (let store of stores) {
    await processBatch(store, data, googleCategories);
  }
};

module.exports = { productBatch };
