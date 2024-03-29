// 转换时间
const getDate = (year, month, day, hour, minute) => {
  const newyear = year.substr(0, year.length - 1);
  const setmonth = month.substr(0, month.length - 1);
  const newmonth = setmonth < 10 ? '0' + setmonth : setmonth;
  const setday = day.substr(0, day.length - 1);
  const newday = setday < 10 ? '0' + setday : setday;

  // const sethour = hour.substr(0, hour.length - 1);
  const newhour = hour < 10 ? '0' + hour : hour;
  // const setminute = minute.substr(0, minute.length - 1);

  const newminute = minute < 10 ? '0' + minute : minute;

  return newyear + '-' + newmonth + '-' + newday + ' ' + newhour + ":" + newminute;
}
// 将时间戳转换为时间
const getobjDate = (date) => {
  let now;
  if (date) {
    now = new Date(date)
  } else {
    now = new Date()
  }
  let y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate(),
    h = now.getHours(), //获取当前小时数(0-23)
    f = now.getMinutes(),

    n = (Math.ceil((now.getMinutes()) / 10)) * 10; //获取当前分钟数(0-59)  取整数
  return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + (h < 10 ? "0" + h : h) + ":" + (f < 10 ? "0" + f : f);

}

//根据年月  获取天数
const mGetDate = (year, month) => {
  var d = new Date(year, month, 0);
  return d.getDate();
}
//根据时间2019-01-02 09：12  得到 ['2019','1','2','9','12']
const getarrWithtime = (str) => {
  let arr = [];
  let arr1 = str.split(' ');
  let arr2 = (arr1[0]).split('-');
  let arr3 = arr1[1].split(':');
  arr = arr2.concat(arr3);
  arr[1] = arr[1].startsWith('0') ? arr[1].substr(1, arr[1].length) : arr[1];
  arr[2] = arr[2].startsWith('0') ? arr[2].substr(1, arr[2].length) : arr[2];
  arr[3] = arr[3].startsWith('0') ? arr[3].substr(1, arr[3].length) : arr[3];
  arr[4] = arr[4].startsWith('0') ? arr[4].substr(1, arr[4].length) : arr[4];
  return arr;
}

const getDateInfo = (format, timestamp) => {
  var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
  var pad = function (n, c) {
    if ((n = n + "").length < c) {
      return new Array(++c - n.length).join("0") + n;
    } else {
      return n;
    }
  };
  var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var txt_ordin = { 1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st" };
  var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var f = {
    // Day 
    d: function () { return pad(f.j(), 2) },
    D: function () { return f.l().substr(0, 3) },
    j: function () { return jsdate.getDate() },
    l: function () { return txt_weekdays[f.w()] },
    N: function () { return f.w() + 1 },
    S: function () { return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th' },
    w: function () { return jsdate.getDay() },
    z: function () { return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0 },

    // Week 
    W: function () {
      var a = f.z(), b = 364 + f.L() - a;
      var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
      if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
        return 1;
      } else {
        if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
          nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
          return date("W", Math.round(nd2.getTime() / 1000));
        } else {
          return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
        }
      }
    },

    // Month 
    F: function () { return txt_months[f.n()] },
    m: function () { return pad(f.n(), 2) },
    M: function () { return f.F().substr(0, 3) },
    n: function () { return jsdate.getMonth() + 1 },
    t: function () {
      var n;
      if ((n = jsdate.getMonth() + 1) == 2) {
        return 28 + f.L();
      } else {
        if (n & 1 && n < 8 || !(n & 1) && n > 7) {
          return 31;
        } else {
          return 30;
        }
      }
    },

    // Year 
    L: function () { var y = f.Y(); return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0 },
    //o not supported yet 
    Y: function () { return jsdate.getFullYear() },
    y: function () { return (jsdate.getFullYear() + "").slice(2) },

    // Time 
    a: function () { return jsdate.getHours() > 11 ? "pm" : "am" },
    A: function () { return f.a().toUpperCase() },
    B: function () {
      // peter paul koch: 
      var off = (jsdate.getTimezoneOffset() + 60) * 60;
      var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
      var beat = Math.floor(theSeconds / 86.4);
      if (beat > 1000) beat -= 1000;
      if (beat < 0) beat += 1000;
      if ((String(beat)).length == 1) beat = "00" + beat;
      if ((String(beat)).length == 2) beat = "0" + beat;
      return beat;
    },
    g: function () { return jsdate.getHours() % 12 || 12 },
    G: function () { return jsdate.getHours() },
    h: function () { return pad(f.g(), 2) },
    H: function () { return pad(jsdate.getHours(), 2) },
    i: function () { return pad(jsdate.getMinutes(), 2) },
    s: function () { return pad(jsdate.getSeconds(), 2) },
    //u not supported yet 

    // Timezone 
    //e not supported yet 
    //I not supported yet 
    O: function () {
      var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
      if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
      return t;
    },
    P: function () { var O = f.O(); return (O.substr(0, 3) + ":" + O.substr(3, 2)) },
    //T not supported yet 
    //Z not supported yet 

    // Full Date/Time 
    c: function () { return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P() },
    //r not supported yet 
    U: function () { return Math.round(jsdate.getTime() / 1000) }
  };

  let ret
  return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
    if (t != s) {
      // escaped 
      ret = s;
    } else if (f[s]) {
      // a date function exists 
      ret = f[s]();
    } else {
      // nothing special 
      ret = s;
    }
    return ret;
  });
}


module.exports = {
  getDate,
  getobjDate,
  mGetDate,
  getarrWithtime,
  getDateInfo
}