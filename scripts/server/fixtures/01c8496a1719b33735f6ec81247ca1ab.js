var path = require("path");

/**
 * POST /listings
 *
 * host: localhost:4000
 * accept: application/json
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGM1YzRiNGMzMzc4MTkyMjNjNWVjMDUzYmZkOWNmNzQ2.D4AHcTru5gcbGssM1bjHPy91DafV322xXnSw2ONPVhw
 * accept-language: en-us
 * authorization: Token eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJSZSIsImV4cCI6MTUzMDU1Mjc3NSwiaWF0IjoxNTI3OTYwNzc1LCJpc3MiOiJSZSIsImp0aSI6ImEwMWU2ODIwLTUyZjctNDQwMi1hOGRlLTJiODI4MGQxZDA3ZSIsIm5iZiI6MTUyNzk2MDc3NCwic3ViIjoiNTIiLCJ0eXAiOiJhY2Nlc3MifQ.AAihVC_NsjaaHbCyhPZdfDbYi6xATioK1C3yffSvuxmvrfzkURnas6bfcMF7Z0uI4JEnl1zDKO5A7ET2G3xQIRfwAWh-ORnOV5NgoIe1Y0MjCMrmkwqUwDl9gryCEmwmXgxlltbl8tI00_TTtnDIyvnj_UAKQfoNoGn5HoQdYctRVGiU
 * content-length: 345
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 201;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Tue, 05 Jun 2018 16:51:24 GMT");
  res.setHeader("content-length", "22");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGM1YzRiNGMzMzc4MTkyMjNjNWVjMDUzYmZkOWNmNzQ2.D4AHcTru5gcbGssM1bjHPy91DafV322xXnSw2ONPVhw; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "l13jcj8duoh2alj49369ldq8haufob0r");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJsaXN0aW5nIjp7ImlkIjoxMTZ9fQ==", "base64"));
  res.end();

  return __filename;
};
