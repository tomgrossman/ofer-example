import { HmacSHA256, lib as cryptoLib } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import * as protoLoader from '@grpc/proto-loader';
import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { base64url, parseToUtf8 } from './identifiers.utils';
import { join } from 'path';

const JWT_SECRET = '123456789012345678901234567890-ACTIVE';
const CLIENT_ID = 'active-customer';

@Injectable()
export class IdentifiersService {
  async imsiToMsisdn(imsi: string): Promise<any> {
    const { signedToken, clientId, messageId } = this.getJwtToken();
    // Load the generated protobuf file
    const packageDefinition = protoLoader.loadSync(join(process.cwd(), '/assets/CloudGatewayApi.proto'));
    const grpcObject = loadPackageDefinition(packageDefinition) as any; // Use 'any' type for now

    // Initialize the client
    const client = new grpcObject.cloud.gateway.CloudGateway('3.109.246.39:443', credentials.createInsecure(), {
      'grpc.keepalive_time_ms': 30000,
      'grpc.keepalive_timeout_ms': 30000,
      'grpc.keepalive_permit_without_calls': 1,
    });

    // Create the request payload
    const request = {
      metadata: {
        auth: {
          clientId: clientId,
          token: signedToken,
        },
        messageId: messageId,
      },
      keysRequest: {
        imsi: imsi,
        numberOfVectors: 1,
        technology: 'UMTS',
        switchDomain: 'PS',
      },
    };

    // Make the gRPC call
    const result = await new Promise((resolve) => {
      client.getData(request, (error: any, response: any) => {
        if (error) {
          resolve(error);
        }

        resolve(response);
      });
    });

    return result;
  }

  private getJwtToken(): {
    signedToken: string;
    messageId: string;
    clientId: string;
  } {
    const header = {
      typ: 'JWT',
      alg: 'HS256',
    };

    // Prepare timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const messageId = uuidv4();
    const data = {
      sub: 'fog-token',
      iss: CLIENT_ID,
      iat: currentTimestamp,
      jti: messageId,
    };

    // encode header
    const stringifiedHeader = parseToUtf8(header);
    const encodedHeader = base64url(stringifiedHeader);
    // encode data
    const stringifiedData = parseToUtf8(data);
    const encodedData = base64url(stringifiedData);
    // build token
    const token = `${encodedHeader}.${encodedData}`;
    // sign token

    const signature: cryptoLib.WordArray = HmacSHA256(token, JWT_SECRET);

    const signedToken = `${token}.${base64url(signature)}`;

    return {
      signedToken,
      messageId,
      clientId: CLIENT_ID,
    };
  }
}
