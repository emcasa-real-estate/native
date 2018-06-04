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
  res.setHeader("date", "Fri, 01 Jun 2018 23:46:53 GMT");
  res.setHeader("content-length", "171");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDg4YjYzNzk4YTQ2OWU5MWE5ZTJlNGFjMjRiYTExYWRj.A7C-Q3EDewBlDUA-Z6S5zGi8UV_rhP6nVSe4Q4ib1y8; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "q5ei6didrgk8ul7ta2q0scqokckecc9a");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJuZWlnaGJvcmhvb2RzIjpbIkJvdGFmb2dvIiwiQ2F0ZXRlIiwiQ29wYWNhYmFuYSIsIkZsYW1lbmdvIiwiR8OhdmVhIiwiSHVtYWl0w6EiLCJJcGFuZW1hIiwiSXRhbmhhbmfDoSIsIkphcmRpbSBCb3TDom5pY28iLCJMYWdvYSIsIkxhcmFuamVpcmFzIiwiTGVibG9uIiwiU8OjbyBDb25yYWRvIl19", "base64"));
  res.end();

  return __filename;
};
