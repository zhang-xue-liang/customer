const App = getApp();
import { areaList } from '@vant/area-data'

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
    areaList

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
    showArea() {
      this.setData({ show: true })
    },
    confirm(obj) {
      this.triggerEvent('areadata', {data: obj.detail.values})
      this.setData({ show: false })
    },
    onClose() {
      this.setData({ show: false })
    }
  }
})