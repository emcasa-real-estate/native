var path = require("path");

/**
 * GET /interest_types?
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
  res.setHeader("content-length", "195");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGRjZGMzMDU5MTA2ZGE3NjhlYjI0NGY2ODkyZjk3YTY5.Yx1hsV95sBUXOU6SZCTJMFkSQwg6B5XtgyjVqppKwsw; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "t1n2rgpq7b0kr74ei4m5es72c1epb6ck");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJkYXRhIjpbeyJuYW1lIjoiTWUgbGlndWUgZGVudHJvIGRlIDUgbWludXRvcyIsImlkIjoxfSx7Im5hbWUiOiJNZSBsaWd1ZSBlbSB1bSBob3LDoXJpbyBlc3BlY8OtZmljbyIsImlkIjoyfSx7Im5hbWUiOiJBZ2VuZGFtZW50byBwb3IgZS1tYWlsIiwiaWQiOjN9LHsibmFtZSI6IkFnZW5kYW1lbnRvIHBvciBXaGF0c2FwcCIsImlkIjo0fV19", "base64"));
  res.end();

  return __filename;
};
