require("dotenv").config();

let env = process.env;

function intValue(value, defaultValue) {
  return isNaN(value) ? defaultValue : parseInt(value);
}

module.exports = {
  shopbase: {
    token: env.TOKEN,
    api_key: env.SHOPBASE_API_KEY,
    password: env.SHOPBASE_PASSWORD,
    url: env.SHOPBASE_URL,
    secret_api: env.SHOPBASE_SECRET_API,
  },
  google: {
    type: env.type,
    id: env.project_id,
    private_key_id: env.private_key_id,
    private_key: env.private_key,
    client_email: env.client_email,
    auth_uri: env.auth_uri,
    token_uri: env.token_uri,
    auth_provider_x509_cert_url: env.auth_provider_x509_cert_url,
    client_x509_cert_url: env.client_x509_cert_url,
  },
  google_merchant: {
    location: env.location,
    mmc_merchant_id: env.mmc_merchant_id,
    single_variant: env.single_variant,
  },
  sheets: {
    apiUrl: env.SPREAD_SHEETS_API_URL,
    categoriesSheetId: env.SPREAD_SHEET_CATEGORIES_ID,
    categoriesSheetRange: env.CATEGORIES_SHEETS_RANGE,
    titleRulesId: env.SPREAD_SHEET_TITLE_RULES_ID,
    privateKey: env.GOOGLE_API_PRIVATE_KEY,
    clientMail: env.GOOGLE_CLIENT_EMAIL,
  },
  lib: {
    appId: env.appIds,
  }
};
