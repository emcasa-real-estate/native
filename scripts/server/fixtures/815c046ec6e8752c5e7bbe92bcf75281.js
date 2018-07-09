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
 * authorization: undefined
 * content-length: 167
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Mon, 09 Jul 2018 22:52:12 GMT");
  res.setHeader("content-length", "575");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "i469kt92hjbqetp03au2jdv4mgnjjagj");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJleHRlbnNpb25zIjp7InRyYWNpbmciOnsidmVyc2lvbiI6MSwic3RhcnRUaW1lIjoiMjAxOC0wNy0wOVQyMjo1MjoxMy4xNDg2NzlaIiwiZXhlY3V0aW9uIjp7InJlc29sdmVycyI6W3sic3RhcnRPZmZzZXQiOjc3NjAwMCwicmV0dXJuVHlwZSI6Ikxpc3RpbmciLCJwYXRoIjpbInRvdXJWaXN1YWxpemVkIl0sInBhcmVudFR5cGUiOiJSb290TXV0YXRpb25UeXBlIiwibWV0YSI6bnVsbCwiZmllbGROYW1lIjoidG91clZpc3VhbGl6ZWQiLCJkdXJhdGlvbiI6ODc0MDAwfSx7InN0YXJ0T2Zmc2V0IjoxNzAzMDAwLCJyZXR1cm5UeXBlIjoiSUQiLCJwYXRoIjpbInRvdXJWaXN1YWxpemVkIiwiaWQiXSwicGFyZW50VHlwZSI6Ikxpc3RpbmciLCJtZXRhIjpudWxsLCJmaWVsZE5hbWUiOiJpZCIsImR1cmF0aW9uIjoxMzAwMH1dfSwiZW5kVGltZSI6IjIwMTgtMDctMDlUMjI6NTI6MTMuMTUwNDU5WiIsImR1cmF0aW9uIjoxNzc5MDAwfSwiY2FjaGVDb250cm9sIjp7InZlcnNpb24iOjEsImhpbnRzIjpbXX19LCJkYXRhIjp7InRvdXJWaXN1YWxpemVkIjp7ImlkIjoiODciLCJfX3R5cGVuYW1lIjoiTGlzdGluZyJ9fX0=", "base64"));
  res.end();

  return __filename;
};
