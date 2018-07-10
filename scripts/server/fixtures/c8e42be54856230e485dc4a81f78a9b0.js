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
 * authorization: Token eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJSZSIsImV4cCI6MTUzMzc2ODg4MiwiaWF0IjoxNTMxMTc2ODgyLCJpc3MiOiJSZSIsImp0aSI6IjE2ZmI3YjJhLWMwOTUtNDQ4YS1hZTQ5LWJlYTk4ZDgwZTJhOSIsIm5iZiI6MTUzMTE3Njg4MSwic3ViIjoiMjE1IiwidHlwIjoiYWNjZXNzIn0.AWg77j4A_owpSJF-hkctzt1LqN2wiFMO0F-kLVnbsv9VPFNDqjxMJDByzHbssR8uX2McgP6uvCQJABSFTEHPQODNAI6Vu1aT8cqR-O4RVYv5BCfBYePg_doX-9vPTHsj7XOTSf4hnYQwMAuP84l8b113EpGD39LuF7h5iCdXSiTt8k1u
 * content-length: 745
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Mon, 09 Jul 2018 22:55:37 GMT");
  res.setHeader("content-length", "907");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "o8rscavi6icf5g8t2tjq885ufi17ahcd");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJleHRlbnNpb25zIjp7InRyYWNpbmciOnsidmVyc2lvbiI6MSwic3RhcnRUaW1lIjoiMjAxOC0wNy0wOVQyMjo1NTozNy41MDMxNjFaIiwiZXhlY3V0aW9uIjp7InJlc29sdmVycyI6W3sic3RhcnRPZmZzZXQiOjI4NTIwMDAsInJldHVyblR5cGUiOiJVc2VyIiwicGF0aCI6WyJlZGl0VXNlclByb2ZpbGUiXSwicGFyZW50VHlwZSI6IlJvb3RNdXRhdGlvblR5cGUiLCJtZXRhIjpudWxsLCJmaWVsZE5hbWUiOiJlZGl0VXNlclByb2ZpbGUiLCJkdXJhdGlvbiI6MTAwNzQwMDB9LHsic3RhcnRPZmZzZXQiOjEyOTUyMDAwLCJyZXR1cm5UeXBlIjoiSUQiLCJwYXRoIjpbImVkaXRVc2VyUHJvZmlsZSIsImlkIl0sInBhcmVudFR5cGUiOiJVc2VyIiwibWV0YSI6bnVsbCwiZmllbGROYW1lIjoiaWQiLCJkdXJhdGlvbiI6MjUwMDB9LHsic3RhcnRPZmZzZXQiOjEyOTgzMDAwLCJyZXR1cm5UeXBlIjoiU3RyaW5nIiwicGF0aCI6WyJlZGl0VXNlclByb2ZpbGUiLCJuYW1lIl0sInBhcmVudFR5cGUiOiJVc2VyIiwibWV0YSI6bnVsbCwiZmllbGROYW1lIjoibmFtZSIsImR1cmF0aW9uIjo3MDAwfSx7InN0YXJ0T2Zmc2V0IjoxMjk5NTAwMCwicmV0dXJuVHlwZSI6IlN0cmluZyIsInBhdGgiOlsiZWRpdFVzZXJQcm9maWxlIiwicGhvbmUiXSwicGFyZW50VHlwZSI6IlVzZXIiLCJtZXRhIjpudWxsLCJmaWVsZE5hbWUiOiJwaG9uZSIsImR1cmF0aW9uIjozMDAwfV19LCJlbmRUaW1lIjoiMjAxOC0wNy0wOVQyMjo1NTozNy41MTYyMjJaIiwiZHVyYXRpb24iOjEzMDU0MDAwfSwiY2FjaGVDb250cm9sIjp7InZlcnNpb24iOjEsImhpbnRzIjpbXX19LCJkYXRhIjp7ImVkaXRVc2VyUHJvZmlsZSI6eyJwaG9uZSI6IjIyMjIyMjIyIiwibmFtZSI6IlRlc3QiLCJpZCI6IjIxNSIsIl9fdHlwZW5hbWUiOiJVc2VyIn19fQ==", "base64"));
  res.end();

  return __filename;
};
