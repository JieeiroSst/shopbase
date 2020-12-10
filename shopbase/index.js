const _ = require("lodash");
const axios = require("axios");
const { google } = require("googleapis");
const db = require("../db/knex");

const sendRequest = async () => {
  const urls = await db("shopbase_stores").select(
    db.raw(`info->>'url' as url`)
  );
  const urlMap = urls.map((item) => item.url);
  let arraies = [];
  for (const item of urlMap) {
    const data = await axios({
      method: "get",
      url: `${item}/products.json`,
      headers: {
        "X-Sb-Shop-Api-Call-Limit": 29 / 30,
      },
    });
    arraies.push(data);
  }
  return arraies;
};

const promisify = (f) => (...args) =>
  new Promise((pass, fail) =>
    f(...args, (err, result) => (err ? fail(err) : pass(result)))
  );

const getTokenGoogle = async () => {
  const data = await db("shopbase_stores").select(
    db.raw(
      `values->>'private_key' as private_key,values->>'client_email' as client_email`
    )
  );
  let tokens = [];
  for (const item of data) {
    const jwtClient = new google.auth.JWT(
      item.client_email,
      null,
      _.replace(item.private_key, new RegExp("\\\\n", "g"), "\n"),
      ["https://www.googleapis.com/auth/content"]
    );
    const auth = promisify(jwtClient.authorize.bind(jwtClient));
    tokens.push(auth());
  }
  return tokens;
};

async function updateToken(shop) {
  const tokens = await getTokenGoogle();
  for await (const token of tokens) {
    const data = JSON.stringify(token.access_token);
    await db("shopbase_stores")
      .where({ shop })
      .update({
        google_sync: db.raw(`jsonb_set(google_sync,'{google_sync_token}',?)`, [
          data,
        ]),
      });
  }
}

module.exports = { sendRequest, updateToken };
