import { ServiceBroker } from 'moleculer';

export default class BaseServiceClient {
  protected readonly broker: ServiceBroker;
  protected readonly serviceName: string;

  constructor(broker) {
    this.broker = broker;
  }

  public async waitForService(): Promise<void> {
    await this.broker.waitForServices([this.serviceName], 10000);
  }

  protected async call<P, T>(methodName: string, params?: P): Promise<T> {
    return this.broker.call(`${this.serviceName}.${methodName}`, params);
  }
}
