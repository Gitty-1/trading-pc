<template>
  <div id="stockInfo">
    <div class="search">
      <el-input
        v-model="inputStockName"
        :placeholder="placeHolder.inputStockName"
        class="input"
      >
        <template #append>
          <el-button :icon="Search" @click="handleFilter" />
        </template>
      </el-input>
      <el-button type="primary" id="backButton" @click="handleBack"
        >返回</el-button
      >
    </div>
    <el-table-v2
      :columns="columns"
      :data="tableData"
      :width="1200"
      :height="400"
      :row-class="rowClass"
      :fixed="true"
      id="stockTable"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, h } from "vue";
import router from "@/router";
import stockInfo from "@/api/stock/stockInfo";
import ElButton from "element-plus/lib/components/button/index.js";
import type { RowClassNameGetter } from "element-plus/lib/components/table-v2/src/table.js";
import Alert from '@/utils/alert'
import { Search } from "@element-plus/icons";
import { placeHolder, alertStatus, alertText, stockList, operation, stockListEng } from "@/string";

const columns = [
  {
    key: stockListEng.stockCode,
    dataKey: stockListEng.stockCode,
    title: stockList.stockCode,
    width: 300,
  },
  {
    key: stockListEng.stockName,
    dataKey: stockListEng.stockName,
    title: stockList.stockName,
    width: 300,
  },
  {
    key: stockListEng.stopFlag,
    dataKey: stockListEng.stopFlag,
    title: stockList.stopFlag,
    width: 300,
  },
  {
    key: "handle",
    title: stockList.operation,
    width: 300,
    align: "center",
    cellRenderer: (data: any) => h(
      ElButton,
      {
        onClick: () => handleSearch(data),
        type: "success",
        size: "small",
      },
      { default: () => operation.search },
    ),
  },
];
let tableData = ref([]);
let tableDataTrue = ref([]);

const rowClass = ({ rowIndex }: Parameters<RowClassNameGetter<any>>[0]) => {
  if (rowIndex % 10 === 5) {
    return "bg-red-100";
  } else if (rowIndex % 10 === 0) {
    return "bg-blue-200";
  }
  return "";
};

// 点击查询按钮的回调
function handleSearch(data: any) {
  console.log(data);
  const stockCode = data.rowData.stockCode.slice(1, 6);
  window.sessionStorage.setItem("stockCode", stockCode);
  router.replace("/trading");
}

// 过滤股票
// 弹出消息框
let inputStockName = ref("");
function handleFilter() {
  if (!inputStockName.value) {
    Alert(alertText.emptyInput, alertStatus.warning);
  } else {
    tableData.value = tableDataTrue.value.filter(item => (item["stockName"] as string).indexOf(inputStockName.value) !== -1);
    if (tableData.value.length) {
      Alert(alertText.hasSearch, alertStatus.success);
    } else {
      Alert(alertText.hasnotSearch, alertStatus.warning);
    }
  }
}

onMounted(async () => {
  const res = await stockInfo.queryAllStockInfo();
  const data = res.data;
  console.log(data)
  tableDataTrue.value = tableData.value = data;
});

// 返回
function handleBack() {
  router.replace("/trading");
}
</script>

<style scoped>
#stockInfo {
  margin: 20px;
}

.search {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

#stockTable {
  margin: 20px auto;
}

.input {
  width: 300px;
}
#backButton {
  float: right;
}
</style>
