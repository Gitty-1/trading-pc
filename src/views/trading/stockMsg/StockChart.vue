<template>
  <div>
    <e-charts class="candlestickChart" :option="option" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import stockInfo from "@/api/stock/stockInfo";
import { getData } from "@/k-util/kLine";
import bus from "@/bus";
import { number } from "echarts";
import { chart } from '@/string'
import { emitName } from "@/string";

const stockKData = reactive([
  {
    // 日期
    date: "",
    // 四个价格的列表
    list: [],
    // 成交量
    total_h: number,
  },
]);

const stockKDataDay = 100

bus.on(emitName.sendCodeToChart, async (stockCode) => {
  const res = await stockInfo.queryKLine({ code: stockCode, days: stockKDataDay });
  const data = res.data;
  const stockKData1 = getData(
    data.GRID0,
    data.NEWMARKETNO,
    data.maxCount,
  );
  stockKData.splice(0);
  for (let i = 0; i < stockKData1.length; i++) {
    const obj = {
      date: stockKData1[i].Time,
      list: [
        stockKData1[i].OpenPrice,
        stockKData1[i].ClosePrice,
        stockKData1[i].LowPrice,
        stockKData1[i].HighPrice,
      ],
      total_h: stockKData1[i].Total_h,
    };
    stockKData.push(obj as never);
  }
});

const option = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross", //十字准星指示器
    },
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    textStyle: {
      color: "#000",
    },
    formatter: function (params: any) {
      let result = "";
      params.forEach((item: any) => {
        if (item.seriesName === chart.dayK) {
          result += item.marker + chart.openPrice + item.value[1] + "<br>";
          result += item.marker + chart.closePrice + item.value[2] + "<br>";
          result += item.marker + chart.lowestPrice + item.value[3] + "<br>";
          result += item.marker + chart.higestPrice + item.value[4] + "<br>";
        } else {
          result += item.marker + item.seriesName + ": " + item.value + "<br>";
        }
      });
      return result;
    },
  },
  grid: [
    {
      top: "5%",
      bottom: "50%",
    },
    {
      top: "60%",
      bottom: "20%",
    },
  ],
  xAxis: [
    {
      type: "category",
      data: stockKData.map(item => item.date),
    },
    {
      type: "category",
      gridIndex: 1,
      data: stockKData.map(item => item.date),
    },
  ],
  yAxis: [
    {
      scale: true,
    },
    {
      gridIndex: 1,
      scale: true,
      axisLabel: {
        formatter: function (value: number) {
          const suffixes = ["", "K", "M", "B", "T"]; // 可根据需求自定义后缀
          const suffixNum = Math.floor(("" + value).length / 3);
          let shortValue = value / Math.pow(1000, suffixNum);
          if (shortValue % 1 !== 0) {
            shortValue = Math.round(shortValue * 10) / 10; // 四舍五入到一位小数
          }
          return shortValue.toString() + suffixes[suffixNum];
        },
      },
    },
  ],
  dataZoom: [
    {
      type: "inside",
      xAxisIndex: [0, 1],
      start: 0, //展示的数据范围，默认为50%-100%
      end: 100,
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: "slider",
      top: "90%",
      start: 0, //展示的数据范围
      end: 100,
    },
  ],
  series: [
    {
      name: chart.dayK,
      type: "candlestick",
      data: stockKData.map(item => item.list),
      itemStyle: {
        color: "#ff0033",
        color0: "#00da3c",
      },
    },
    {
      name: chart.dealNum,
      type: "bar",
      data: stockKData.map((item, index) => ({
        value: item.total_h,
        itemStyle: {
          color:
                index > 0 && item.list[1] < stockKData[index - 1].list[1]
                  ? "#00da3c"
                  : "#ff0033",
        },
      })),
      xAxisIndex: 1,
      yAxisIndex: 1,
    },
  ],
});

watch(stockKData, () => {
  // 当 stockKData 变化时，更新 option 对象的 series 数据
  option.xAxis[0].data = option.xAxis[1].data = stockKData.map(item => item.date);
  option.series[0].data = stockKData.map(item => item.list);
  option.series[1].data = stockKData.map((item, index) => ({
    value: item.total_h,
    itemStyle: {
      color:
            index > 0 && item.list[1] < stockKData[index - 1].list[1]
              ? "#00da3c"
              : "#ff0033",
    },
  }));
});
</script>

<style scoped>
.candlestickChart {
  width: 540px;
  height: 400px;
}
</style>
