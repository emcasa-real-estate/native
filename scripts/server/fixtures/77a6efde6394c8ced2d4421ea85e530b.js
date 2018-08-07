var path = require("path");

/**
 * POST /graphql_api
 *
 * host: localhost:4000
 * accept: * / *
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDJkNzU0NjUxNWY5NzcxMzlkMDM2MWZlMzhhMTZhZmU1.kJRLquRPG21ATzM9msWTm8RcPV1UJRAwTtBWF9nXO-s
 * accept-language: en-us
 * authorization: undefined
 * content-length: 167
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Tue, 07 Aug 2018 18:00:42 GMT");
  res.setHeader("content-length", "580");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDJkNzU0NjUxNWY5NzcxMzlkMDM2MWZlMzhhMTZhZmU1.kJRLquRPG21ATzM9msWTm8RcPV1UJRAwTtBWF9nXO-s; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "gu20b1epad181g3tjliomhdtcppf3ga7");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJleHRlbnNpb25zIjp7InRyYWNpbmciOnsidmVyc2lvbiI6MSwic3RhcnRUaW1lIjoiMjAxOC0wOC0wN1QxODowMDo0Mi44NjA5NTlaIiwiZXhlY3V0aW9uIjp7InJlc29sdmVycyI6W3sic3RhcnRPZmZzZXQiOjM0NTcwMDAsInJldHVyblR5cGUiOiJMaXN0aW5nIiwicGF0aCI6WyJ0b3VyVmlzdWFsaXplZCJdLCJwYXJlbnRUeXBlIjoiUm9vdE11dGF0aW9uVHlwZSIsIm1ldGEiOm51bGwsImZpZWxkTmFtZSI6InRvdXJWaXN1YWxpemVkIiwiZHVyYXRpb24iOjg0MzI2MDAwfSx7InN0YXJ0T2Zmc2V0Ijo4Nzg2MjAwMCwicmV0dXJuVHlwZSI6IklEIiwicGF0aCI6WyJ0b3VyVmlzdWFsaXplZCIsImlkIl0sInBhcmVudFR5cGUiOiJMaXN0aW5nIiwibWV0YSI6bnVsbCwiZmllbGROYW1lIjoiaWQiLCJkdXJhdGlvbiI6MTkwMDB9XX0sImVuZFRpbWUiOiIyMDE4LTA4LTA3VDE4OjAwOjQyLjk0OTA2NVoiLCJkdXJhdGlvbiI6ODc5MzcwMDB9LCJjYWNoZUNvbnRyb2wiOnsidmVyc2lvbiI6MSwiaGludHMiOltdfX0sImRhdGEiOnsidG91clZpc3VhbGl6ZWQiOnsiaWQiOiIyNCIsIl9fdHlwZW5hbWUiOiJMaXN0aW5nIn19fQ==", "base64"));
  res.end();

  return __filename;
};
