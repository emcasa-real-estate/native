var path = require("path");

/**
 * POST /graphql_api
 *
 * host: localhost:4000
 * accept: * / *
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGFjNzE4ZTRjYzFhZGExODI5MWIzYjA1NjU3N2IwMWY3.5Ao8hz5vG8DELGkyGx5FenaDqVGXhxa20nHd8W1PT2o
 * accept-language: en-us
 * authorization: undefined
 * content-length: 166
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Fri, 06 Jul 2018 21:22:12 GMT");
  res.setHeader("content-length", "581");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGFjNzE4ZTRjYzFhZGExODI5MWIzYjA1NjU3N2IwMWY3.5Ao8hz5vG8DELGkyGx5FenaDqVGXhxa20nHd8W1PT2o; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "845v79sorbcajne7uf2gkqlel5asdfod");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJleHRlbnNpb25zIjp7InRyYWNpbmciOnsidmVyc2lvbiI6MSwic3RhcnRUaW1lIjoiMjAxOC0wNy0wNlQyMToyMjoxMi44NzcyNzVaIiwiZXhlY3V0aW9uIjp7InJlc29sdmVycyI6W3sic3RhcnRPZmZzZXQiOjM0MDQwMDAsInJldHVyblR5cGUiOiJMaXN0aW5nIiwicGF0aCI6WyJ0b3VyVmlzdWFsaXplZCJdLCJwYXJlbnRUeXBlIjoiUm9vdE11dGF0aW9uVHlwZSIsIm1ldGEiOm51bGwsImZpZWxkTmFtZSI6InRvdXJWaXN1YWxpemVkIiwiZHVyYXRpb24iOjM0ODU5MDAwfSx7InN0YXJ0T2Zmc2V0IjozODMwMDAwMCwicmV0dXJuVHlwZSI6IklEIiwicGF0aCI6WyJ0b3VyVmlzdWFsaXplZCIsImlkIl0sInBhcmVudFR5cGUiOiJMaXN0aW5nIiwibWV0YSI6bnVsbCwiZmllbGROYW1lIjoiaWQiLCJkdXJhdGlvbiI6MzkwMDB9XX0sImVuZFRpbWUiOiIyMDE4LTA3LTA2VDIxOjIyOjEyLjkxNTY2NFoiLCJkdXJhdGlvbiI6MzgzODgwMDB9LCJjYWNoZUNvbnRyb2wiOnsidmVyc2lvbiI6MSwiaGludHMiOltdfX0sImRhdGEiOnsidG91clZpc3VhbGl6ZWQiOnsiaWQiOiIyMDUiLCJfX3R5cGVuYW1lIjoiTGlzdGluZyJ9fX0=", "base64"));
  res.end();

  return __filename;
};
