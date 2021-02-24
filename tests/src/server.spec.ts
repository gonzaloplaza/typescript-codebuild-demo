import { Server } from '../../src/server';

describe('Server', () => {
  it('should initiate and stop a server instance', async () => {
    const server = new Server(5000);
    jest.spyOn(server, 'start');
    jest.spyOn(server, 'stop');

    await server.start().then(() => {
      server.stop();
    });

    expect(server.start).toHaveBeenCalledTimes(1);
    expect(server.stop).toHaveBeenCalledTimes(1);
  });
});
