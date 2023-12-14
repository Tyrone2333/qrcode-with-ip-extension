#!/bin/sh

yarn build
yarn next export -o extensions/dist
sed -e 's/\/_next/.\/_next/g' ./extensions/dist/index.html > ./extensions/dist/index.tmp
mv ./extensions/dist/index.tmp ./extensions/dist/index.html
