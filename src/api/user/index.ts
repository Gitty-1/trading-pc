import axios from "@/utils/request";

const BASEURL = {
  protocol: 'http',
  ip: '10.125.139.70',
  port: '8083',
}


const baseURL = `${BASEURL.protocol}://${BASEURL.ip}:${BASEURL.port}`

const user = {
  // 修改用户资产
  updateUserAssets: (uid: string, token: string) => axios({
    url: `/queryUserInfo?uid=${uid}`,
    headers: { token },
    method: 'get',
    baseURL,
  }),

  // 登录
  login: (data: any) => axios({
    url: '/login',
    method: 'post',
    baseURL,
    data,
  }),

  // 注册
  register: (data: any) => axios({
    url: '/register',
    method: 'post',
    baseURL,
    data,
  }),

  // 修改用户信息
  updateUserMsg: (data: any, token: string) => axios({
    url: '/updateUser',
    headers: { token },
    method: 'post',
    baseURL,
    data,
  }),

  // 查用户资金股份
  queryPositionsByUid: (uid: string, token: string) => axios({
    url: `/queryPositionsByUid?uid=${uid}`,
    headers: { token },
    method: 'get',
    baseURL,
  }),

  // 查询用户某只股票持仓信息
  queryPositions: (uid: string, stockCode: string, token: string) => axios({
    url: `/queryPositionsByUidAndCode?uid=${uid}&code=${stockCode}`,
    headers: { token },
    method: 'get',
    baseURL,
  }),

  // 验证用户是否已登录
  validLogin: (token: string) => axios({
    url: '/verify',
    headers: { token },
    method: 'post',
    baseURL,
  }),
}

export default user
