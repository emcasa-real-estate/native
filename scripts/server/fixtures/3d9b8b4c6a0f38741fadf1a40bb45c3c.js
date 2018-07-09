var path = require("path");

/**
 * POST /users/login
 *
 * host: localhost:4000
 * accept: application/json
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDM3NDY5YmU2NzAyOGFhNDg2OGNmMGU2YmVmNGIyNGZk.TuWZqkkQ_4EpHmUZbGmH1W2fva0owkdrkyAKNI_Jffs
 * accept-language: en-us
 * authorization: undefined
 * content-length: 65
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 401;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Mon, 09 Jul 2018 16:24:59 GMT");
  res.setHeader("content-length", "39");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDM3NDY5YmU2NzAyOGFhNDg2OGNmMGU2YmVmNGIyNGZk.TuWZqkkQ_4EpHmUZbGmH1W2fva0owkdrkyAKNI_Jffs; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "c2jvc88m641euo974i2grprmdttnpjub");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJlcnJvcnMiOnsiZGV0YWlsIjoiVW5hdXRoZW50aWNhdGVkIn19", "base64"));
  res.end();

  return __filename;
};
