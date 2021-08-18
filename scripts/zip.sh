#!/bin/sh

VER=`grep -o '"version": "\([0-9.]\+\)"' ./extensions/manifest.json | grep -o '[0-9.]\+'`
mkdir -p ./publish
zip -r "./publish/qrcodeWithIp-${VER}.zip" ./extensions
