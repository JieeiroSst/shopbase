const axios = require("axios");
const { google } = require("googleapis");
const config = require("./config");
const db = require("./db/knex");

const sendRequest = async () => {
  return await axios({
    method: "get",
    url: `${config.shopbase.url}/products.json`,
    headers: {
      "X-ShopBase-Access-Token": config.shopbase.token,
      "X-Sb-Shop-Api-Call-Limit": 29 / 30,
    },
  });
};

const promisify = (f) => (...args) =>
  new Promise((pass, fail) =>
    f(...args, (err, result) => (err ? fail(err) : pass(result)))
  );

const getTokenGoogle = async () => {
  const jwtClient = new google.auth.JWT(
    config.google.client_email,
    null,
    config.google.private_key,
    ["https://www.googleapis.com/auth/content"]
  );
  const auth = promisify(jwtClient.authorize.bind(jwtClient));
  return auth();
};

async function updateToken(shop) {
  const data = await getTokenGoogle();
  const token = JSON.stringify(data.access_token);
  await db("shopbase_stores")
    .where({ shop })
    .update({
      google_sync: db.raw(`jsonb_set(google_sync,'{google_sync_token}',?)`, [
        token,
      ]),
    });
}

module.exports = { sendRequest, updateToken };
