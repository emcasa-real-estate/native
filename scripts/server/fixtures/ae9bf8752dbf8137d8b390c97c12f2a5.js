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
  res.setHeader("date", "Sun, 13 May 2018 00:02:43 GMT");
  res.setHeader("content-length", "171");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGQwMmY0ODFjMjRlMGJmYTcwMTVhM2Q2OTBiM2YzMjk4.QDgMhHy6ySMgaJSH2k05scHY2p8DnM2qlfY32J3p33Q; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "a1ono836djji3sni96mo9c0535va8701");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJuZWlnaGJvcmhvb2RzIjpbIkJvdGFmb2dvIiwiQ2F0ZXRlIiwiQ29wYWNhYmFuYSIsIkZsYW1lbmdvIiwiR8OhdmVhIiwiSHVtYWl0w6EiLCJJcGFuZW1hIiwiSXRhbmhhbmfDoSIsIkphcmRpbSBCb3TDom5pY28iLCJMYWdvYSIsIkxhcmFuamVpcmFzIiwiTGVibG9uIiwiU8OjbyBDb25yYWRvIl19", "base64"));
  res.end();

  return __filename;
};
