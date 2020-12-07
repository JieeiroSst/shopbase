const { sendRequest, updateToken } = require("./shopbase");

const readData = async () => {
  const data = await sendRequest();
  console.log(">>>>>", data.data);
  console.log(data.data.products);
  for (let item of data.data.products) {
    console.log("variants>>>>>", item);
  }
};

// readData();

// updateToken("wweb");
