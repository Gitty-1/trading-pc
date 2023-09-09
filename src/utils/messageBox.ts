import { ElMessageBox } from "element-plus/lib/components/index.js";
import Alert from "./alert";
import { alertStatus, alertText } from "@/string";

const messageBox = function(message: string, functionCall: any) {
  ElMessageBox.confirm(message, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "success",
    center: true,
    dangerouslyUseHTMLString: true,
  })
    .then(() => {
      functionCall()
    })
    .catch(() => {
      Alert(alertText.operationCancel, alertStatus.info)
    });
}

export default messageBox
