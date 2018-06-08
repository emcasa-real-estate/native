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
  res.setHeader("date", "Fri, 08 Jun 2018 19:08:45 GMT");
  res.setHeader("content-length", "232");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDJjMjM0YTU2OTdkN2JiY2M5Zjc4OGI2NTZlMmRjNmQy.ISwS04396xuwcOpyy0xyCTezLCA6ENIbW4euBkspsD0; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "ccaq7pgj0h2l99b45ov2dj39io32rcsi");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJkYXRhIjpbeyJuYW1lIjoiTWUgbGlndWUgZGVudHJvIGRlIDUgbWludXRvcyIsImlkIjoxfSx7Im5hbWUiOiJNZSBsaWd1ZSBlbSB1bSBob3LDoXJpbyBlc3BlY8OtZmljbyIsImlkIjoyfSx7Im5hbWUiOiJBZ2VuZGFtZW50byBwb3IgZS1tYWlsIiwiaWQiOjN9LHsibmFtZSI6IkFnZW5kYW1lbnRvIHBvciBXaGF0c2FwcCIsImlkIjo0fSx7Im5hbWUiOiJBZ2VuZGFtZW50byBvbmxpbmUiLCJpZCI6NX1dfQ==", "base64"));
  res.end();

  return __filename;
};
