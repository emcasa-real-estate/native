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
 * content-length: 151
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Mon, 09 Jul 2018 22:59:51 GMT");
  res.setHeader("content-length", "513");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "8973olu0gclb8i7lr818a5aqdf2qlojd");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJleHRlbnNpb25zIjp7InRyYWNpbmciOnsidmVyc2lvbiI6MSwic3RhcnRUaW1lIjoiMjAxOC0wNy0wOVQyMjo1OTo1MS42Nzg3MTlaIiwiZXhlY3V0aW9uIjp7InJlc29sdmVycyI6W3sic3RhcnRPZmZzZXQiOjYwMTAwMCwicmV0dXJuVHlwZSI6IltMaXN0aW5nXSIsInBhdGgiOlsiZmF2b3JpdGVkTGlzdGluZ3MiXSwicGFyZW50VHlwZSI6IlJvb3RRdWVyeVR5cGUiLCJtZXRhIjpudWxsLCJmaWVsZE5hbWUiOiJmYXZvcml0ZWRMaXN0aW5ncyIsImR1cmF0aW9uIjoxMjEwMDB9XX0sImVuZFRpbWUiOiIyMDE4LTA3LTA5VDIyOjU5OjUxLjY3OTUwOFoiLCJkdXJhdGlvbiI6Nzg4MDAwfSwiY2FjaGVDb250cm9sIjp7InZlcnNpb24iOjEsImhpbnRzIjpbXX19LCJlcnJvcnMiOlt7InBhdGgiOlsiZmF2b3JpdGVkTGlzdGluZ3MiXSwibWVzc2FnZSI6InVuYXV0aG9yaXplZCIsImxvY2F0aW9ucyI6W3sibGluZSI6MiwiY29sdW1uIjowfV19XSwiZGF0YSI6eyJmYXZvcml0ZWRMaXN0aW5ncyI6bnVsbH19", "base64"));
  res.end();

  return __filename;
};
