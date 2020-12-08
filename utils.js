const _ = require("lodash");
const db = require("./db/knex");

const getDateValue = async (shop, key, defaultValue) => {
  const value = await getValue(shop, key);
  return new Date(value ? value.date : defaultValue);
};

const fetchEventData = async (event) => {
  if (event.verb === "batch") {
    const ids = event.data.map((item) => item.id).filter(_.identity);
    const items = await db(event.resource)
      .whereRaw("id = any(?)", [ids])
      .select();
    const m = _.keyBy(items, "id");
    return event.data
      .map((op) => ({
        verb: op.verb,
        data: m[op.id] || op.data,
      }))
      .filter((item) => !!item.data);
  }
  return event.data;
};

module.exports = {
  getDateValue,
  fetchEventData,
};
