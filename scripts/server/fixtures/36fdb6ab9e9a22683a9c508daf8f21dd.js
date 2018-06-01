var path = require("path");

/**
 * POST /graphql_api
 *
 * host: localhost:4000
 * accept: * / *
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGM1YzRiNGMzMzc4MTkyMjNjNWVjMDUzYmZkOWNmNzQ2.D4AHcTru5gcbGssM1bjHPy91DafV322xXnSw2ONPVhw
 * accept-language: en-us
 * authorization: Token eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJSZSIsImV4cCI6MTUzMDQ4ODQyMywiaWF0IjoxNTI3ODk2NDIzLCJpc3MiOiJSZSIsImp0aSI6IjBkZGRlMjgzLTI5OWEtNGFhOC1iZWU4LWE0YWU4ODk4ZjIzMCIsIm5iZiI6MTUyNzg5NjQyMiwic3ViIjoiNTIiLCJ0eXAiOiJhY2Nlc3MifQ.AV-_IlI1Fy9Ks3f7M0NJobyoxpnVQkTN3HnOGdjwqGBNsWTx2YY4FYKx7-9i6DHon3FaJhVhG054wm8n9W4kTMMSAZnabkUxV_GyJTyxrefJW0butZKtl8-gpqcXFDfBNokkruqkRX_I6ptRSFaP3e3_3oHrDhAF3rtQoyah736JW7oK
 * content-length: 106
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Fri, 01 Jun 2018 23:48:21 GMT");
  res.setHeader("content-length", "33");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGM1YzRiNGMzMzc4MTkyMjNjNWVjMDUzYmZkOWNmNzQ2.D4AHcTru5gcbGssM1bjHPy91DafV322xXnSw2ONPVhw; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "vv9g81tvbo2uifur3p43rpun5hs0p2q9");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJkYXRhIjp7ImZhdm9yaXRlZExpc3RpbmdzIjpbXX19", "base64"));
  res.end();

  return __filename;
};
