/**
 * Created by ChengZheLin on 2019/6/10.
 * Features: app
 */
import Koa from 'koa'
import logger from 'koa-morgan'
import dotenv from 'dotenv'
import router from './routes'

dotenv.config({path: '.env.local'})

const app = new Koa()

app.use(logger('dev'))

app.use(router.routes())

// error handler
app.on('error', (err, ctx) => {
  if (app.env === 'development') {
    console.error(err)
    ctx.body = err
  }
})

export default app
