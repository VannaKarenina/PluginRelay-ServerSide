import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ServiceBroker } from "moleculer";
import {brokerConfig} from "../configs/moleculer.config";

@Injectable()
export class MoleculerProvider {
  private broker: ServiceBroker;

  constructor() {
    this.init();
  }

  async init() {
    this.broker = new ServiceBroker(brokerConfig);

    await this.broker.start();
  }

  getBroker(): ServiceBroker {
    return this.broker;
  }
}
