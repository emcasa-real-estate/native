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
 * authorization: Token eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJSZSIsImV4cCI6MTUzMTA3NDg3MCwiaWF0IjoxNTI4NDgyODcwLCJpc3MiOiJSZSIsImp0aSI6Ijg1Mzk1NzMyLWZlMTEtNDM4ZC05N2Y2LTZjZDYwMjFmOGExZSIsIm5iZiI6MTUyODQ4Mjg2OSwic3ViIjoiMjE1IiwidHlwIjoiYWNjZXNzIn0.APCiTZfdITzppIatvX6WxMsf9Edgxx0QpVPlR8jx60-U5xH9kVThQJE6gREZWhyYpwTMb7tG5m7WQCG0mEM1WIJVABPH0CtzLh1juGDxEr-tXugOp0OC0qZ_Dx7PDYxkyKcnAl_AcG0B3CexRhBpbkSG2Rgb2rsWkqpKFHA9vlVk25T8
 * content-length: 337
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Fri, 08 Jun 2018 19:12:03 GMT");
  res.setHeader("content-length", "580");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "b0tqaaujn8u58uhv6eltfmg9hg2jp56q");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJkYXRhIjp7InVzZXJMaXN0aW5ncyI6W3sicHJpY2UiOjAsImlzQWN0aXZlIjpmYWxzZSwiaW1hZ2VzIjpbXSwiaWQiOiIzNjAiLCJkZXNjcmlwdGlvbiI6bnVsbCwiYWRkcmVzcyI6eyJzdHJlZXQiOiJSdWEgVmVyZ3VlaXJvIiwic3RhdGUiOiJTUCIsInBvc3RhbENvZGUiOiIwMTUwNC0wMDEiLCJuZWlnaGJvcmhvb2QiOiJMaWJlcmRhZGUiLCJsbmciOi00Ni42Mzg2NzA3LCJsYXQiOi0yMy41NjMwNjU3LCJjaXR5IjoiU8OjbyBQYXVsbyIsIl9fdHlwZW5hbWUiOiJBZGRyZXNzIn0sIl9fdHlwZW5hbWUiOiJMaXN0aW5nIn0seyJwcmljZSI6MCwiaXNBY3RpdmUiOmZhbHNlLCJpbWFnZXMiOltdLCJpZCI6IjM1OSIsImRlc2NyaXB0aW9uIjpudWxsLCJhZGRyZXNzIjp7InN0cmVldCI6IlIuIEF1Z3VzdGEiLCJzdGF0ZSI6IlNQIiwicG9zdGFsQ29kZSI6IjAxMzA2IiwibmVpZ2hib3Job29kIjoiQ29uc29sYcOnw6NvIiwibG5nIjotNDYuNjQ3NDY1Mzk5OTk5OTksImxhdCI6LTIzLjU1MDM5NTcsImNpdHkiOiJTw6NvIFBhdWxvIiwiX190eXBlbmFtZSI6IkFkZHJlc3MifSwiX190eXBlbmFtZSI6Ikxpc3RpbmcifV19fQ==", "base64"));
  res.end();

  return __filename;
};
