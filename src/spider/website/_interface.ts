/**
 * Created by ChengZheLin on 2019/6/11.
 * Features: interface
 */

export interface Structure {
  country?: string | undefined
  ip: string
  port: string
  address?: string | undefined
  anonymous: boolean
  protocol: string
  time: number | string
}
