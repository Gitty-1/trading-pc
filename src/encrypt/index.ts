// 请求数据加密
import CryptoJS from 'crypto-js';

function getEncryptData(value: string) {
  const key = CryptoJS.enc.Hex.parse('myKey') // 替换为自己的密钥
  const iv = CryptoJS.enc.Hex.parse('myIV') // 替换为自己的IV向量
  const encryptedData = CryptoJS.AES.encrypt(value, key, { iv }).toString()
  return encryptedData
}

export default getEncryptData
