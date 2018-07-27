#!/bin/bash

export MIX_ENV=e2e

git submodule update --init
cp __e2e__/server/config/* backend/config
pushd backend
mix deps.get && mix ecto.create
popd
