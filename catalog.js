const _ = require("lodash");
const { accessToken } = require("./shopbase");
const config = require("./config");
const tranform = require("./transfrom");

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
  async processBatch(resource, data) {
    const mmMerchantId = config.google_merchant.mmc_merchant_id;
    const mmcLocation = config.google_merchant.location;
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
            config.google_merchant.single_variant
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
