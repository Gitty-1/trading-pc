<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b" :ellipsis="false" @select="handleSelect">
      <el-menu-item index="1" class="trade">买入</el-menu-item>
      <el-menu-item index="2" class="trade">卖出</el-menu-item>
    </el-menu>
    <el-form :model="form" id="form">
      <el-form-item label-width="0">
        证券代码：
        <el-input v-model="form.stockCode" :placeholder="placeHolder.inputCode" style="width: 180px">
          <template #append>
            <el-button :icon="Search" @click="handleSearch" />
          </template>
        </el-input>
        <el-link type="primary" :underline="false" @click="gotoStockInfo">股票池</el-link><br />
        <span>
          <span id="ai">不知道选择哪一支股票？点它-></span>
          <el-link type="primary" :underline="false" @click="handleShowDialog">ai选股</el-link>
        </span>
      </el-form-item>
      <el-form-item>
        证券名称：<span id="stockName">{{ form.stockName }}</span>
      </el-form-item>
      <el-form-item v-show="activeIndex === '1'">
        买入价格：
        <el-input-number v-model="form.buyPrice" :min="0.0" controls-position="right" size="large" :step="pricediff" />港元
      </el-form-item>
      <el-form-item v-show="activeIndex === '2'">
        卖出价格：
        <el-input-number v-model="form.sellPrice" :min="0.0" controls-position="right" size="large" :step="pricediff" />港元
      </el-form-item>
      <el-form-item v-show="activeIndex === '1'">
        参考汇率：{{ form.buyRate }}
      </el-form-item>
      <el-form-item v-show="activeIndex === '2'">
        参考汇率：{{ form.sellRate }}
      </el-form-item>
      <el-form-item v-show="activeIndex === '1'">
        可买股数：
        <span v-show="form.buyPrice">{{ form.availableBuyNum }}</span>
      </el-form-item>
      <el-form-item v-show="activeIndex === '2'">
        可卖股数：{{ form.availableSellNum }}
      </el-form-item>
      <el-form-item v-show="activeIndex === '1'">
        买入数量：
        <el-input-number v-model="form.buyNum" :min="0" :max="Math.floor(form.availableBuyNum / 1000) * 1000"
          controls-position="right" size="large" :step="1000" />股
      </el-form-item>
      <el-form-item v-show="activeIndex === '2'">
        卖出数量：
        <el-input-number v-model="form.sellNum" :min="0" :max="form.availableSellNum" controls-position="right"
          size="large" :step="1000" />股
      </el-form-item>
      <el-form-item v-show="activeIndex === '1'">
        金额（含手续费）：{{ buyAmount - buyCharges }}
      </el-form-item>
      <el-form-item v-show="activeIndex === '2'">
        金额（含手续费）：{{ sellAmount - sellCharges }}
      </el-form-item>
      <el-form-item>
        交易类型：
        <el-radio-group v-model="form.tradingType">
          <el-radio label="1" size="large">增强限价盘</el-radio>
          <el-radio label="2" size="large">竞价限价盘</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="tradeButton" v-show="activeIndex === '1'" @click="handleTrade(1)">买入</el-button>
        <el-button type="primary" class="tradeButton" v-show="activeIndex === '2'" @click="handleTrade(2)">卖出</el-button>
        <el-button type="primary" class="tradeButton" @click="handleClearBuy" v-show="activeIndex === '1'">清除</el-button>
        <el-button type="primary" class="tradeButton" @click="handleClearSell" v-show="activeIndex === '2'">清除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  reactive,
  ref,
  watchEffect,
} from "vue";
import { Search } from "@element-plus/icons";
import stockTrade from "@/api/stock/stockTrade";
import stockInfo from "@/api/stock/stockInfo";
import user from "@/api/user";
import bus from "@/bus";
import router from "@/router";
import { placeHolder, alertStatus, alertText, emitName } from "@/string";
import Alert from "@/utils/alert";
import messageBox from "@/utils/messageBox";

onMounted(() => {
  // 获取存储的股票代码，没有则赋初值
  const code = window.sessionStorage.getItem("stockCode");
  form.stockCode = code ? code : '00001'
  handleSearch();
});

const form = reactive({
  stockCode: "",
  stockName: "",
  tradeFlag: 0, //0表示买入，1表示卖出
  buyPrice: 0,
  sellPrice: 0,
  buyRate: 0.9418,
  sellRate: 0.887,
  availableBuyNum: 0,
  availableSellNum: 0,
  buyNum: 0,
  sellNum: 0,
  tradingType: "1", //0表示增强现价盘，1表示竞价现价盘
});

const buyAmount = computed(() => form.buyPrice * form.buyNum)
const sellAmount = computed(() => form.sellPrice * form.sellNum)
const buyCharges = computed(() => form.buyNum === 0
  ? 0
  : form.buyPrice * form.buyNum * 0.002 > 100
    ? form.buyPrice * form.buyNum * 0.002
    : 100)
const sellCharges = computed(() => form.sellNum === 0
  ? 0
  : form.sellPrice * form.sellNum * 0.002 > 100
    ? form.sellPrice * form.sellNum * 0.002
    : 100)

// 用户的可用资金
let availableAsset: number;

// 价差
const pricediff = ref(0.0);

