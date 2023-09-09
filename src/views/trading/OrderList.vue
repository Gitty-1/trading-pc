<template>
  <div id="list">
    <el-tabs type="border-card" class="demo-tabs" v-model="curName" @tab-change="handleShowMsg()">

      <el-button id="refresh" type="success" size="small" round plain @click="handleShowMsg">
        <el-icon>
          <Refresh />
        </el-icon>
        刷新
      </el-button>

      <el-tab-pane>
        <template #label>
          <span class="nav">
            <el-icon>
              <calendar />
            </el-icon>
            <span>资金股份</span>
          </span>
        </template>
        <el-table :data="lists.capitalShares">
          <el-table-column :prop="stockListEng.stockName" :label="stockList.stockName" />
          <el-table-column :prop="stockListEng.stockCode" :label="stockList.stockCode" />
          <el-table-column :prop="stockListEng.positionNum" :label="stockList.positionNum" />
          <el-table-column :prop="stockListEng.availableSellNum" :label="stockList.availableSellNum" />
        </el-table>
      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span class="nav">
            <el-icon>
              <calendar />
            </el-icon>
            <span>当日委托</span>
          </span>
        </template>
        <el-table :data="lists.somedayCommission" table-layout="auto" :row-class-name="setRowClass">
          <el-table-column :prop="stockListEng.stockCode" :label="stockList.stockCode" />
          <el-table-column :prop="stockListEng.stockName" :label="stockList.stockName" />
          <el-table-column :prop="stockListEng.operation" :label="stockList.operation" />
          <el-table-column :prop="stockListEng.entrustPrice" :label="stockList.entrustPrice" />
          <el-table-column :prop="stockListEng.entrustNum" :label="stockList.entrustNum" />
          <el-table-column :prop="stockListEng.dealNum" :label="stockList.dealNum" />
          <el-table-column :prop="stockListEng.status" :label="stockList.status" />
          <el-table-column :prop="stockListEng.operationTime" :label="stockList.operationTime" />
          <el-table-column :prop="stockListEng.entrustID" :label="stockList.entrustID" />
          <el-table-column v-show="lists.somedayCommission.length > 0">
            <template #default="scope">
              <el-button size="small" type="primary"
                v-show="lists.somedayCommission[scope.$index].status === orderStatus.unDeal"
                @click="handleDelete(lists.somedayCommission[scope.$index].entrustID)">撤单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span class="nav">
            <el-icon>
              <calendar />
            </el-icon>
            <span>当日成交</span>
          </span>
        </template>
        <el-table :data="lists.somedayDeal" table-layout="auto" :row-class-name="setRowClass">
          <el-table-column :prop="stockListEng.stockCode" :label="stockList.stockCode" />
          <el-table-column :prop="stockListEng.stockName" :label="stockList.stockName" />
          <el-table-column :prop="stockListEng.operation" :label="stockList.operation" />
          <el-table-column :prop="stockListEng.dealPrice" :label="stockList.dealPrice" />
          <el-table-column :prop="stockListEng.dealNum" :label="stockList.dealNum" />
          <el-table-column :prop="stockListEng.dealTime" :label="stockList.dealTime" />
          <el-table-column :prop="stockListEng.dealID" :label="stockList.dealID" />
        </el-table>
      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span class="nav">
            <el-icon>
              <calendar />
            </el-icon>
            <span>历史委托</span>
          </span>
        </template>
        <div>
          <div class="search">
            起始日期：
            <el-date-picker v-model="date.entrustStartTime" type="date" :placeholder="placeHolder.startDate"
              size="small" />
            终止日期
            <el-date-picker v-model="date.entrustEndTime" type="date" :placeholder="placeHolder.endDate" size="small" />
            <el-button type="primary" style="margin-left: 10px" @click="handleSearchMsg(1)">查询</el-button>
          </div>
          <el-table :data="lists.historyCommission" table-layout="auto" :row-class-name="setRowClass">
            <el-table-column :prop="stockListEng.stockCode" :label="stockList.stockCode" />
            <el-table-column :prop="stockListEng.stockName" :label="stockList.stockName" />
            <el-table-column :prop="stockListEng.operation" :label="stockList.operation" />
            <el-table-column :prop="stockListEng.entrustPrice" :label="stockList.entrustPrice" />
            <el-table-column :prop="stockListEng.entrustNum" :label="stockList.entrustNum" />
            <el-table-column :prop="stockListEng.dealNum" :label="stockList.dealNum" />
            <el-table-column :prop="stockListEng.status" :label="stockList.status" />
            <el-table-column :prop="stockListEng.operationTime" :label="stockList.operationTime" />
            <el-table-column :prop="stockListEng.entrustID" :label="stockList.entrustID" />
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span class="nav">
            <el-icon>
              <calendar />
            </el-icon>
            <span>历史成交</span>
          </span>
        </template>
        <div>
          <div class="search">
            起始日期：
            <el-date-picker v-model="date.historyStartTime" type="date" :placeholder="placeHolder.startDate"
              size="small" />
            终止日期
            <el-date-picker v-model="date.historyEndTime" type="date" :placeholder="placeHolder.endDate" size="small" />
            <el-button type="primary" style="margin-left: 10px" @click="handleSearchMsg(2)">查询</el-button>
          </div>
          <div>
            <el-table :data="lists.historyDeal" table-layout="auto" :row-class-name="setRowClass">
              <el-table-column :prop="stockListEng.stockCode" :label="stockList.stockCode" />
              <el-table-column :prop="stockListEng.stockName" :label="stockList.stockName" />
              <el-table-column :prop="stockListEng.operation" :label="stockList.operation" />
              <el-table-column :prop="stockListEng.dealPrice" :label="stockList.dealPrice" />
              <el-table-column :prop="stockListEng.dealNum" :label="stockList.dealNum" />
              <el-table-column :prop="stockListEng.dealTime" :label="stockList.dealTime" />
              <el-table-column :prop="stockListEng.dealID" :label="stockList.dealID" />
            </el-table>
          </div>
        </div>
      </el-tab-pane>




    </el-tabs>

    <el-pagination background layout="prev, pager, next" :total="pageMsg.currentPageTotal" :page-size="pageMsg.pageSize"
      class="el-page" @current-change="handlePageChange" v-model:current-page="pageMsg.currentPageIndex"
      v-show="curName !== '0'" :hide-on-single-page="true"/>

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import dayjs from "dayjs";
import user from "@/api/user";
import stockTrade from "@/api/stock/stockTrade";

