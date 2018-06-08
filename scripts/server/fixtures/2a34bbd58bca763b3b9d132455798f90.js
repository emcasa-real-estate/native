var path = require("path");

/**
 * POST /graphql_api
 *
 * host: localhost:4000
 * accept: * / *
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGVmMzAwNzU1N2NjMWI5MDEwYWVmZmRiM2I4ZWVjMmRm.cuDk6MItcPZ0PqWWAlmnyWH7gR5QelXYkILVyixbjGQ
 * accept-language: en-us
 * authorization: undefined
 * content-length: 165
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Fri, 08 Jun 2018 19:06:09 GMT");
  res.setHeader("content-length", "62");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGVmMzAwNzU1N2NjMWI5MDEwYWVmZmRiM2I4ZWVjMmRm.cuDk6MItcPZ0PqWWAlmnyWH7gR5QelXYkILVyixbjGQ; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "m9f8ad5j7a1eh9cibs2uslbg2dc1jvr9");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJkYXRhIjp7InRvdXJWaXN1YWxpemVkIjp7ImlkIjoiODYiLCJfX3R5cGVuYW1lIjoiTGlzdGluZyJ9fX0=", "base64"));
  res.end();

  return __filename;
};
