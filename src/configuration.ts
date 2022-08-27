import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import path, { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as task from '@midwayjs/task';
import { ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import { QueueService } from '@midwayjs/task';
// import { QueueService } from '@midwayjs/task';
import * as dotenv from 'dotenv';
import * as lodash from 'lodash';

// load .env file in process.cwd
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    task,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: koa.Application;

  async onReady(applicationContext: IMidwayContainer) {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);

    applicationContext.registerObject('lodash', lodash);
  }

  async onServerReady(container: IMidwayContainer) {
    // LocalTask的启动后立马执行
    const result = await container.getAsync(QueueService);
    const job = result.getLocalTask('ScheduleService', 'execute'); // 参数1:类名 参数2: 装饰器TaskLocal的函数名
    job(); // 表示立即执行
  }
}
