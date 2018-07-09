var path = require("path");

/**
 * GET /neighborhoods?
 *
 * host: localhost:4000
 * content-type: application/json
 * connection: keep-alive
 * accept: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * authorization: undefined
 * accept-language: en-us
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Mon, 09 Jul 2018 22:31:25 GMT");
  res.setHeader("content-length", "206");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDJkNzU0NjUxNWY5NzcxMzlkMDM2MWZlMzhhMTZhZmU1.kJRLquRPG21ATzM9msWTm8RcPV1UJRAwTtBWF9nXO-s; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "mmpn46f5co2nuk7pjq0dn1jk35n45p29");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJuZWlnaGJvcmhvb2RzIjpbIkJvdGFmb2dvIiwiQ2F0ZXRlIiwiQ29wYWNhYmFuYSIsIkNvc21lIFZlbGhvIiwiRmxhbWVuZ28iLCJHw6F2ZWEiLCJIdW1haXTDoSIsIklwYW5lbWEiLCJJdGFuaGFuZ8OhIiwiSmFyZGltIEJvdMOibmljbyIsIkpvw6EiLCJMYWdvYSIsIkxhcmFuamVpcmFzIiwiTGVibG9uIiwiTGVtZSIsIlPDo28gQ29ucmFkbyIsIlVyY2EiXX0=", "base64"));
  res.end();

  return __filename;
};
