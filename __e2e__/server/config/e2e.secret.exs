use Mix.Config

# To generate api_key for Sendgrid, open a free SendGrid account
# at sendgrid.com and generate a personal api key.
# https://app.sendgrid.com/settings/api_keys
#
# To generate keys for Guardian, open an iex session in the terminal with:
# iex -S mix phx.server
# then run
# JOSE.JWS.generate_key(%{"alg" => "ES512"}) |> JOSE.JWK.to_map |> elem(1)
#  and copy the hashes for "d", "x", and "y".

config :re, ReWeb.Guardian,
  allowed_algos: ["ES512"],
  secret_key: %{
    "alg" => "ES512",
    "crv" => "P-521",
    "d" =>
      "ATlz9srPHFSZXNWwBUqDABtZZjE_O-525LQYIkOo7CrYuFwSbSWC9__FHalLnMh9MNeKLHSzxNlbbIfkuODoy9iJ",
    "kty" => "EC",
    "use" => "sig",
    "x" =>
      "AXHTxxVxT8SNGzxZ9COQg1SUb0AWBFQDyfvddQI55zK9wZyUE4eJT-5wqsJX7B5KzneZjpg0uO6WhWI2kcVCe7fZ",
    "y" =>
      "AFrgfuEbVVURH7jJMMz4mpA0z47SELuyCkzGDymtZNsE2Ld9ctViBLfQUGMkpgz-16g8aEoWHSmE-PbpcDmvT_KA"
  }

# The emails below are used when a visitor
# fills out a form expressing interest in a listing.
# Both `to:` and `from:` can be individual emails
# or multiple emails, in which case use `|` as separator.
config :re,
  to: "dev1@email.com|dev2@email.com",
  from: "admin@email.com"
