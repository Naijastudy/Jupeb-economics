module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{js,css,html,png,jpg,svg,ico,json}"],
  swDest: "build/service-worker.js",
  swSrc: "public/service-worker.js",
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
};
