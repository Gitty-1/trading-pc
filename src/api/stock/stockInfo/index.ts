import axios from "@/utils/request";

const BASEURL = {
  protocol: 'http',
  ip: '10.125.138.228',
  port: '8080',
}

const baseURL = `${BASEURL.protocol}://${BASEURL.ip}:${BASEURL.port}`

const stockInfo = {
  // 请求行情接口
  queryStockInfo: (stockCode: string) => axios({
    url: `/queryStockInfo?code=${stockCode}`,
    method: 'get',
    baseURL,
  }),
    
  // 获取k线
  queryKLine: (data: any) => axios({
    url: '/queryKline',
    method: 'post',
    baseURL,
    data,
  }),
    
  // 查询所有股票行情
  queryAllStockInfo: () => axios({
    url: '/queryStockInfoFromDatabase',
    method: 'get',
    baseURL,
  }),
}

export default stockInfo
