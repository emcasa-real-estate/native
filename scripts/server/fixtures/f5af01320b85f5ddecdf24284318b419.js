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
 * content-length: 57
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 201;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Mon, 09 Jul 2018 22:54:42 GMT");
  res.setHeader("content-length", "507");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "gcgqiabkqn824tq3fe1n08dq8ukp8rrv");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJ1c2VyIjp7InRva2VuIjoiZXlKaGJHY2lPaUpGVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhkV1FpT2lKU1pTSXNJbVY0Y0NJNk1UVXpNemMyT0RnNE1pd2lhV0YwSWpveE5UTXhNVGMyT0RneUxDSnBjM01pT2lKU1pTSXNJbXAwYVNJNklqRTJabUkzWWpKaExXTXdPVFV0TkRRNFlTMWhaVFE1TFdKbFlUazRaRGd3WlRKaE9TSXNJbTVpWmlJNk1UVXpNVEUzTmpnNE1Td2ljM1ZpSWpvaU1qRTFJaXdpZEhsd0lqb2lZV05qWlhOekluMC5BV2c3N2o0QV9vd3BTSkYtaGtjdHp0MUxxTjJ3aUZNTzBGLWtMVm5ic3Y5VlBGTkRxanhNSkRCeXpIYnNzUjh1WDJNY2dQNnV2Q1FKQUJTRlRFSFBRT0ROQUk2VnUxYVQ4Y3FSLU80UlZZdjVCQ2ZCWWVQZ19kb1gtOXZQVEhzajdYT1RTZjRobllRd01BdVA4NGw4YjExM0VwR0QzOUx1RjdoNWlDZFhTaVR0OGsxdSIsInJvbGUiOiJ1c2VyIiwicGhvbmUiOm51bGwsIm5hbWUiOiJUZXN0IiwiaWQiOjIxNSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn19", "base64"));
  res.end();

  return __filename;
};
