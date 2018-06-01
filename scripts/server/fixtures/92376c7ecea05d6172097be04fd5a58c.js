var path = require("path");

/**
 * POST /users/login
 *
 * host: localhost:4000
 * accept: application/json
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDVjNGMwMzZmNmI4NjJiYjUyMzQzYTIzZjBjZThlNGFh.mH0hPdr2eOaRLZYmfmgl8E61plzHDDQiMYGYh6VzvL4
 * accept-language: en-us
 * authorization: undefined
 * content-length: 58
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 401;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Fri, 01 Jun 2018 21:03:13 GMT");
  res.setHeader("content-length", "39");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDVjNGMwMzZmNmI4NjJiYjUyMzQzYTIzZjBjZThlNGFh.mH0hPdr2eOaRLZYmfmgl8E61plzHDDQiMYGYh6VzvL4; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "3n5phepv66sfo12etvk47891ic4mtc3t");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJlcnJvcnMiOnsiZGV0YWlsIjoiVW5hdXRoZW50aWNhdGVkIn19", "base64"));
  res.end();

  return __filename;
};
