
import { BrokerOptions } from 'moleculer';
import * as os from 'os';
import { redisUrl } from '@mmh/common'
import { GATEWAY_SERVICE_NAME } from '../constants';

const brokerConfig: BrokerOptions = {
  nodeID: `${GATEWAY_SERVICE_NAME}-${os.hostname()}`,
  transporter: redisUrl,
  metrics: true,
  validator: true,
};

export { brokerConfig };

