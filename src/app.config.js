export default {
  pages: [
    'pages/index/index', 
    'pages/project/project',
    'pages/scores/scores',
    'pages/mine/mine',
    'pages/service/detail',
    'pages/card/card',
    'pages/card/info',
    'pages/link/link',
    'pages/popular/popular',
    'pages/topic/topic',
    'pages/reservation/reservation',
    'pages/order/order',
    'pages/order/detail',
    'pages/payOrder/pay',
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
        iconPath: "Images/icon/theme3_63.png",
        // 点击后显示的图片
        selectedIconPath: "Images/icon/theme3_64.png"
      },
      {
        pagePath: "pages/project/project",
        text: "项目",
        iconPath: "Images/icon/theme3_67.png",
        selectedIconPath: "Images/icon/theme3_68.png"
      },
      {
        pagePath: "pages/scores/scores",
        text: "积分",
        iconPath: "Images/icon/theme3_61.png",
        selectedIconPath: "Images/icon/theme3_62.png"
      },
      {
        pagePath: "pages/mine/mine",
        text: "我的",
        iconPath: "Images/icon/theme3_65.png",
        selectedIconPath: "Images/icon/theme3_66.png"
      },
    ]
  }
}
