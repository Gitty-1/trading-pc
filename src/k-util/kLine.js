import tztTechObjBase from './tztTechObjBase.js';
import tztStockType from './tztStockType.js';
import dataStream from './dataStream.js';

function setTNewPriceData(pTNewPriceData, NEWMARKETNO, structure, num) {
  // 分割报价数据
  var priceData = pTNewPriceData.split('|'),
    struct = {},
    // isZs      = tztStockType.MakeIndexMarket(NEWMARKETNO) || tztStockType.MakeBlockIndex(NEWMARKETNO),
    structure = structure || 'TNewPriceData',
    abase64 = tztTechObjBase.clearBase64[structure] || [],
    tztTech = tztTechObjBase[structure];
  for (var i = 0; i < priceData.length; i++) {
    var data = priceData[i],
      stream = null,
      TNewPriceData = tztTech[i],
      end = 0;

    if (!data || !TNewPriceData) {
      continue;
    }
    var lns = 0;
    // 进行解base64
    if (abase64.indexOf(i.toString()) < 0) {
      stream = dataStream.stringToBytes(window.atob(data));
      if (num && num > 0) {
        lns = num;
        struct = [];
      } else {
        lns = TNewPriceData.length;
      }
    } else {
      // 转成Bytes数组
      stream = data;
      lns = TNewPriceData.length;
    }

    // 循环定义好的结构体
    for (var t = 0; t < lns; t++) {
      var listPriceData = num ? TNewPriceData[0] : TNewPriceData[t];
      var isType = 0; // 0数字 1字符串 2是浮点数
      var addBkzs = 0;
      var addBkStart = 0;

      if ('type' in listPriceData) {
        isType = listPriceData.type;
        // delete listPriceData.type;
      }
      for (var x in listPriceData) {
        var start = end;
        if (x === 'type') {
          continue;
        }
        /*if(x === 'indexData' && !isZs){
                  continue;
                }
                if(x === 'StockData' && isZs && ('indexData' in listPriceData)){
                  continue;
                }*/
        if (x === 'StockData' || x === 'indexData') {
          addBkzs++;
          if (addBkzs == 1) {
            addBkStart = start;
          }
          if (addBkzs == 2) {
            end = addBkStart;
          }
          if (num) {
            struct[t] = {};
          } else {
            struct[x] = {};
          }
          for (var j = 0; j < listPriceData[x].length; j++) {
            var netlistPriceData = listPriceData[x][j];
            for (var k in netlistPriceData) {
              if (
                (t == 0 && k == 'isone') ||
                (t > 0 && 'isone' in netlistPriceData)
              ) {
                continue;
              }
              var start = end;
              end = start + parseInt(netlistPriceData[k]);
              if (num && num > 0) {
                struct[t][k] = dataStream.readint(stream.slice(start, end));
              } else {
                struct[x][k] = dataStream.readint(stream.slice(start, end));
              }
            }
          }
          continue;
        } else {
          end = start + parseInt(listPriceData[x]);
          if (isType === 0) {
            if (listPriceData[x] === 1) {
              struct[x] = stream[start];
              continue;
            }
            struct[x] = dataStream.readint(stream.slice(start, end));
          } else if (isType === 2) {
            struct[x] = dataStream.getFloat(stream.slice(start, end));
          } else {
            if (abase64.indexOf(i.toString()) > -1) {
              struct[x] = stream;
            } else {
              struct[x] = dataStream.bin2String(stream.slice(start, end));
            }
          }
        }
      }
    }
  }
  //  console.log(struct,1);
  return struct;
}

function getHeadData(pTNewPriceData, NEWMARKETNO) {
  var struct = setTNewPriceData(pTNewPriceData, NEWMARKETNO, 'TkLineHead');
  var unit = Math.pow(10, struct.Units || 0);
  var pot = struct.total_size || 0;
  var obj = {
    StockName: struct.StockName, // 股票名称
    HighPrice: struct.HighPrice, // 最高util.toDecimal2(struct.HighPrice/unit,pot)
    LowPrice: struct.LowPrice, // 最低util.toDecimal2(struct.LowPrice/unit,pot)
    WeekUp: toDecimal2(struct.WeekUp / 100, pot) + '%', // 周涨幅
    MonthUp: toDecimal2(struct.MonthUp / 100, pot) + '%', // 月涨幅
    Units: struct.Units, // 单位
    WFSY: struct.WFSY, // 万份收益，单位元
    QRNH: toDecimal2(struct.QRNH / 100000, pot) + '%', // 七日年华收益率
    m: struct.m, // 流通盘
    total_size: struct.total_size, // 小数点位数
  };
  return obj;
}

function getData(pTNewPriceData, NEWMARKETNO, num = 10) {
  var struct = setTNewPriceData(pTNewPriceData, NEWMARKETNO, 'TkLineData', num);
  return struct;
}

function toDecimal2(x, pos) {
  pos = pos || 0;
  var f = parseFloat(x);
  if (isNaN(f)) {
    return x;
  }
  var f = Math.round(x * Math.pow(10, pos)) / Math.pow(10, pos);
  var s = f.toString();
  var rs = s.indexOf('.');

  if (pos) {
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
  }
  while (s.length <= rs + pos) {
    s += '0';
  }

  if (rs > -1 && s.split('.')[1].length > pos) {
    s = Number(s).toFixed(pos);
  }
  return s;
}

function stringToByte(str) {
  var bytes = [];
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0);
      bytes.push(((c >> 12) & 0x3f) | 0x80);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0);
      bytes.push((c & 0x3f) | 0x80);
    } else {
      bytes.push(c & 0xff);
    }
  }
  return bytes;
}

function byteToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  var str = '',
    _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

export {
  getHeadData,
  getData,
}
