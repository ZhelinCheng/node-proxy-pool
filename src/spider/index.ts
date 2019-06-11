/**
 * Created by ChengZheLin on 2019/6/11.
 * Features: index
 */
import path from 'path'
import glob from 'glob'
import { Structure } from './website/_interface'
import any = jasmine.any

let website: string[] = glob.sync(path.join(__dirname, './website/[a-z]*.js'))

export default async function () {
  try {
    /*let rq: Function[] = []
    for (let uri of website) {
      rq.push(require(uri)())
    }
    let data = await Promise.all(rq)*/

    /*let arr: Structure[] = []
    for (let item: Structure[] of data) {
      arr = arr.concat(item)
    }*/

    // console.log(...data)
    /*let arr: any = []
    data.forEach(function (item) {
      arr = arr.concat(arr, item)
    })

    console.log(arr.length)*/

    let data = await require('./website/_quanwang')()
    // console.log(data)
  } catch (e) {
    console.error(e)
  }
}
