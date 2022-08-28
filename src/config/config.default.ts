import { MidwayConfig, MidwayError } from '@midwayjs/core';
import { SignConfig } from '../types/interface';
import JSON5 from 'json5';
import CryptoJS from 'crypto-js/core';
import 'crypto-js/enc-base64';

export default (): MidwayConfig => {
  function getSignConfig(): SignConfig {
    try {
      if (process.env.SIGN_CONFIG_BASE64) {
        return JSON5.parse(
          CryptoJS.enc.Base64.parse(process.env.SIGN_CONFIG_BASE64).toString(
            CryptoJS.enc.Utf8
          )
        );
      }
    } catch (e) {
      throw new MidwayError('SIGN_CONFIG_BASE64配置解析错误: ' + e.toString());
    }
    try {
      return JSON5.parse(process.env.SIGN_CONFIG);
    } catch (e) {
      throw new MidwayError('SIGN_CONFIG配置解析错误: ' + e.toString());
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
