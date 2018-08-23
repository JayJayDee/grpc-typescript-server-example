
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

import { MemberService } from './protos/member_pb_service';
import { ReqMemberGet } from './protos/member_pb';

const packageDef: protoLoader.PackageDefinition = protoLoader.loadSync(__dirname + '/../protos/member.proto');
const protoDescriptor: grpc.GrpcObject = grpc.loadPackageDefinition(packageDef);


const memberService: grpc.ServiceDefinition<MemberService> = 
  protoDescriptor.handstudio.member.MemberService.service;

const server = new grpc.Server();
server.addService(memberService, {
  GetMember: function(call: grpc.Call) {
    
  },

  CreateMember: function(call: grpc.Call) {

  }
});

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();