const activeIndex = ref("1");
function handleSelect(key: string) {
  if (key === "2") {
    getUserPositions();
  }
  activeIndex.value = key;
}

// 获取用户某只股票的持仓信息
async function getUserPositions() {
  const uid = window.sessionStorage.getItem("uid");
  const token = window.sessionStorage.getItem('token')
  const res = await user.queryPositions(uid as string, form.stockCode, token as string);
  const data = res.data;

  // 用户某只股票的订单可能不止一个，所以需要遍历所有订单并求和
  let totalNum = 0;
  data.forEach((item: { num: number }) => {
    totalNum += item.num;
  });
  form.availableSellNum = totalNum;
}

// 点击查找
async function handleSearch() {
  // 如果此时导航是卖出则需要发送请求获取用户的持仓
  if (activeIndex.value === "2") {
    getUserPositions();
  }
  const res = await stockInfo.queryStockInfo(form.stockCode);
  const data = res.data;
  console.log('data', res)
  window.sessionStorage.setItem("stockCode", form.stockCode);
  form.stockName = data.Stock_Name;
  form.sellPrice = form.buyPrice = data.Stock_Price;

  // 将五档行情数据传递到FifthOrder组件
  const fifthOrder = {
    stockF: [
      "卖五",
      "卖四",
      "卖三",
      "卖二",
      "卖一",
      "买一",
      "买二",
      "买三",
      "买四",
      "买五",
    ],
    stockFLP: data.Stock_FLP,
    stockFLA: data.Stock_FLA,
  };
  // console.log('stock', data)
  const dataFifth = [];
  for (var i = 0; i < 10; i++) {
    var obj = {
      fifth: fifthOrder.stockF[i],
      price: fifthOrder.stockFLP[i],
      dealNum: fifthOrder.stockFLA[i],
    };
    dataFifth.push(obj);
  }
  bus.emit(emitName.sendFifthOrder, [
    dataFifth,
    data.Stock_ClosingPrice_Yesterday,
    data.Stock_OpeningPrice_Today,
    data.Stock_Price,
    form.stockCode,
    form.stockName,
  ]);
  bus.emit(emitName.sendCodeToChart, form.stockCode);

  bus.on(emitName.sendAccountMsgToItem, (data) => {
    console.log('111', form.availableBuyNum)
    availableAsset = data as number;
    if (form.buyPrice) {
      form.availableBuyNum = Math.floor(availableAsset / form.buyPrice);
      console.log('111', form.availableBuyNum)
    }
  });
  // 设置价差
  pricediff.value = Number((data.Stock_FLP[3] - data.Stock_FLP[4]).toFixed(5));
}

async function handleTrade(value: number) {
  const uid = window.sessionStorage.getItem("uid");
  let operate, orderPrice, orderNum, charges;
  if (value === 1) {
    operate = 0;
    orderPrice = form.buyPrice;
    orderNum = form.buyNum;
    charges = buyCharges.value;
  } else {
    operate = 1;
    orderPrice = form.sellPrice;
    orderNum = form.sellNum;
    charges = sellCharges.value;
  }
  const reqData = {
    uid: uid,
    code: form.stockCode,
    orderType: 0,
    operate,
    orderPrice,
    orderNum,
    charges,
  };
  const confirmMsg = `
            您即将交易的股票信息如下：<br>
                证券名称：${form.stockName}<br>
                交易价格：${orderPrice}<br>
                交易数量：${orderNum}<br>
                手续费：  ${charges}<br>
            请确认是否继续交易
            `;
  messageBox(confirmMsg, async () => {
    if (form.buyNum === 0 && activeIndex.value === "1") {
      Alert(alertText.warningBuyNum, alertStatus.warning)
    } else if (form.sellNum === 0 && activeIndex.value === "2") {
      Alert(alertText.wariningSellNum, alertStatus.warning)
    } else if (form.buyPrice === 0) {
      Alert(alertText.wariningBuyPrice, alertStatus.warning)
    } else if (form.sellPrice === 0) {
      Alert(alertText.wariningSellPrice, alertStatus.warning)
    } else {
      const token = window.sessionStorage.getItem('token')
      await stockTrade.addOrder(reqData, token as string);
      Alert(alertText.successTrade, alertStatus.success)
      bus.emit(emitName.changeAccountAssert, true);
      router.replace('/trading')
    }
  })
}
function handleClearBuy() {
  form.buyPrice = form.buyNum = 0;
}

function handleClearSell() {
  form.sellPrice = form.sellNum = 0;
}

watchEffect(() => {
  if (form.buyPrice) {
    form.availableBuyNum = Math.floor((availableAsset as number) / form.buyPrice);
  }
});

// 跳转到股票池
function gotoStockInfo() {
  router.push("/stockInfo");
}

// 弹出ai选股信息
function handleShowDialog() {
  bus.emit(emitName.showAIDialog);
}

</script>

<style scoped>
.el-menu-demo {
  width: 340px;
  height: 40px;
}

#form {
  width: 340px;
  height: 500px;
  padding: 10px 20px;
}

#a_tab {
  font-size: 12px;
  color: blue;
  text-decoration: underline;
}

.trade {
  width: 170px;
}

#ai {
  font-size: 12px;
  color: #b9b5b5;
}

#stockName {
  color: red;
}

.tradeButton {
  flex-grow: 1;
}
</style>
