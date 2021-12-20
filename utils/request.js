const $axios = require("axios");
const _ = require("lodash");
const global_config = require("../config.json");

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15";

const service = $axios.create({
  timeout: 8000,
});
service.interceptors.request.use(
  (config) => {
    const _headers = config.headers;
    const headers = {
      Referer: "https://www.bilibili.com",
      Connection: "keep-alive",
      "User-Agent": USER_AGENT,
      Cookie: global_config.cookie,
    };
    if (config.method.toUpperCase() === "GET") {
      headers["Content-Type"] = "application/json";
    } else if (config.method.toUpperCase() === "POST") {
      headers["Content-Type"] =
        typeof config.data === "string"
          ? "application/x-www-form-urlencoded"
          : "application/json";
    }
    config.headers = {
      ..._headers,
      ...headers,
    };
    return config;
  },
  (error) => ({ status: 0, msg: error.message })
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      console.log("==========响应 start==========");
      console.log(response.config.url);
      console.log(response.data);
      console.log("==========响应 end==========");
      return response.data;
    }
    throw new Error("请求异常");
  },
  (error) => {
    console.log("axios err", error.message);
  }
);

module.exports = service;