import { stockListEng, stockList, placeHolder, orderStatus, orderOperation, alertStatus } from "@/string";
import router from "@/router";
import Alert from "@/utils/alert";
import { alertText } from "@/string";
import messageBox from "@/utils/messageBox";

const uid = window.sessionStorage.getItem("uid");

onMounted(() => {
  // 显示持仓信息
  sendMsgCaptureShares();
});


// 记录当前选项卡位置
const curName = ref("0");

// 存储历史委托和历史成交的查询日期
const date = reactive({
  entrustStartTime: 0,
  entrustEndTime: 0,
  historyStartTime: 0,
  historyEndTime: 0,
});

// 存储当前表的页数信息
const pageMsg = reactive({
  currentPageTotal: 0,
  pageSize: 0,
  currentPageIndex: 1,
});

// 列表数据存储
const lists = reactive({
  // 资金股份列表
  capitalShares: [
    {
      stockName: "",
      stockCode: "",
      positionNum: 0,
      availableSellNum: 0,
    },
  ],
  // 当日委托
  somedayCommission: [
    {
      stockCode: "",
      stockName: "",
      operation: "",
      entrustPrice: 0,
      entrustNum: 0,
      dealNum: 0,
      status: "",
      operationTime: "",
      entrustID: "",
    },
  ],
  // 当日成交
  somedayDeal: [
    {
      stockCode: "",
      stockName: "",
      operation: "",
      dealPrice: 0,
      dealNum: 0,
      dealTime: "",
      dealID: "",
    },
  ],
  // 历史委托
  historyCommission: [
    {
      stockCode: "",
      stockName: "",
      operation: "",
      entrustPrice: 0,
      entrustNum: 0,
      dealNum: 0,
      status: "",
      operationTime: "",
      entrustID: "",
    },
  ],
  // 历史成交
  historyDeal: [
    {
      stockCode: "",
      stockName: "",
      operation: "",
      dealPrice: 0,
      dealNum: 0,
      dealTime: "",
      dealID: "",
    },
  ],
});

