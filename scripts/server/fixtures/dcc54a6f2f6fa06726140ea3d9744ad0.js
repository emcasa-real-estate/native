var path = require("path");

/**
 * GET /interest_types?
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
  res.setHeader("date", "Sun, 13 May 2018 00:02:42 GMT");
  res.setHeader("content-length", "195");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDMzMmE2ZGJkZGEzNTNiNjc1NjFmNTM1NWUyZTY3MGI1.U8iV3QhLrNcXyq2ENtToeV7JM29qlBEmIpz4_Eh3Ve8; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "adqcert9f3u3ad29t58ba848p8d4ilp0");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJkYXRhIjpbeyJuYW1lIjoiTWUgbGlndWUgZGVudHJvIGRlIDUgbWludXRvcyIsImlkIjoxfSx7Im5hbWUiOiJNZSBsaWd1ZSBlbSB1bSBob3LDoXJpbyBlc3BlY8OtZmljbyIsImlkIjoyfSx7Im5hbWUiOiJBZ2VuZGFtZW50byBwb3IgZS1tYWlsIiwiaWQiOjN9LHsibmFtZSI6IkFnZW5kYW1lbnRvIHBvciBXaGF0c2FwcCIsImlkIjo0fV19", "base64"));
  res.end();

  return __filename;
};
