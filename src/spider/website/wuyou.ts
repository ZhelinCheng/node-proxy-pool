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
      uri: `http://www.data5u.com/`
    })

    let box: Structure[] = []

    const $ = cheerio.load(html)
    const $table = $('.wlist > ul > li').eq(1).children()

    $table.each( idx => {
      if (idx === 0) return

      let $item = $table.eq(idx)
      let $child = $item.children('span')

      let time: any = /(\d+)(分|秒)/.exec($child.eq(8).text())
      if (time[2] === '秒') {
        time = now - time[1]
      } else {
        time = now - time[1] * 60
      }

      let country = $child.eq(4).text()
      let ip = $child.eq(0).text()
      let port = $child.eq(1).text()
      let address = $child.eq(5).text().trim()
      let anonymous = $child.eq(2).text() === '高匿'
      let protocol = $child.eq(3).text()

      box.push({
        country,
        ip,
        port,
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
