const App = getApp();

Component({
  /**
   * 组件的对外属性，是属性名到属性设置的映射表
   */
  properties: {
    type:{
      type: String,
      value: ''
    }  
  },

  /**
   * 组件的内部数据，和 properties 一同用于组件的模板渲染
   */
  data: {
    show: false,
    statusId: '1',
    timeId: '1',
    typeId: '1',
    statusList: [
      {id: 1, name:'全部'},
      {id: 2, name:'待接受'},
      {id: 3, name:'已接受'},
      {id: 4, name:'进行中'},
      {id: 5, name:'已完成'}
    ],
    timeList: [
      {id: 1, name:'全部'},
      {id: 2, name:'今日'},
      {id: 3, name:'本周'},
      {id: 4, name:'本月'},
      {id: 5, name:'超出计划时间'}
    ],
    typeList: [
      {id: 1, name:'全部'},
      {id: 2, name:'安装'},
      {id: 3, name:'维修'}
    ]
  },
  // 组件数据字段监听器，用于监听 properties 和 data 的变化
  observers: {
   
  },
  /**
 * 组件挂载后执行
 */
  ready: function () {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 展示弹出层
    showPop() {
      this.setData({ show: true })
    },
    // 点击重置
    reSet() {
      this.setData({ statusId: '1'})
      this.setData({ timeId: '1'})
      this.setData({ typeId: '1'})
    },
    // 点击确定
    confirm(obj) {
      this.triggerEvent('areadata', {data: obj.detail.values})
      this.setData({ show: false })
    },
    // 关闭弹出层
    onClose() {
      this.setData({ show: false })
    },
    // 改变状态
    changeStatus(e) {
      this.setData({ statusId: e.currentTarget.dataset.id})
    },
    // 改变计划时间
    changeItem(e) {
      this.setData({ timeId: e.currentTarget.dataset.id})
    },
    // 改变类型
    changeType(e) {
      this.setData({ typeId: e.currentTarget.dataset.id})
    },
    // 跳转更多筛选
    toSearch() {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    }
  }
})