// 发送资金股份请求函数
async function sendMsgCaptureShares() {
  lists.capitalShares.splice(0);
  //#region
  // 发送请求
  const token = window.sessionStorage.getItem('token')
  const res = await user.queryPositionsByUid(uid as string, token as string);
  const data = res.data;
  // 验证成功则将列表数据放到对应的存储位置，显示到页面
  data.forEach((item: any) => {
    const obj = {
      stockName: item.stockName,
      stockCode: item.code,
      positionNum: item.num,
      availableSellNum: item.num,
    };
    lists.capitalShares.push(obj);
  });
  // #endregion
}

// 封装发送委托函数
async function sendEntrust(startDay = "", endDay = "") {
  //#region
  // 日期是否错误
  if (startDay && date.entrustStartTime > date.entrustEndTime) {
    Alert(alertText.dateWrong, alertStatus.error)
  } else {
    if (startDay) lists.historyCommission.splice(0)
    else lists.somedayCommission.splice(0);
    // 构建url，根据是否需要传递日期来动态构建请求url
    const url = `/order/page?uid=${uid}&page=${pageMsg.currentPageIndex}` +
    (startDay === "" ? "" : `&beginTime=${startDay}&endTime=${endDay}`);
    // 发送请求
    const token = window.sessionStorage.getItem('token')
    const res = await stockTrade.queryEntrust(url, token as string);
    const data = res.data;
    // 验证成功则更新分页信息，将返回的列表数据读到对应存储位置，显示到页面
    pageMsg.currentPageTotal = data.total;
    pageMsg.pageSize = data.size;

    // 响应的列表数据放在records
    const records = data.records;

    records.forEach((item: any) => {
    // 响应数据的列表项的状态和操作是数据格式，需要转成字符串（已成交，未成交，已撤单 | 买入，卖出）
      const status =
      item.status === 0
        ? orderStatus.unDeal
        : item.status === 1
          ? orderStatus.dealed
          : orderStatus.chargeBacks;
      const operation = item.operate === 0 ? orderOperation.buy : orderOperation.sell;
      const obj = {
        stockCode: item.code,
        stockName: item.stockName,
        operation,
        entrustPrice: item.orderPrice,
        entrustNum: item.orderNum,
        dealNum: item.volNum,
        status,
        operationTime: item.date.slice(0, 10),
        entrustID: item.oid,
      };
      // 有请求日期是历史委托
      if (startDay) lists.historyCommission.push(obj);
      else lists.somedayCommission.push(obj);
    });
  //#endregion
  }
  
}
// 发送当日委托请求函数
function sendMsgSomedayCommission() {
  sendEntrust();
}
// 发送历史委托请求的函数
function sendMsgHistoryCommission() {
  // 时间是时间戳格式，要格式化后才能发送到后端
  const formatStartTime = dayjs(date.entrustStartTime).format("YYYY-MM-DD");
  const formatEndTime = dayjs(date.entrustEndTime).format("YYYY-MM-DD");
  sendEntrust(formatStartTime, formatEndTime);
}

