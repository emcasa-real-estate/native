var path = require("path");

/**
 * GET /listings/3?
 *
 * host: localhost:4000
 * accept: application/json
 * content-type: application/json
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM
 * accept-language: en-us
 * authorization: undefined
 * accept-encoding: gzip, deflate
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Fri, 01 Jun 2018 23:48:47 GMT");
  res.setHeader("content-length", "1317");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "matdmnl5ptujfqhjloj5avcjpff500nq");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJsaXN0aW5nIjp7InVzZXJfaWQiOjMsInR5cGUiOiJBcGFydGFtZW50byIsInN1aXRlcyI6bnVsbCwicm9vbXMiOjIsInJlc3Ryb29tcyI6bnVsbCwicHJvcGVydHlfdGF4IjpudWxsLCJwcmljZSI6ODUwMDAwLCJtYXR0ZXJwb3J0X2NvZGUiOiJTRktQckpnYjZYUSIsIm1haW50ZW5hbmNlX2ZlZSI6bnVsbCwiaXNfcmVsZWFzZSI6bnVsbCwiaXNfZXhjbHVzaXZlIjpmYWxzZSwiaXNfYWN0aXZlIjp0cnVlLCJpbnNlcnRlZF9hdCI6IjIwMTctMTEtMDlUMTg6NTA6NTcuMDAyOTQ4IiwiaW1hZ2VzIjpbeyJwb3NpdGlvbiI6MCwiaWQiOjIwOSwiZmlsZW5hbWUiOiJqazhndHZkcXo4cnFpaHFxY2F1aC5qcGciLCJkZXNjcmlwdGlvbiI6bnVsbH0seyJwb3NpdGlvbiI6MSwiaWQiOjM4MiwiZmlsZW5hbWUiOiJkOGxycHBvbzE2Z3Z5d3Zvdnc2eS5qcGciLCJkZXNjcmlwdGlvbiI6bnVsbH0seyJwb3NpdGlvbiI6MiwiaWQiOjM4NCwiZmlsZW5hbWUiOiJhYXgybXZ2a2t3cWQxYWl6bnB4dy5qcGciLCJkZXNjcmlwdGlvbiI6bnVsbH0seyJwb3NpdGlvbiI6MywiaWQiOjM4NiwiZmlsZW5hbWUiOiJ4amhtdDZmb2Y2dXJucnB2anIwai5qcGciLCJkZXNjcmlwdGlvbiI6bnVsbH0seyJwb3NpdGlvbiI6NCwiaWQiOjM4MywiZmlsZW5hbWUiOiJnYzJhb3pjZm9hZmc1cDNyYXVldS5qcGciLCJkZXNjcmlwdGlvbiI6bnVsbH0seyJwb3NpdGlvbiI6NSwiaWQiOjM4NSwiZmlsZW5hbWUiOiJwd2pvamd6dzd5am14b3gzcGtsNS5qcGciLCJkZXNjcmlwdGlvbiI6bnVsbH0seyJwb3NpdGlvbiI6NiwiaWQiOjM4MSwiZmlsZW5hbWUiOiJjeWJoaDkwNzZjZ2gydGNmaG9lMi5qcGciLCJkZXNjcmlwdGlvbiI6bnVsbH1dLCJpZCI6MywiaGFzX2VsZXZhdG9yIjpudWxsLCJnYXJhZ2Vfc3BvdHMiOjEsImZsb29yIjoiOCIsImRlc2NyaXB0aW9uIjoiSW3Ds3ZlbCBsb2NhbGl6YWRvIHByw7N4aW1vIMOgcyBtZWxob3JlcyBlc2NvbGFzIGRhIHJlZ2nDo28gZSBhIDQgbWludXRvcyBkbyBtZXRyw7QuIFJlbm92YWRvIHBvciBhcnF1aXRldG8gZSBjb20gMSB2YWdhIGRlIGdhcmFnZW0gKFIkNTAgcG9yIG3DqnMpLiBWaXN0YSBsaXZyZSIsImRlcGVuZGVuY2llcyI6bnVsbCwiYmF0aHJvb21zIjoyLCJiYWxjb25pZXMiOm51bGwsImFyZWEiOjcxLCJhZGRyZXNzIjp7InN0cmVldCI6IlJ1YSBGZXJuYW5kbyBPc8OzcmlvIiwic3RhdGUiOiJSSiIsInBvc3RhbF9jb2RlIjoiMjIyMzAtMDQwIiwibmVpZ2hib3Job29kIjoiRmxhbWVuZ28iLCJsbmciOi00My4xNzYyODM5LCJsYXQiOi0yMi45MzYzNTA4LCJjaXR5IjoiUmlvIGRlIEphbmVpcm8ifX19", "base64"));
  res.end();

  return __filename;
};
