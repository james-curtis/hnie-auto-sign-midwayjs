import { MidwayConfig } from '@midwayjs/core';
import { SignConfig } from '../types/interface';
import JSON5 from 'json5';

export default (): MidwayConfig => {
  function getSignConfig(): SignConfig {
    try {
      return JSON5.parse(process.env.SIGN_CONFIG);
    } catch (e) {
      throw new Error('JSON5解析错误: ' + e.toString());
    }
  }
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: '1661563342940_8833',
    koa: {
      port: 7001,
    },
    signConfig: getSignConfig(),
    midwayLogger: {
      default: {
        enableConsole: true,
        enableFile: false,
      },
      client: {
        enableConsole: true,
        enableFile: false,
      },
    },
  };
};
