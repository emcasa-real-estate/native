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
 * authorization: Token eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJSZSIsImV4cCI6MTUzMzc0NTM2NiwiaWF0IjoxNTMxMTUzMzY2LCJpc3MiOiJSZSIsImp0aSI6IjIyMDJkZjBiLWEwOWEtNDk4NS04YjczLTQ5ZDU4MmM1ZDMyMyIsIm5iZiI6MTUzMTE1MzM2NSwic3ViIjoiMjE1IiwidHlwIjoiYWNjZXNzIn0.ACfkzlClsH6WQVJb4IIu97V_PxqT3-xl-Ki12_0yuW10qkDfcVv46LhHvF0FVvd_1ak_qAmmxIErNgAnVFbrBT8sAG_Fc1b1shxHRH-0QukRytHVHx9hgzRT_McTMAr317bERDO707MLIH7gDg6X4Srui5OntO9bkEMq-XjYsB9rufN8
 * content-length: 745
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Mon, 09 Jul 2018 16:23:16 GMT");
  res.setHeader("content-length", "906");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIDM3NDY5YmU2NzAyOGFhNDg2OGNmMGU2YmVmNGIyNGZk.TuWZqkkQ_4EpHmUZbGmH1W2fva0owkdrkyAKNI_Jffs; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "se3bea650epmipgnu7grgqjkealkfnol");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJleHRlbnNpb25zIjp7InRyYWNpbmciOnsidmVyc2lvbiI6MSwic3RhcnRUaW1lIjoiMjAxOC0wNy0wOVQxNjoyMzoxNy43NTE0MDNaIiwiZXhlY3V0aW9uIjp7InJlc29sdmVycyI6W3sic3RhcnRPZmZzZXQiOjkwODAwMCwicmV0dXJuVHlwZSI6IlVzZXIiLCJwYXRoIjpbImVkaXRVc2VyUHJvZmlsZSJdLCJwYXJlbnRUeXBlIjoiUm9vdE11dGF0aW9uVHlwZSIsIm1ldGEiOm51bGwsImZpZWxkTmFtZSI6ImVkaXRVc2VyUHJvZmlsZSIsImR1cmF0aW9uIjoxMDY2MDAwMH0seyJzdGFydE9mZnNldCI6MTIwODgwMDAsInJldHVyblR5cGUiOiJJRCIsInBhdGgiOlsiZWRpdFVzZXJQcm9maWxlIiwiaWQiXSwicGFyZW50VHlwZSI6IlVzZXIiLCJtZXRhIjpudWxsLCJmaWVsZE5hbWUiOiJpZCIsImR1cmF0aW9uIjoyNzAwMH0seyJzdGFydE9mZnNldCI6MTIxMjQwMDAsInJldHVyblR5cGUiOiJTdHJpbmciLCJwYXRoIjpbImVkaXRVc2VyUHJvZmlsZSIsIm5hbWUiXSwicGFyZW50VHlwZSI6IlVzZXIiLCJtZXRhIjpudWxsLCJmaWVsZE5hbWUiOiJuYW1lIiwiZHVyYXRpb24iOjkwMDB9LHsic3RhcnRPZmZzZXQiOjEyMTM4MDAwLCJyZXR1cm5UeXBlIjoiU3RyaW5nIiwicGF0aCI6WyJlZGl0VXNlclByb2ZpbGUiLCJwaG9uZSJdLCJwYXJlbnRUeXBlIjoiVXNlciIsIm1ldGEiOm51bGwsImZpZWxkTmFtZSI6InBob25lIiwiZHVyYXRpb24iOjUwMDB9XX0sImVuZFRpbWUiOiIyMDE4LTA3LTA5VDE2OjIzOjE3Ljc2MzU4MVoiLCJkdXJhdGlvbiI6MTIxODgwMDB9LCJjYWNoZUNvbnRyb2wiOnsidmVyc2lvbiI6MSwiaGludHMiOltdfX0sImRhdGEiOnsiZWRpdFVzZXJQcm9maWxlIjp7InBob25lIjoiMjIyMjIyMjIiLCJuYW1lIjoiVGVzdCIsImlkIjoiMjE1IiwiX190eXBlbmFtZSI6IlVzZXIifX19", "base64"));
  res.end();

  return __filename;
};
