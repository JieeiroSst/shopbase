const oxr = require("open-exchange-rates");

const config = require("../config");
const db = require("../db/knex");

const getRates = () => {
  return new Promise((resolve, reject) => {
    oxr.latest((err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

const updateExchangeRates = async () => {
  oxr.set({ app_id: config.lib.appId });
  try {
    const res = await getRates();
    const exchangeRates = await db("properties")
      .select()
      .where({ key: "exchange_rates" })
      .first();
    if (!exchangeRates) {
      await db("properties").insert({
        ns: "store:all",
        key: "exchange_rates",
        value: res.rates,
      });
    } else {
      await db("properties")
        .where({ id: exchangeRates.id })
        .update({ value: res.rates, updated_at: new Date() });
    }
  } catch (err) {
    if (typeof err == "string") {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};

module.exports = {
  updateExchangeRates,
};
