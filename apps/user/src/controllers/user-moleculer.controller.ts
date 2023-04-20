import {Service, Context, ServiceBroker} from 'moleculer';

import {Action} from 'moleculer-decorators';

import UserService from "../services/user.service";
import {USER_SERVICE_NAME} from "../constants";
import {Redis} from "ioredis";

export default class UserMoleculerController extends Service {

  protected userService: UserService;

  constructor(public broker: ServiceBroker) {
    super(broker);
    this.userService = new UserService();
    this.parseServiceSchema({
      name: USER_SERVICE_NAME,
      actions: this.actions
    })
  }


}
