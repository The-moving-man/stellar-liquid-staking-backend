import {
  WebSocketGateway, WebSocketServer, SubscribeMessage,
  ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/ws' })
export class StakingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(StakingGateway.name);

  handleConnection(client: Socket) { this.logger.debug(`Connected: ${client.id}`); }
  handleDisconnect(client: Socket) { this.logger.debug(`Disconnected: ${client.id}`); }

  @SubscribeMessage('subscribe:stats')
  handleSubscribeStats(@ConnectedSocket() client: Socket) {
    client.join('stats');
    return { event: 'subscribed', data: 'stats' };
  }

  @SubscribeMessage('subscribe:wallet')
  handleSubscribeWallet(@ConnectedSocket() client: Socket, walletAddress: string) {
    client.join(`wallet:${walletAddress}`);
    return { event: 'subscribed', data: `wallet:${walletAddress}` };
  }

  emitStatsUpdate(stats: any) { this.server.to('stats').emit('stats', stats); }
  emitStakeEvent(walletAddress: string, data: any) {
    this.server.to(`wallet:${walletAddress}`).emit('stake', data);
  }
  emitWithdrawalReady(walletAddress: string, requestId: number) {
    this.server.to(`wallet:${walletAddress}`).emit('withdrawal:ready', { requestId });
  }
}
