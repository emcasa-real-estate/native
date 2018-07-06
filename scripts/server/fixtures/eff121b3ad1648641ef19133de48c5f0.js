var path = require("path");

/**
 * GET /listings/406?
 *
 * host: localhost:4000
 * accept: application/json
 * content-type: application/json
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM
 * accept-language: en-us
 * authorization: Token eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJSZSIsImV4cCI6MTUzMTA3NDg3MCwiaWF0IjoxNTI4NDgyODcwLCJpc3MiOiJSZSIsImp0aSI6Ijg1Mzk1NzMyLWZlMTEtNDM4ZC05N2Y2LTZjZDYwMjFmOGExZSIsIm5iZiI6MTUyODQ4Mjg2OSwic3ViIjoiMjE1IiwidHlwIjoiYWNjZXNzIn0.APCiTZfdITzppIatvX6WxMsf9Edgxx0QpVPlR8jx60-U5xH9kVThQJE6gREZWhyYpwTMb7tG5m7WQCG0mEM1WIJVABPH0CtzLh1juGDxEr-tXugOp0OC0qZ_Dx7PDYxkyKcnAl_AcG0B3CexRhBpbkSG2Rgb2rsWkqpKFHA9vlVk25T8
 * accept-encoding: gzip, deflate
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Wed, 04 Jul 2018 19:45:24 GMT");
  res.setHeader("content-length", "838");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGNmYTM0NGYwYTMxMzkwYTBmNDNkYWE2NjkyNWM3NWRm.xL6JRs7yM2j-pmPdCPx8blEVs2cLAUJq_ApcrpweysM; path=/; HttpOnly"]);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "sbn4nmb24fhfk2obd9glri0m47a44ncd");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJsaXN0aW5nIjp7InZpc3VhbGlzYXRpb25zIjowLCJ1c2VyX2lkIjoyMTUsInR5cGUiOiJBcGFydGFtZW50byIsInRvdXJfdmlzdWFsaXNhdGlvbnMiOjAsInN1aXRlcyI6bnVsbCwicm9vbXMiOm51bGwsInJlc3Ryb29tcyI6bnVsbCwicHJvcGVydHlfdGF4IjpudWxsLCJwcmljZSI6MCwibWF0dGVycG9ydF9jb2RlIjpudWxsLCJtYWludGVuYW5jZV9mZWUiOm51bGwsImlzX3JlbGVhc2UiOm51bGwsImlzX2V4Y2x1c2l2ZSI6ZmFsc2UsImlzX2FjdGl2ZSI6ZmFsc2UsImludGVyZXN0X2NvdW50IjowLCJpbnNlcnRlZF9hdCI6IjIwMTgtMDctMDRUMTk6NDU6MjUuNDE3MTY3IiwiaW5fcGVyc29uX3Zpc2l0X2NvdW50IjowLCJpbWFnZXMiOltdLCJpZCI6NDA2LCJoYXNfZWxldmF0b3IiOm51bGwsImdhcmFnZV9zcG90cyI6bnVsbCwiZmxvb3IiOm51bGwsImZhdm9yaXRlX2NvdW50IjowLCJkZXNjcmlwdGlvbiI6bnVsbCwiZGVwZW5kZW5jaWVzIjpudWxsLCJjb21wbGVtZW50IjoiMTIzIiwiYmF0aHJvb21zIjpudWxsLCJiYWxjb25pZXMiOm51bGwsImFyZWEiOjEwMDAsImFkZHJlc3MiOnsic3RyZWV0X3NsdWciOiJydWEtdmVyZ3VlaXJvIiwic3RyZWV0X251bWJlciI6IjEyMyIsInN0cmVldCI6IlJ1YSBWZXJndWVpcm8iLCJzdGF0ZV9zbHVnIjoic3AiLCJzdGF0ZSI6IlNQIiwicG9zdGFsX2NvZGUiOiIwMTUwNC0wMDEiLCJuZWlnaGJvcmhvb2Rfc2x1ZyI6ImxpYmVyZGFkZSIsIm5laWdoYm9yaG9vZCI6IkxpYmVyZGFkZSIsImxuZyI6LTQ2LjYzODY3MDcsImxhdCI6LTIzLjU2MzA2NTcsImNpdHlfc2x1ZyI6InNhby1wYXVsbyIsImNpdHkiOiJTw6NvIFBhdWxvIn19fQ==", "base64"));
  res.end();

  return __filename;
};
