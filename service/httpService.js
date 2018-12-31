const request = require("request-promise");
const CacheService = require("./cacheService");

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new CacheService(ttl);

exports.get = async function(endpoint) {
  var options = {
    uri: endpoint,
    method: "GET",
    json: true
  };

  const key = endpoint;

  return cache
    .get(key, async () => await request(options))
    .then(result => {
      return result;
    });
};
