#!/bin/bash
if ! [ -n "$PROTOC_PATH" ] 
then
>&2 echo "PROTOC_PATH env variable not found." 
exit 1
fi

echo "generating directories.."
mkdir -p bin/protos
mkdir -p src/protos 
echo "compiling proto files.."
PROTOC_GEN_TS="./node_modules/.bin/protoc-gen-ts"
TS_OUT_DIR_BASE="./src"
JS_OUT_DIR_BASE="./bin"
${PROTOC_PATH} --plugin="protoc-gen-ts=${PROTOC_GEN_TS}" --js_out="import_style=commonjs,binary:${JS_OUT_DIR_BASE}" --ts_out="service=true:${TS_OUT_DIR_BASE}" ./protos/*
mv src/protos/*.js bin/protos
echo "done"