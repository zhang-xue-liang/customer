//index.js
//获取应用实例
const app = getApp()

Component({
  // properties: {
  //   tab_data: {
  //     type: Array,
  //     value: ''
  //   }
  // },
  data: {
    tab_data: [
      {id: 1, name: '全部'},
      {id: 2, name: '待接受'},
      {id: 3, name: '已接受'},
      {id: 4, name: '进行中'},
      {id: 5, name: '已完成'},
    ],
    currentTab:0,
    navScrollLeft: 0
  },
  observers: {

  },
  ready: function(){
  },
  methods: {
    switchNav(event) {
      //console.log(event.currentTarget.dataset['id'])
      var cur = event.currentTarget.dataset.current;
      var singleNavWidth = this.data.windowWidth / 4;
      //console.log(cur,singleNavWidth) 
      this.triggerEvent('changeTab', event.currentTarget.dataset['id'])                          
      this.setData({
        navScrollLeft: (cur - 1) * singleNavWidth
      })
      if (this.data.currentTab == cur) {
        return false;
      } else {
        this.setData({
          currentTab: cur
        })
      }
    },
    showScreening() {
      this.triggerEvent('showScreening')
    }
  }
})