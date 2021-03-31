export default {
  pages: [
    'pages/index/index',
    'pages/mine/mine',
    'pages/project/project',
    'pages/scoreMall/scoreMall',
    'pages/score/score',
    'pages/service/detail',
    'pages/card/card',
    'pages/card/info',
    'pages/link/link',
    'pages/popular/popular',
    'pages/topic/topic',
    'pages/topic/reason',
    'pages/topic/manifesto',
    'pages/reservation/reservation',
    'pages/doctorSchedule/doctorSchedule',
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
      "root": "pages/pagePay/",
      "pages": [
        "payOrder/pay",
        "orderDetail/detail",
        "order/order",
        "accountAssets/aasets"
      ]
    }
  ]
}
