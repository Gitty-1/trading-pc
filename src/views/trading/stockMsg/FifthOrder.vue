<template>
  <div class="fifth">
    <span>昨收：{{ fifthOrderMsg.yesterdayPrice }}</span>
    <span>今开：{{ fifthOrderMsg.todayOpenPrice }}</span>
    <span>现价：{{ fifthOrderMsg.nowPrice }}</span>
    <el-table :data="list" table-layout="auto">
      <el-table-column :prop="fifthList.fifth" :label="fifthOrderMsg.stockCode" />
      <el-table-column :prop="fifthList.price" :label="fifthOrderMsg.stockName" />
      <el-table-column :prop="fifthList.dealNum" :label="fifthOrderMsg.num" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import bus from "@/bus";
import { emitName, stockList, fifthList } from "@/string";

const list = reactive([]);
const fifthOrderMsg = reactive({
  stockCode: "",
  stockName: "",
  entrustNum: 0,
  yesterdayPrice: 0,
  todayOpenPrice: 0,
  nowPrice: 0,
  num: '',
});

bus.on(emitName.sendFifthOrder, (data) => {
  const [fifth, yesterdayP, todayOpenP, price, stockCode, stockName] =
        data as [any, number, number, number, string, string];
  list.splice(0, list.length, ...(<[]>fifth));
  fifthOrderMsg.yesterdayPrice = yesterdayP;
  fifthOrderMsg.todayOpenPrice = todayOpenP;
  fifthOrderMsg.nowPrice = price;
  fifthOrderMsg.stockCode = stockCode;
  fifthOrderMsg.stockName = stockName;
  fifthOrderMsg.num = stockList.dealNum
});
</script>

<style scoped>
.fifth {
  width: 300px;
}

span {
  font-size: 12px;
  color: #666;
  margin-right: 10px;
}
</style>
