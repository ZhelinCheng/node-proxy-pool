/**
 * Created by ChengZheLin on 2019/6/10.
 * Features: index
 */

import { Context } from 'koa'
import Router from 'koa-router'
const router = new Router()

router.get('/', async (ctx: Context, next: Function) => {
  ctx.body = 'Hello World!';
})

export default router
