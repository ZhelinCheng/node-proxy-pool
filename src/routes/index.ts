/**
 * Created by ChengZheLin on 2019/6/10.
 * Features: index
 */
import path from 'path'
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { Context } from 'koa'
import Router from 'koa-router'
import spider from '../spider'

(async function () {
  await spider()
}())

const router = new Router()

// 初始化
const adapter = new FileSync(path.resolve(__dirname, '../../database/db.json'))

const db = lowdb(adapter)
db.defaults({ ips: [] }).write()


router.get('/', async (ctx: Context, next: Function) => {
  ctx.body = {}
})

export default router
