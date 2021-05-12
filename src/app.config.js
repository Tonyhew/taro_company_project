export default {
  pages: [
    // tab导航 --Start--
    'pages/index/index',
    'pages/mine/mine',
    'pages/project/project',
    'pages/scoreMall/scoreMall',
    // tab导航 --End--

    // no data page
    'pages/activity/activity',

    // 
    'pages/service/detail',
    'pages/link/link',

    // 客户预约登记
    'pages/reservation/reservation',

    // 医生排班
    'pages/doctorSchedule/doctorSchedule',

    // 页面跳转（分包之后路径无法对应，需跳转定位）
    'pages/mall/mall',
    'pages/score/score',
    'pages/topic/topic',
    'pages/coupon/couponNew',
    'pages/address/address',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '掌上首尔丽格',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#858585",
    selectedColor: "#347be9",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        // 未点击时显示的图片
        iconPath: "image/icon/theme3_63.png",
        // 点击后显示的图片
        selectedIconPath: "image/icon/theme3_64.png"
      },
      {
        pagePath: "pages/project/project",
        text: "项目",
        iconPath: "image/icon/theme3_67.png",
        selectedIconPath: "image/icon/theme3_68.png"
      },
      {
        pagePath: "pages/scoreMall/scoreMall",
        text: "积分",
        iconPath: "image/icon/theme3_61.png",
        selectedIconPath: "image/icon/theme3_62.png"
      },
      {
        pagePath: "pages/mine/mine",
        text: "我的",
        iconPath: "image/icon/theme3_65.png",
        selectedIconPath: "image/icon/theme3_66.png"
      },
    ]
  },
  subPackages: [
    {
      "root": "pagePay/",
      "pages": [
        "payOrder/pay",
        "orderDetail/detail",
        "order/order",
        "accountAssets/aasets",
        "coupon/couponNewPage",
        "address/address",
        "address/edit_address",
      ]
    }, {
      "root": "topicComponent/",
      "pages": [
        "popular/popular",
        "topic/topic",
        "topic/reason",
        "topic/manifesto",
        "card/card",
        "card/info",
        "score/score"
      ]
    }
  ]
}
