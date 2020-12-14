const xlsx = require("xlsx");
const db = require("../db/knex");

const saveDataDB = async () => {
  const spreadsheet = xlsx.readFile("data/data.xlsx");
  const sheetsName = spreadsheet.SheetNames;
  const sheets = spreadsheet.Sheets[sheetsName[0]];
  const data = xlsx.utils.sheet_to_row_object_array(sheets);
  for (const index of data) {
    const entities = {
      shop: index.shop_name,
      info: {
        url: index.shopbase_url,
        domain: index.shopbase_domain,
        currency: index.shopbase_currency,
        secret_api: index.shopbase_secret_api,
      },
      values: {
        private_key: index.google_merchant_private_key,
        client_email: index.google_client_mail,
      },
      google_sync: {
        values: {
          id: index.google_sync_id,
          location: index.google_sync_location,
          mmc_merchant_id: index.google_sync_mmc_merchant_id,
        },

        single_variant: index.google_sync_single_variant,
        google_sync_token: index.google_sync_google_sync_token,
      },
    };
    const dataDb = await db("shopbase_stores").select("shop");
    const shops = dataDb.map((item) => item.shop);
    if (shops.length < 1 || shops == undefined) {
      await db("shopbase_stores").insert(entities);
    } else {
      if (!shops.includes(index.shop_name)) {
        await db("shopbase_stores").insert(entities);
      }
    }
  }
};

module.exports = { saveDataDB };
