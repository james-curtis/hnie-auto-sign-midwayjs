import { Inject, Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../types/interface';
import { HttpService } from '../util/http.service';
import CryptoJS from 'crypto-js/core';
import 'crypto-js/md5';
import dayjs from 'dayjs';
import { PatchSignParam } from '../types/api';
import formurlencoded from 'form-urlencoded';

@Provide()
export class UserService {
  private account: string | undefined = undefined;
  private password: string | undefined = undefined;

  private loginApi = 'http://xggl.hnie.edu.cn/website/login';
  private signLogApi =
    'http://xggl.hnie.edu.cn/content/tabledata/student/temp/zzdk';
  private signPageApi =
    'http://xggl.hnie.edu.cn/wap/menu/student/temp/zzdk/_child_/edit';
  private patchSignApi = 'http://xggl.hnie.edu.cn/content/student/temp/zzdk';

  @Inject()
  httpService: HttpService;

  getUser() {
    return {
      account: this.account,
      password: this.password,
    };
  }

  setUser(options: IUserOptions) {
    this.account = options.account;
    this.password = options.password;
  }

  /**
   * 预请求，先访问一次登录页面
   * @private
   */
  private preRequest() {
    return this.httpService.getInstance().get('http://xggl.hnie.edu.cn/index');
  }

  async doLogin() {
    await this.preRequest();
    const param = new URLSearchParams();
    param.append('uname', this.account);
    param.append('pd_mm', UserService.cryptoPassword(this.password));
    type res = {
      error: string;
      url: null;
      goto2: string;
      msg?: string;
    };
    const result = await this.httpService
      .getInstance()
      .post<res>(this.loginApi, param, {
        headers: {
          Origin: 'http://ssgl.hnie.edu.cn',
          Referer: 'http://ssgl.hnie.edu.cn/index',
        },
      });
    if (!result.data.error && result.data.goto2) {
      return true;
    }
    return result;
  }

  async doSign(param: Omit<PatchSignParam, 'zzdk_token'>) {
    // if (await this.isSign()) return true;
    const html = await this.httpService.getInstance().get(this.signPageApi, {
      params: {
        _t_s_: Date.now(),
      },
      headers: {
        Referer: `http://xggl.hnie.edu.cn/wap/menu/student/temp/zzdk?_t_s_=${
          Date.now() - 3
        }`,
      },
    });
    const regex = /zzdk_token['"]\s*?value=["']([\w\d]+)["']/i;
    if (!regex.test(html.data)) return false;
    const token = regex.exec(html.data)[1];
    type res = {
      errorInfoList: { code: any; message: string }[];
      result: boolean;
      msg?: any;
    };
    const result = await this.httpService
      .getInstance()
      .post<res>(
        this.patchSignApi,
        formurlencoded({ ...param, zzdk_token: token } as PatchSignParam),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        }
      );
    return {
      result: result.data.result,
      message: result.data.errorInfoList?.[0].message,
    };
  }

  /**
   * 获取签到日志
   */
  getSignLog() {
    type RootObject = {
      sEcho: number;
      iDisplayStart: number;
      iDisplayLength: number;
      iSortColList: number[];
      sSortDirList: string[];
      iTotalRecords: number;
      iTotalDisplayRecords: number;
      aaData: RootObjectAaData[];
    };
    type RootObjectAaData = {
      REDFLAG: string;
      TW: string;
      DKRQ: string;
      DQZT: string;
      DKCS: number;
      DM: string;
      UPDATE_TIME: string;
      DKD: string;
      DONE_IND: string;
    };

    const result = this.httpService
      .getInstance()
      .get<RootObject>(this.signLogApi, {
        params: {
          bSortable_0: false,
          bSortable_1: true,
          iSortingCols: 1,
          iDisplayStart: 0,
          iDisplayLength: 12,
          iSortCol_0: 1,
          sSortDir_0: 'desc',
          _t_s_: Date.now(),
        },
      });
    return result;
  }

  /**
   * 今天是否已经签到过了
   */
  async isSign() {
    const result = await this.getSignLog();
    const today = result.data.aaData[0]?.DKRQ;
    return dayjs(today).isSame(dayjs(), 'day');
  }

  private static cryptoPassword(pwd_: string) {
    let pwd = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(pwd_)).toString();
    if (pwd.length > 5) {
      pwd = pwd.substring(0, 5) + 'a' + pwd.substring(5, pwd.length);
    }
    if (pwd.length > 10) {
      pwd = pwd.substring(0, 10) + 'b' + pwd.substring(10, pwd.length);
    }
    pwd = pwd.substring(0, pwd.length - 2);
    return pwd;
  }
}
