<template>
    <el-dialog v-model="dialogVisible" :before-close="handleClick" id="dialog">
        <h1>StockAI选股</h1>
        <el-input v-model="message" :placeholder="placeHolder.searchMag">
            <template #append>
                <el-button :icon="Search" @click="handleSearch" />
            </template>
        </el-input>
        <div id="chart">
            折线图
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>

import bus from '@/bus'
import { ref } from 'vue'
import { Search } from '@element-plus/icons'
import { placeHolder, emitName } from '@/string';

const dialogVisible = ref(true)
function handleClick() {
  bus.emit(emitName.changeDialogVisible)
}

const message = ref('')
function handleSearch() {

}
</script>

<style scoped>
.dialog-footer {
    background-color: aqua;
}

h1 {
    margin: 50px;
    text-align: center
}
</style>
