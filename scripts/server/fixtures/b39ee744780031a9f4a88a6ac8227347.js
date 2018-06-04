var path = require("path");

/**
 * POST /users/register
 *
 * host: localhost:4000
 * accept: application/json
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGM1YzRiNGMzMzc4MTkyMjNjNWVjMDUzYmZkOWNmNzQ2.D4AHcTru5gcbGssM1bjHPy91DafV322xXnSw2ONPVhw
 * accept-language: en-us
 * authorization: undefined
 * content-length: 70
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 201;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Fri, 01 Jun 2018 23:40:23 GMT");
  res.setHeader("content-length", "504");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGM1YzRiNGMzMzc4MTkyMjNjNWVjMDUzYmZkOWNmNzQ2.D4AHcTru5gcbGssM1bjHPy91DafV322xXnSw2ONPVhw; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "11gqvrdva33ni3eg0knt9jf8d3gr36cn");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJ1c2VyIjp7InRva2VuIjoiZXlKaGJHY2lPaUpGVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhkV1FpT2lKU1pTSXNJbVY0Y0NJNk1UVXpNRFE0T0RReU15d2lhV0YwSWpveE5USTNPRGsyTkRJekxDSnBjM01pT2lKU1pTSXNJbXAwYVNJNklqQmtaR1JsTWpnekxUSTVPV0V0TkdGaE9DMWlaV1U0TFdFMFlXVTRPRGs0WmpJek1DSXNJbTVpWmlJNk1UVXlOemc1TmpReU1pd2ljM1ZpSWpvaU5USWlMQ0owZVhBaU9pSmhZMk5sYzNNaWZRLkFWLV9JbEkxRnk5S3MzZjdNME5Kb2J5b3hwblZRa1ROM0huT0dkandxR0JOc1dUeDJZWTRGWUt4Ny05aTZESG9uM0ZhSmhWaEcwNTR3bThuOVc0a1RNTVNBWm5hYmtVeFZfR3lKVHl4cmVmSlcwYnV0Wkt0bDgtZ3BxY1hGRGZCTm9ra3J1cWtSWF9JNnB0UlNGYVAzZTNfM29IckRoQUYzcnRRb3lhaDczNkpXN29LIiwicm9sZSI6InVzZXIiLCJwaG9uZSI6bnVsbCwibmFtZSI6IlRlc3QiLCJpZCI6NTIsImVtYWlsIjoidGVzdEBlbWNhc2EuY29tIn19", "base64"));
  res.end();

  return __filename;
};
