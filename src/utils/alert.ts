import ElMessage from "element-plus/lib/components/message/index.js"


const Alert = function(alertMsg : string, alertType : string) {
  ElMessage({
    showClose: true,
    message: alertMsg,
    type: alertType,
  })
}

export default Alert
