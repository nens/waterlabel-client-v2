#!/bin/sh
set +x

DIRECTORY=`pwd`

mkdir -p /tmp/dist
cp -r $DIRECTORY/build/* /tmp/dist/
cd /tmp/dist
mkdir -p $DIRECTORY/dist
zip -r $DIRECTORY/dist/waterlabel.zip .
cd /
rm -r /tmp/dist
ls -l $DIRECTORY/dist/waterlabel.zip