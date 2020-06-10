const PROXY_CONFIG = [
  {
    context: ["/.auth", "/api"],
    target: "http://localhost:7170",
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
