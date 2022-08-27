/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  account: string;
  password: string;
}

export type SignConfig = {
  account: {
    account: string;
    password: string;
  };
  /**
   * 签到表单信息
   */
  signFormData: {
    /**
     * 打开所在详细地址，汉字表述
     * @example 湖南省郴州市北湖区五岭大道9号
     * @link PatchSignParam.dkdz
     */
    address: string;
    /**
     * 经纬度坐标
     * 百度火星坐标
     * @example 113.014999,25.7706
     * @link PatchSignParam.dkdzZb
     */
    position: string;
    /**
     * 打开所在县
     * @example 湖南省郴州市
     * @link PatchSignParam.dkd
     */
    signAddress: string;

    /**
     * 现居住地 省份邮政编码
     * @example 430000
     * @link PatchSignParam['jzdSheng.dm']
     */
    provinceZipCode: string;
    /**
     * 现居住地 市邮政编码
     * @example 431000
     * @link PatchSignParam['jzdShi.dm']
     */
    cityZipCode: string;
    /**
     * 现居住地 县份邮政编码
     * @example 431081
     * @link PatchSignParam['jzdXian.dm']
     */
    countyZipCode: string;
    /**
     * 现居住地 详细地址
     * @example 湖南省郴州资兴市鲤鱼江鸿都商业步行街
     * @link PatchSignParam.jzdDz
     */
    habitationDetailDesc: string;
    /**
     * 常住地 详细地址
     * @example 湖南省郴州资兴市鲤鱼江鸿都商业步行街
     * @link PatchSignParam.jzdDz2
     */
    usualResidenceDetailDesc: string;

    /**
     * 联系电话
     * @example 15971115555
     * @link PatchSignParam.lxdh
     */
    phone: string;
  };
}[];
