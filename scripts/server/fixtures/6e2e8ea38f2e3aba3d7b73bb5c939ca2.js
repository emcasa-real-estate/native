var path = require("path");

/**
 * POST /users/register
 *
 * host: localhost:4000
 * accept: application/json
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM
 * accept-language: en-us
 * authorization: undefined
 * content-length: 71
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 201;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Fri, 08 Jun 2018 18:33:49 GMT");
  res.setHeader("content-length", "507");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "qi16kjorneq27sc2hrn3ncet8hs3hhf6");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJ1c2VyIjp7InRva2VuIjoiZXlKaGJHY2lPaUpGVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhkV1FpT2lKU1pTSXNJbVY0Y0NJNk1UVXpNVEEzTkRneU9Td2lhV0YwSWpveE5USTRORGd5T0RJNUxDSnBjM01pT2lKU1pTSXNJbXAwYVNJNkltWm1OR1UxWTJJM0xUaGhaRFV0TkRjMlpDMWlOamRqTFRSaU9UZGxZamRsWmpkallTSXNJbTVpWmlJNk1UVXlPRFE0TWpneU9Dd2ljM1ZpSWpvaU1qRTFJaXdpZEhsd0lqb2lZV05qWlhOekluMC5BU2ZYd09uTzg2dFphRFZDUmZvUjhOY2dRSXVRS0JJMzdfWndYN191aEhuX1BSSEhXbHRzRk1kYUQ2emI3cXVPbHJCVi1yYndrRkNIQkZGbDhiejVSelNCQWRYNHB3ZUZJQU9kV2dvUy1waXBYMGJxUnBDRkYxWjZ6aW0tdXBUZzRqdTNPN3pLZVpONjUzd3FGVUtvaW8tdlQyTXI4bDlkSHh2Rkx6NVF6czF3eW9WciIsInJvbGUiOiJ1c2VyIiwicGhvbmUiOm51bGwsIm5hbWUiOiJUZXN0IiwiaWQiOjIxNSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn19", "base64"));
  res.end();

  return __filename;
};
