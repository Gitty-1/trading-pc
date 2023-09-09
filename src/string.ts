
// 枚举stockList列表名字的英文
export enum stockListEng {
    stockName = 'stockName',
    stockCode = 'stockCode',
    positionNum = 'positionNum',
    availableSellNum = 'availableSellNum',
    operation = 'operation',
    entrustPrice = 'entrustPrice',
    entrustNum = 'entrustNum',
    dealNum = 'dealNum',
    status = 'status',
    operationTime = 'operationTime',
    entrustID = 'entrustID',
    dealPrice = 'dealPrice',
    dealTime = 'dealTime',
    dealID = 'dealID',
    stopFlag = 'stockSuspensionSign',
    
}

// 枚举stockList列表名字
export enum stockList {
    stockName = '证券名称',
    stockCode = '证券代码',
    positionNum = '持仓数量',
    availableSellNum = '可卖数量',
    operation = '操作',
    entrustPrice = '委托价格($HKD)',
    entrustNum = '委托数量',
    dealNum = '成交数量',
    status = '状态',
    operationTime = '操作时间',
    entrustID = '委托编号',
    dealPrice = '成交价格($HKD)',
    dealTime = '成交时间',
    dealID = '成交编号',
    stopFlag = '停牌标志'
}

// 枚举五档行情列表的英文
export enum fifthList {
    fifth = 'fifth',
    price = 'price',
    dealNum = 'dealNum'
}

// 枚举输入框的提示信息
export enum placeHolder {
    startDate = '请选择起始日期',
    endDate = '请选择终止日期',
    inputCode = '请输入股票代码',
    inputStockName = '请输入股票名称',
    username = '请输入用户名',
    password = '请输入密码',
    newUsername = '请输入新用户名',
    oldPasword = '请输入原密码',
    newPassword = '请输入新密码',
    newPasswordAgain = '请再次输入密码',
    searchMag = '请输入查询信息'
}

// 枚举订单的状态
export enum orderStatus {
    unDeal = '未成交',
    dealed = '已成交',
    chargeBacks = '已撤单'
}

// 枚举订单的交易类型
export enum orderOperation {
    buy = '买入',
    sell = '卖出'
}

// 枚举弹窗的提示信息
export enum alertText {
    warningBuyNum = '买入数量不能为0',
    wariningBuyPrice = '买入价格不能为0',
    wariningSellNum = '卖出数量不能为0',
    wariningSellPrice = '卖出价格不能为0',
    successTrade = '交易成功',
    operationCancel = '操作取消',
    lengthExceed = '密码长度超出限制',
    twicePasswordWrong = '两次输入的密码不一致',
    successChange = '修改成功',
    successRegister = '注册成功',
    hasSearch = '已查询到相关股票',
    hasnotSearch = '未查询到相关股票',
    emptyInput = '输入不能为空',
    successCancel = '撤单成功',
    networkWrong = '网络错误',
    confirmCancel = '确定撤单吗',
    dateWrong = '日期错误'
}

// 枚举弹窗的类型
export enum alertStatus {
    success = 'success',
    info = 'info',
    warning = 'warning',
    error = 'error'
}

// 枚举bus绑定事件的名称
export enum emitName {

    // 弹窗相关
    tradingRouteAlert = 'sendAlertMsgOnTrade',
    userRouteAlert = 'sendAlertMsgOnUser',
    updateUserRouteAlert = 'sendAlertMsgOnUpdateUser',

    // ai选股事件
    showAIDialog = 'ShowAIDialog',
    changeDialogVisible = 'ChangeDialogVisible',

    // 用户资产相关
    sendAccountMsgToItem = 'sendAccountMsgToItem',
    changeAccountAssert = 'changeAccountAssert',

    // 五档行情相关
    sendFifthOrder = 'sendFifthOrder',

    // k线图相关
    sendCodeToChart = 'sendCodeToChart',

    // 
}

// 枚举k线图的toolTip信息
export enum chart {
    openPrice = '开盘价：',
    closePrice = '收盘价：',
    lowestPrice = '最低价：',
    higestPrice = '最高价：',
    dayK = '日K',
    dealNum = '成交量'
}

// 枚举操作
export enum operation {
    search = '查询'
}



