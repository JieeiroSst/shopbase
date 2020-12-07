const striptags = require("striptags");
const fx = require("money");

const getDescription = (description) => {
  return truncateString(striptags(description), 9997);
};

const getMethod = (method) => {
  if (method == "delete") return method;
  return "insert";
};

const countryCurrency = (country) => {
  switch (country) {
    case "AT":
    case "BE":
    case "DE":
    case "ES":
    case "FR":
    case "IT":
    case "NL":
      return "EUR";
    case "AU":
      return "AUD";
    case "CA":
      return "CAD";
    case "CH":
      return "CHF";
    case "GB":
      return "GBP";
    case "IN":
      return "INR";
    case "SE":
      return "SEK";
    case "US":
      return "USD";
    default:
      throw new Error(`This country is not supported for currency exchange`);
  }
};

const findCategory = (type, categories) => {
  for (const item of categories) {
    if (type.toLowerCase().includes(item.type.toLowerCase())) {
      return item.category;
    }
  }
  return type;
};

const getResizeImageUrl = (url, size) => {
  return url.replace(/\.(?=jpg|png|gif)/i, `_${size}x.`);
};

const getImageLink = (product, variant) => {
  const variantImage = findVariantImage(variant.id, product.images);
  if (variantImage)
    return getResizeImageUrl(addTimeForImageUrl(variantImage), 200);
  if (product.image)
    return getResizeImageUrl(addTimeForImageUrl(product.image.src), 200);
  return null;
};

const getOption = (property, options, variant) => {
  for (const option of options) {
    const name = option.name.toLowerCase();
    if (name.includes(property)) {
      const postion = option.position;
      return postion ? variant[`option${postion}`] : undefined;
    }
  }
  return undefined;
};

const convertCurrency = async (from, to, price) => {
  if (from == to) return price;
  fx.base = "USD";
  const rates = await getExchangeRates();
  fx.rates = rates ? rates.value : {};
  return fx.convert(price, { from, to });
};

const getTitle = (productTitle, variantTitle) => {
  variantTitle = variantTitle.replace(/\s\/\s/g, "/");
  const title = productTitle + variantTitle;
  return truncateString(title, 147);
};

const getAgeGroup = (variantTitle) => {
  const title = variantTitle.toLowerCase();
  if (title.includes("kid")) return "kids";
  return "adult";
};

const transformColor = (color) => {
  if (!color) return;
  let colors = color.match(/[a-zA-Z]+/g);
  let cl;
  if (colors) {
    colors = colors.splice(0, 3);
    for (const idx in colors) {
      if (idx == 0) {
        cl = `${colors[0]}`;
      } else {
        cl += `/${colors[idx]}`;
      }
    }
  }
  return cl;
};

const transformProductGroup = async (
  item,
  mmcLocation,
  store,
  categories,
  merchanId,
  singleVariant
) => {
  let group = [];
  const product = item.products;
  if (product.variants) {
    let variants = product.variants;
    if (singleVariant) {
      variants = variants.slice(0, 1);
    }
    for (const variant of variants) {
      const channel = "online";
      const contentLanguage = "en";
      const targetCountry = mmcLocation || "US";
      const id = `${channel}:${contentLanguage}:${targetCountry}`;
      if (!product.published_at) {
        group.push({
          merchanId,
          method: "delete",
          productId: id,
        });
      } else {
        const domain = store.domain ? store.domain : store.info.domain;
        if (!product.product_type) return group;
        const type = product.product_type;
        const googleProductCateogry = findCategory(type, categories);
        const imageLink = getImageLink(product, variant);
        if (googleProductCateogry && imageLink) {
          const itemGroupId = product.id;
          const additionalImageLinks = prodcut.images.map((image) => image.src);
          const link = `https://${domain}/products/${product.handle}?variant=${variant.id}`;
          const description = getDescription(product.body_html);
          const options = product.options;
          const color = getOption("color", options, variant);
          const gender = getGender(options, variant);
          const size = getOption("size", options, variant);
          const title = getTitle(product.title, variant.title);
          let price = variant.compare_at_price
            ? variant.compare_at_price
            : variant.price;
          const currency = countryCurrency(targetCountry);
          price = await convertCurrency(store.info.currency, currency, price);
          const body = {
            merchanId,
            method: getMethod(item.verb),
            product: {
              kind: "content#product",
              offerId: variant.id,
              title,
              description,
              link,
              imageLink,
              contentLanguage,
              targetCountry,
              channel,
              additionalImageLinks,
              ageGroup: getAgeGroup(variant.title),
              availability: "in Stock",
              availabilityDate: product.published_at,
              color: transformColor(color),
              condition: "new",
              gender,
              googleProductCateogry,
              gtin: itemGroupId,
              itemGroupId,
              mpn: itemGroupId,
              price: {
                currency,
                value: Number(price).toFixed(2),
              },
              sizes: [size],
            },
          };
          group.push(body);
        }
      }
    }
  }
  return group;
};

module.exports = { transformProductGroup };
