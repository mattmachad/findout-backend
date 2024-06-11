#!/bin/bash

echo "Install dependencies"

npm install
npm install --save-dev vite-plugin-vuetify

chown -Rf docker:docker ./

exec "$@";