var path = require("path");

/**
 * POST /graphql_api
 *
 * host: localhost:4000
 * accept: * / *
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM
 * accept-language: en-us
 * authorization: Token eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJSZSIsImV4cCI6MTUzMTA3NDgyOSwiaWF0IjoxNTI4NDgyODI5LCJpc3MiOiJSZSIsImp0aSI6ImZmNGU1Y2I3LThhZDUtNDc2ZC1iNjdjLTRiOTdlYjdlZjdjYSIsIm5iZiI6MTUyODQ4MjgyOCwic3ViIjoiMjE1IiwidHlwIjoiYWNjZXNzIn0.ASfXwOnO86tZaDVCRfoR8NcgQIuQKBI37_ZwX7_uhHn_PRHHWltsFMdaD6zb7quOlrBV-rbwkFCHBFFl8bz5RzSBAdX4pweFIAOdWgoS-pipX0bqRpCFF1Z6zim-upTg4ju3O7zKeZN653wqFUKoio-vT2Mr8l9dHxvFLz5Qzs1wyoVr
 * content-length: 106
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Wed, 04 Jul 2018 19:43:48 GMT");
  res.setHeader("content-length", "67");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "j9s4js5nfrvbc4acintocemc0esi52v2");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJkYXRhIjp7ImZhdm9yaXRlZExpc3RpbmdzIjpbeyJpZCI6Ijg3IiwiX190eXBlbmFtZSI6Ikxpc3RpbmcifV19fQ==", "base64"));
  res.end();

  return __filename;
};
