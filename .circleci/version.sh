#!/bin/bash

version=$(node -e 'console.log(require("./package.json").version)')

if [[ $1 ]]; then version="$version-$1"; fi

echo $version
