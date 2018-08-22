node_modules/.bin/grpc_tools_node_protoc --ts_out=service=true:./src --grpc_out=./src --plugin=protoc-gen-grpc-ts=`which grpc_tools_node_protoc_plugin` ./protos/*
