import { Provide, Inject, TaskLocal, Config } from '@midwayjs/decorator';
import { PatchSignParam } from '../types/api';
import { UserService } from './user.service';
import { IUserOptions, SignConfig } from '../types/interface';
import { ILogger } from '@midwayjs/logger';

@Provide()
export class ScheduleService {
  @Inject()
  lodash;

  @Inject()
  userService: UserService;

  @Config('signConfig')
  private signConfig: SignConfig;

  private accountData: IUserOptions;

  private signData: Omit<PatchSignParam, 'zzdk_token'>;

  private signDataDefault: Omit<PatchSignParam, 'zzdk_token'> = {
    dkdz: '湖南省郴州市北湖区五岭大道9号',
    dkdzZb: '113.014999,25.7706',
    dkly: 'baidu',
    dkd: '湖南省郴州市',
    jzdValue: '430000,431000,431081',
    'jzdSheng.dm': '430000',
    'jzdShi.dm': '431000',
    'jzdXian.dm': '431081',
    jzdDz: '湖南省郴州市北湖区五岭大道9号',
    jzdDz2: '湖南省郴州市北湖区五岭大道9号',
    lxdh: '15911111111',
    sfzx: '1',
    sfzx1: '在校',
    'twM.dm': '01',
    tw1: '',
    'tw1M.dm': '01',
    tw11: '[35.0~37.2]正常',
    'tw2M.dm': '01',
    tw12: '[35.0~37.2]正常',
    'tw3M.dm': '01',
    tw13: '',
    'yczk.dm': '01',
    yczk1: '无症状',
    fbrq: '',
    jzInd: '0',
    jzYy: '',
    zdjg: '',
    fxrq: '',
    'brStzk.dm': '01',
    brStzk1: '身体健康、无异常',
    'brJccry.dm': '01',
    brJccry1: '未接触传染源',
    'jrStzk.dm': '01',
    jrStzk1: '身体健康、无异常',
    'jrJccry.dm': '01',
    jrJccry1: '未接触传染源',
    jkm: '1',
    jkm1: '绿色',
    xcm: '1',
    xcm1: '绿色',
    xgym: '2',
    xgym1: '',
    hsjc: '0',
    hsjc1: '',
    bz: '',
    operationType: 'Create',
    dm: '',
  };

  @Inject()
  logger: ILogger;

  private loadUser() {
    const config = this.signConfig.shift();
    if (!config) return false;
    this.accountData = config.account;
    this.signData = this.lodash.cloneDeep(this.signDataDefault);
    Object.assign(this.signData, config.signFormData);
    return true;
  }

  @TaskLocal('0 6 * * *')
  async test() {
    while (this.loadUser()) {
      this.userService.setUser(this.accountData);
      const loginStatus = await this.userService.doLogin();
      const currentUserSummary = this.accountData.account.substring(
        this.accountData.account.length - 4
      );
      if (loginStatus !== true) {
        console.warn(
          `[${currentUserSummary}]登录失败: ${loginStatus.data?.msg}`
        );
        continue;
      }
      const result = await this.userService.doSign(this.signData);
      console.warn(
        `[${currentUserSummary}]签到结果: ${
          !result ? '失败' : result.result ? '成功' : '失败'
        } 返回消息: ${!result || result.message}`
      );
    }
  }
}
