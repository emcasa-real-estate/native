var path = require("path");

/**
 * POST /users/register
 *
 * host: localhost:4000
 * accept: application/json
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGM1YzRiNGMzMzc4MTkyMjNjNWVjMDUzYmZkOWNmNzQ2.D4AHcTru5gcbGssM1bjHPy91DafV322xXnSw2ONPVhw
 * accept-language: en-us
 * authorization: undefined
 * content-length: 70
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 422;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Fri, 01 Jun 2018 23:40:11 GMT");
  res.setHeader("content-length", "47");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGM1YzRiNGMzMzc4MTkyMjNjNWVjMDUzYmZkOWNmNzQ2.D4AHcTru5gcbGssM1bjHPy91DafV322xXnSw2ONPVhw; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "bk85l3gm7jdoec73kri4qsamib5jk9ck");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJlcnJvcnMiOnsiZW1haWwiOlsiaGFzIGFscmVhZHkgYmVlbiB0YWtlbiJdfX0=", "base64"));
  res.end();

  return __filename;
};
