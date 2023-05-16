import {Global, Injectable, OnApplicationBootstrap, OnModuleInit} from "@nestjs/common";
import { ServiceBroker } from "moleculer";
import {brokerConfig} from "@mmh/gateway";

@Global()
export class MoleculerProvider  {

  private broker: ServiceBroker;

  constructor() {
    this.broker = new ServiceBroker(brokerConfig);
    try {
      this.broker.start();
    } catch (error) {
      console.log(error);
    }
  }

  getBroker(): ServiceBroker {
    if (!this.broker) {
      throw new Error('Broker is not initialized');
    }
    return this.broker;
  }
}
