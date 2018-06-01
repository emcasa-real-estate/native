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
  res.setHeader("date", "Fri, 01 Jun 2018 23:46:53 GMT");
  res.setHeader("content-length", "195");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDcyNmYwMWYxNjRmZmFiZDdkZTUyNGM1ZjA5NDlmNzY5.UXlbvYH7ipNWFojHmI5au0e63JeksQWdXk1ya8V5a_Y; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "uqvhn9571829kcn249rac4spa2t5954u");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJkYXRhIjpbeyJuYW1lIjoiTWUgbGlndWUgZGVudHJvIGRlIDUgbWludXRvcyIsImlkIjoxfSx7Im5hbWUiOiJNZSBsaWd1ZSBlbSB1bSBob3LDoXJpbyBlc3BlY8OtZmljbyIsImlkIjoyfSx7Im5hbWUiOiJBZ2VuZGFtZW50byBwb3IgZS1tYWlsIiwiaWQiOjN9LHsibmFtZSI6IkFnZW5kYW1lbnRvIHBvciBXaGF0c2FwcCIsImlkIjo0fV19", "base64"));
  res.end();

  return __filename;
};
