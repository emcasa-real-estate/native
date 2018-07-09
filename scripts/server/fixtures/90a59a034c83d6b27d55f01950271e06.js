var path = require("path");

/**
 * POST /graphql_api
 *
 * host: localhost:4000
 * accept: * / *
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDM3NDY5YmU2NzAyOGFhNDg2OGNmMGU2YmVmNGIyNGZk.TuWZqkkQ_4EpHmUZbGmH1W2fva0owkdrkyAKNI_Jffs
 * accept-language: en-us
 * authorization: undefined
 * content-length: 168
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Mon, 09 Jul 2018 16:25:25 GMT");
  res.setHeader("content-length", "577");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDM3NDY5YmU2NzAyOGFhNDg2OGNmMGU2YmVmNGIyNGZk.TuWZqkkQ_4EpHmUZbGmH1W2fva0owkdrkyAKNI_Jffs; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "cqhoktu5ufm68lg3r7ig273oujh44fqm");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJleHRlbnNpb25zIjp7InRyYWNpbmciOnsidmVyc2lvbiI6MSwic3RhcnRUaW1lIjoiMjAxOC0wNy0wOVQxNjoyNToyNi4yNDk1NzlaIiwiZXhlY3V0aW9uIjp7InJlc29sdmVycyI6W3sic3RhcnRPZmZzZXQiOjY4MDAwMCwicmV0dXJuVHlwZSI6Ikxpc3RpbmciLCJwYXRoIjpbInRvdXJWaXN1YWxpemVkIl0sInBhcmVudFR5cGUiOiJSb290TXV0YXRpb25UeXBlIiwibWV0YSI6bnVsbCwiZmllbGROYW1lIjoidG91clZpc3VhbGl6ZWQiLCJkdXJhdGlvbiI6MTU5ODAwMH0seyJzdGFydE9mZnNldCI6MjMzNzAwMCwicmV0dXJuVHlwZSI6IklEIiwicGF0aCI6WyJ0b3VyVmlzdWFsaXplZCIsImlkIl0sInBhcmVudFR5cGUiOiJMaXN0aW5nIiwibWV0YSI6bnVsbCwiZmllbGROYW1lIjoiaWQiLCJkdXJhdGlvbiI6MTEwMDB9XX0sImVuZFRpbWUiOiIyMDE4LTA3LTA5VDE2OjI1OjI2LjI1MTk4NFoiLCJkdXJhdGlvbiI6MjM4ODAwMH0sImNhY2hlQ29udHJvbCI6eyJ2ZXJzaW9uIjoxLCJoaW50cyI6W119fSwiZGF0YSI6eyJ0b3VyVmlzdWFsaXplZCI6eyJpZCI6IjI1MSIsIl9fdHlwZW5hbWUiOiJMaXN0aW5nIn19fQ==", "base64"));
  res.end();

  return __filename;
};
