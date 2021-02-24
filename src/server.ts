import express from 'express';
import * as http from 'http';
import { AddressInfo } from 'net';
import { Router } from './router';

export class Server {
  private express: express.Application;
  private http: http.Server | any;

  constructor(private port: number) {
    this.express = express();
    this.express.use(Router());
  }

  public start = async (): Promise<void> => {
    return new Promise<void>((resolve) => {
      this.http = this.express.listen(this.port, () => {
        const { port } = this.http.address() as AddressInfo;
        console.log(`🚀 Server running on PORT ${port}`);
        resolve();
      });
    });
  };

  public stop = async (): Promise<void> => {
    console.log('Stopping http server...');
    this.http.close();
  };

  public invoke = (): express.Application => {
    return this.express;
  };
}
