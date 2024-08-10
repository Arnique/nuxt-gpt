#!/bin/bash
pm2 stop nuxtgpt

cd nuxt
git pull origin

yarn install
yarn build

pm2 start

