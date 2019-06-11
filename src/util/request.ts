/**
 * Created by ChengZheLin on 2019/6/11.
 * Features: request
 */

import request from 'request-promise-native'
import Useragent from './useragent'

const ua = new Useragent()

interface Params {
  uri: string
}

export default async function (params: Params): Promise<string> {
  return await request({
    ...params,
    method: 'get',
    timeout: 1000,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,ko;q=0.7',
      'Connection': 'keep-alive',
      'User-Agent': ua.random(),
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}
