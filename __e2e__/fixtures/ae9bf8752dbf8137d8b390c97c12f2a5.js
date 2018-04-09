var path = require("path");

/**
 * GET /neighborhoods?
 *
 * host: localhost:4000
 * content-type: application/json
 * accept: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * accept-language: en-us
 * accept-encoding: gzip, deflate
 * connection: keep-alive
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Wed, 04 Apr 2018 22:10:51 GMT");
  res.setHeader("content-length", "171");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDE5NTBiNGEwMjQ2MDljZTdmZTk1M2EyYzAyNmU4ODI3.FgRU4q4d6suf_qiO0zUFVfJKZ0pJvit31KI3xHZJbcU; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "og9nsi143ecm7nhqelc15dvcvv6ppiet");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJuZWlnaGJvcmhvb2RzIjpbIkJvdGFmb2dvIiwiQ2F0ZXRlIiwiQ29wYWNhYmFuYSIsIkZsYW1lbmdvIiwiR8OhdmVhIiwiSHVtYWl0w6EiLCJJcGFuZW1hIiwiSXRhbmhhbmfDoSIsIkphcmRpbSBCb3TDom5pY28iLCJMYWdvYSIsIkxhcmFuamVpcmFzIiwiTGVibG9uIiwiU8OjbyBDb25yYWRvIl19", "base64"));
  res.end();

  return __filename;
};
