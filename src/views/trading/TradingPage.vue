<template>
  <div id="trade">
    <TradingHeader></TradingHeader>
    <Stock></Stock>
    <List></List>
    <AISelectStock v-if="dialogVisible"></AISelectStock>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TradingHeader from './TradingHeader.vue'
import Stock from './StockRelated.vue'
import List from './OrderList.vue'
import AISelectStock from './stockMsg/aiSelectStock/AISelectStock.vue'
import bus from '@/bus'
import { emitName } from '@/string'


// 控制ai选股页面的显示
const dialogVisible = ref(false)
bus.on(emitName.showAIDialog, () => {
  dialogVisible.value = true
})
bus.on(emitName.changeDialogVisible, () => {
  dialogVisible.value = false
})
</script>

<style scoped>
#trade {
  margin-bottom: 20px;
}
</style>
