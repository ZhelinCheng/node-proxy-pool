/**
 * Created by ChengZheLin on 2019/6/11.
 * Features: wuyou
 */
import cheerio from 'cheerio'
import { Structure } from './_interface'
import rq from '../../util/request'

export = async function (): Promise<Structure[]> {
  let now = Math.ceil(new Date().getTime() / 1000)
  try {
    let html: string = await rq({
      uri: `http://www.goubanjia.com/?=${new Date().getTime()}`
    })

    let box: Structure[] = []

    const $ = cheerio.load(html)
    const $table = $('.table > tbody > tr')
    $table.each( idx => {
      let $item = $table.eq(idx)
      let $child = $item.children()

      let time: any = /(\d+)(分|秒)/.exec($child.eq(6).text())
      if (time[2] === '秒') {
        time = now - time[1]
      } else {
        time = now - time[1] * 60
      }

      let $eq0 = $child.eq(0)
      console.log($eq0.children().length)
      // $eq0.remove()
      console.log($eq0.children().length)

      let url: string = $eq0.text()
      let address = $child.eq(3).text().replace(/\s+/img, '')
      let anonymous = $child.eq(1).text() === '高匿'
      let protocol = $child.eq(2).text()

      let all = url.split(':')
      // console.log(url)
      box.push({
        ip: all[0],
        port: all[1],
        address,
        anonymous,
        protocol,
        time
      })
    })

    return box
  } catch (e) {
    console.error(e)
    return []
  }
}
