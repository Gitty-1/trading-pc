import axios from "@/utils/request";

const BASEURL = {
  protocol: 'http',
  ip: '10.125.138.67',
  port: ['7890', '7880', '7870', '7890'],
}

const baseURL = `${BASEURL.protocol}://${BASEURL.ip}:`

const stockTrade = {
  // 交易（添加委托）
  addOrder: (data: any, token: string) => axios({
    url: '/trans/addOrder',
    method: 'post',
    headers: {token},
    baseURL: baseURL + `${(BASEURL.port)[0]}`,
    data,
  }),

  // 查委托
  queryEntrust: (url: string, token: string) => axios({
    url,
    method: 'get',
    headers: {token},
    baseURL: baseURL + `${(BASEURL.port)[1]}`,
  }),

  // 查成交
  queryDeal: (url: string, token: string) => axios({
    url,
    method: 'get',
    headers: {token},
    baseURL: baseURL + `${(BASEURL.port)[2]}`,
  }),
  // 撤单
  cancelOrder: (data: any, token: string) => axios({
    url: '/trans/cancelOrder',
    method: 'put',
    headers: {token},
    baseURL: baseURL + `${(BASEURL.port)[3]}`,
    data,
  }),

}

export default stockTrade
