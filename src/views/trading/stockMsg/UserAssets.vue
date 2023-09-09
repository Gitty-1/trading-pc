<template>
  <div id="userAssets">
    <div>
      <el-icon>
        <Avatar />
      </el-icon><span id="title">投资者账户（人民币）</span>
      <span id="tip">当前账户资产为虚拟货币</span>
    </div>
    <ul>
      <li>结余：<span>{{ formatAccount(accounts.balance) }}</span></li>
      <li>可用：<span>{{ formatAccount(accounts.available) }}</span></li>
      <li>冻结：<span>{{ formatAccount(accounts.freeze) }}</span></li>
      <li>总市值：<span>{{ formatAccount(accounts.totalValue) }}</span></li>
      <li>总资产：<span>{{ formatAccount(accounts.totalAssets) }}</span></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import user from '@/api/user'
import bus from '@/bus'
import { emitName } from '@/string'

const accounts = reactive({
  balance: 0,
  available: 0,
  freeze: 0,
  totalValue: 0,
  totalAssets: 0,
})

// 格式化用户各个资产信息（保留两位小数）
function formatAccount(accountMsg: number) {
  return accountMsg.toFixed(2)
}

// 封装请求修改用户资产信息函数
async function handleupdateUserAssets() {

  const uid = window.sessionStorage.getItem('uid')
  const token = window.sessionStorage.getItem('token')
  const res = await user.updateUserAssets(uid as string, token as string)
  const data = res.data
  // console.log('res.data1', res.data)
  accounts.available = data.available_asset
  accounts.freeze = data.frozen_asset
  accounts.totalValue = data.total_market_value
  accounts.balance = accounts.available + accounts.freeze
  accounts.totalAssets = accounts.balance + accounts.totalValue
  bus.emit(emitName.sendAccountMsgToItem, accounts.available)
}

watch(accounts, () => {
  handleupdateUserAssets()
}, { immediate: true })

bus.on(emitName.changeAccountAssert, (value) => {
  if (value) {
    handleupdateUserAssets()
  }
})
</script>

<style scoped>
#userAssets {
  margin-bottom: 10px;
}

#title {
  color: #4f64ce;
}
#tip {
  font-size: 12px; 
  color: #666;
}

ul {
  height: 30px;
  list-style: none;
  margin-top: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  padding: 0;
}

li {
  padding-left: 10px;
  padding-right: 10px;
  border-right: 1px solid #666;
  font-size: 13px;
}

ul li span {
  color: rgb(17, 101, 197);
  font-weight: 700;
}
</style>
