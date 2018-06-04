var path = require("path");

/**
 * POST /users/login
 *
 * host: localhost:4000
 * accept: application/json
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM
 * accept-language: en-us
 * authorization: undefined
 * content-length: 56
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 201;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Sat, 02 Jun 2018 17:32:55 GMT");
  res.setHeader("content-length", "504");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "cdr7mq34ur9n5q4rhon9iei7cfdudk9q");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJ1c2VyIjp7InRva2VuIjoiZXlKaGJHY2lPaUpGVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhkV1FpT2lKU1pTSXNJbVY0Y0NJNk1UVXpNRFUxTWpjM05Td2lhV0YwSWpveE5USTNPVFl3TnpjMUxDSnBjM01pT2lKU1pTSXNJbXAwYVNJNkltRXdNV1UyT0RJd0xUVXlaamN0TkRRd01pMWhPR1JsTFRKaU9ESTRNR1F4WkRBM1pTSXNJbTVpWmlJNk1UVXlOemsyTURjM05Dd2ljM1ZpSWpvaU5USWlMQ0owZVhBaU9pSmhZMk5sYzNNaWZRLkFBaWhWQ19Oc2phYUhiQ3loUFpkZkRiWWk2eEFUaW9LMUMzeWZmU3Z1eG12cmZ6a1VSbmFzNmJmY01GN1owdUk0SkVubDF6REtPNUE3RVQyRzN4UUlSZndBV2gtT1JuT1Y1TmdvSWUxWTBNakNNcm1rd3FVd0RsOWdyeUNFbXdtWGd4bGx0Ymw4dEkwMF9UVHRuREl5dm5qX1VBS1Fmb05vR241SG9RZFljdFJWR2lVIiwicm9sZSI6InVzZXIiLCJwaG9uZSI6bnVsbCwibmFtZSI6IlRlc3QiLCJpZCI6NTIsImVtYWlsIjoidGVzdEBlbWNhc2EuY29tIn19", "base64"));
  res.end();

  return __filename;
};
