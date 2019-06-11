/**
 * Created by ChengZheLin on 2019/6/11.
 * Features: xici
 */
import cheerio from 'cheerio'
import { Structure } from './_interface'
import rq from '../../util/request'

export = async function (): Promise<Structure[]> {
  let now = Math.ceil(new Date().getTime() / 1000)

  try {
    let html: string = await rq({
      uri: `https://www.xicidaili.com/nn`
    })

    let box: Structure[] = []

    const $ = cheerio.load(html)
    const $table = $('#ip_list tr')

    $table.each(idx => {
      if (idx === 0) return

      let $item = $table.eq(idx)
      let $td = $item.children('td')
      let time: any = $td.eq(9).text()
      time = Math.ceil(new Date(`20${time}`).getTime() / 1000)

      // 验证小于5分钟
      if (now - time < 4000) {
        let country = $td.eq(0).children('img').attr('alt')
        let ip = $td.eq(1).text()
        let port = $td.eq(2).text()
        let address = $td.eq(3).text().trim()
        let anonymous = $td.eq(4).text() === '高匿'
        let protocol = $td.eq(5).text().toLowerCase()
        box.push({
          country,
          ip,
          port,
          address,
          anonymous,
          protocol,
          time
        })
      }
    })

    return box
  } catch (e) {
    console.error(e)
    return []
  }
}
