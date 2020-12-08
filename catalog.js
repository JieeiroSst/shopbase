const _ = require("lodash");
const { accessToken } = require("./shopbase");
const config = require("./config");
const tranform = require("./transfrom");
const { getDateValue } = require("./utils");
const db = require("./db/knex");

const resources = ["products", "collections"];

class CatalogProcessor {
  constructor(ctx, categories, store) {
    this.ctx = ctx;
    this.categiries = categories;
    this.store = store;
  }
  log(...args) {
    return this.ctx.info(...args);
  }
  safeReuest(fn) {
    return this.ctx.delayedRetry(fn, (err) => {
      const responseData = _.get(err, "response.data");
      const meta = { responseData };
      return { retry: true, meta };
    });
  }
  async sendBatch(data, token) {
    return await axios({
      method: "POST",
      url: `https://www.googleapis.com/content/v2.1/products/batch`,
      data: {
        entries: data,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async processBatch(resource, data, idx) {
    const googleInfo = this.store.google_sync;
    if (googleInfo) {
      let values = googleInfo.values;
      if (idx) {
        values = [values[idx]];
      }
      for (const item of values) {
        const mmMerchantId = item.mmc_merchant_id;
        const mmcLocation = item.location;
        if (resource == "products") {
          let requestBody = [];
          for (const item of data) {
            if (item.verb == " create" || item.verb == "update") {
              const product = await tranform.transformProductGroup(
                item,
                mmcLocation,
                this.store,
                this.categiries,
                mmMerchantId,
                googleInfo.single_variant
              );
              if (product) requestBody = requestBody.concat(product);
            }
          }
          const bodies = _.chunk(requestBody, 500);
          const access_token = await accessToken();
          for (const body of bodies) {
            for (const index in body) {
              body[index].batchId = index;
            }
            await this.safeReuest(async () => {
              await this.sendBatch(body, access_token);
            });
          }
        }
      }
    }
  }
}

class ShopbaseSync {
  async getCategories(shop) {
    const lastUpdated = await getDateValue(
      shop,
      "categories_updated_at",
      new Date(0)
    );
    if (!this.categoriesUpdatedAt || this.categoriesUpdatedAt < lastUpdated) {
      this.categories = await db("google_categories")
        .where({ shop })
        .then((rows) => rows);
    }
    return this.categories;
  }
  async acceptEvent(event) {
    const shop = event.shop;
    const store = await db("shopbase_stores").where({ shop }).first();
    const googleInfo = store.google_sync;
    if (googleInfo.values && googleInfo.google_sync_token) {
      event.verb == "batch" && event.source != "";
    }
  }
  async processEvent(ctx) {
    console.log(ctx);
  }
}

module.exports = ShopbaseSync;
