var path = require("path");

/**
 * POST /users/register
 *
 * host: localhost:4000
 * accept: application/json
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGVmMzAwNzU1N2NjMWI5MDEwYWVmZmRiM2I4ZWVjMmRm.cuDk6MItcPZ0PqWWAlmnyWH7gR5QelXYkILVyixbjGQ
 * accept-language: en-us
 * authorization: undefined
 * content-length: 70
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 422;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Fri, 08 Jun 2018 19:04:13 GMT");
  res.setHeader("content-length", "47");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGVmMzAwNzU1N2NjMWI5MDEwYWVmZmRiM2I4ZWVjMmRm.cuDk6MItcPZ0PqWWAlmnyWH7gR5QelXYkILVyixbjGQ; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "qasclj2umabft0vlsf1c1r3iqotjo424");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJlcnJvcnMiOnsiZW1haWwiOlsiaGFzIGFscmVhZHkgYmVlbiB0YWtlbiJdfX0=", "base64"));
  res.end();

  return __filename;
};
