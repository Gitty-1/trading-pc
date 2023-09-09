<template>
  <UserAssets></UserAssets>
  <div id="stock">
    <StockItem></StockItem>
    <StockChart></StockChart>
    <FifthOrder></FifthOrder>
  </div>
</template>

<script lang="ts" setup>
import UserAssets from './stockMsg/UserAssets.vue'
import StockItem from './stockMsg/StockItem.vue'
import StockChart from './stockMsg/StockChart.vue'
import FifthOrder from './stockMsg/FifthOrder.vue'

</script>

<style scoped>
#stock {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  margin-bottom: 20px;
}
</style>
