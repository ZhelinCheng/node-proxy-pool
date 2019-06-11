/**
 * Created by ChengZheLin on 2019/6/11.
 * Features: 66ip
 */
// http://www.66ip.cn/nmtq.php?getnum=10&isp=0&anonymoustype=0&start=&ports=&export=&ipaddress=&area=0&proxytype=1&api=66ip
import cheerio from 'cheerio'
import { Structure } from './_interface'
import rq from '../../util/request'

export = async function (): Promise<Structure[]> {
  let now = Math.ceil(new Date().getTime() / 1000) - 5 * 60
  let html = await rq({
    uri: 'http://www.66ip.cn/nmtq.php?getnum=25&isp=0&anonymoustype=0&start=&ports=&export=&ipaddress=&area=0&proxytype=1&api=66ip'
  })

  let box: Structure[] = []

  const $ = cheerio.load(html)
  const ips = $('body').text().trim().split('\n\t\t')

  for (let item of ips) {
    box.push({
      ip: item[0],
      port: item[1],
      anonymous: true,
      protocol: 'https',
      time: now
    })
  }

  return box
}