// 封装发送成交请求函数
async function sendDeal(startDay = "", endDay = "") {
  //#region
  if (startDay && date.historyStartTime > date.historyEndTime) {
    Alert(alertText.dateWrong, alertStatus.error)
  } else {
    if (startDay) lists.historyDeal.splice(0)
    else lists.somedayDeal.splice(0);
    const url = `/trading/page?uid=${uid}&page=${pageMsg.currentPageIndex}` +
    (startDay === "" ? "" : `&beginTime=${startDay}&endTime=${endDay}`);
    const token = window.sessionStorage.getItem('token')
    const res = await stockTrade.queryDeal(url, token as string);
    const data = res.data;
    pageMsg.currentPageTotal = data.total;
    pageMsg.pageSize = data.size;
    const records = data.records;

    records.forEach((item: any) => {
      const operation = item.operate === 0 ? orderOperation.buy : orderOperation.sell;
      const obj = {
        stockCode: item.code,
        stockName: item.stockName,
        operation,
        dealPrice: item.tradePrice,
        dealNum: item.volNum,
        dealTime: item.date.slice(0, 10),
        dealID: item.oid,
      };
      if (startDay) lists.historyDeal.push(obj);
      else lists.somedayDeal.push(obj);
    });
  }
  
  //#endregion
}
// 发送当日成交请求函数
function sendMsgSomedayDeal() {
  sendDeal();
}
// 发送历史成交请求的函数
function sendMsgHistoryDeal() {
  const formatStartTime = dayjs(date.historyStartTime).format("YYYY-MM-DD");
  const formatEndTime = dayjs(date.historyEndTime).format("YYYY-MM-DD");
  sendDeal(formatStartTime, formatEndTime);
}

// 点击标签页或者刷新按钮的回调
function handleShowMsg() {

  // 重置分页信息
  pageMsg.currentPageTotal = 0;
  pageMsg.pageSize = 1;
  pageMsg.currentPageIndex = 1;

  if (curName.value === "0") {
    sendMsgCaptureShares();
  } else if (curName.value === "1") {
    sendMsgSomedayCommission();
  } else if (curName.value === "2") {
    sendMsgSomedayDeal();
  } else if (curName.value === "3") {
    date.entrustStartTime = new Date().setDate(new Date().getDate() - 6);
    date.entrustEndTime = new Date().setDate(new Date().getDate());
    sendMsgHistoryCommission();
  } else if (curName.value === "4") {
    date.historyStartTime = new Date().setDate(new Date().getDate() - 6);
    date.historyEndTime = new Date().setDate(new Date().getDate());
    sendMsgHistoryDeal();
  }

}
function handleSearchMsg(value: number) {
  if (value === 1) {
    sendMsgHistoryCommission();
  } else if (value === 2) {
    sendMsgHistoryDeal();
  }
}

// 撤单
function handleDelete(index: any) {
  messageBox(alertText.confirmCancel, async () => {
    const token = window.sessionStorage.getItem('token')
    await stockTrade.cancelOrder({ oid: index }, token as string);
    Alert(alertText.successCancel, alertStatus.success)
    router.replace('/trading')
  })

}

// 处理分页
function handlePageChange() {
  if (curName.value === "1") {
    sendMsgSomedayCommission();
  } else if (curName.value === "2") {
    sendMsgSomedayDeal();
  } else if (curName.value === "3") {
    sendMsgHistoryCommission();
  } else if (curName.value === "4") {
    sendMsgHistoryDeal();
  }
}

// 为表格添加样式
const setRowClass = ({ row }: { row: any }) => {
  if (row.operation === orderOperation.buy) {
    if (row.status === orderStatus.dealed) return "buy-row1";
    else if (row.status === orderStatus.unDeal) return "buy-row2";
    else if (row.status === orderStatus.chargeBacks) return "delay-row";
  } else if (row.operation === orderOperation.sell) {
    if (row.status === orderStatus.dealed) return "sell-row1";
    else if (row.status === orderStatus.unDeal) return "sell-row2";
    else if (row.status === orderStatus.chargeBacks) return "delay-row";
  }
  return "";
};

</script>

<style>
#list {
  width: 100%;
  border: 1px solid blue;
  clear: both;
  display: flex;
  flex-flow: column wrap;
}

.nav {
  font-size: 16px;
  font-weight: 700;
}

.demo-tabs {
  width: 100%;
}

.search>input {
  width: 100px;
}

.el-page {
  align-self: flex-end;
  margin-top: 10px;
}

.el-table .buy-row1 {
  background-color: rgba(153, 231, 245, 0.3);
}

.el-table .buy-row2 {
  background-color: rgba(153, 231, 245, 0.1);
}

.el-table .sell-row1 {
  background-color: rgba(247, 239, 173, 0.3);
}

.el-table .sell-row2 {
  background-color: rgba(247, 239, 173, 0.1);
}

.el-table .delay-row {
  background-color: rgba(147, 147, 143, 0.1);
}
</style>
