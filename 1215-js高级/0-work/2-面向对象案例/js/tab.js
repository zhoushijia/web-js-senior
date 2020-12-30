document.addEventListener('DOMContentLoaded', function () {
  // 用来存储当前对象
  var that
  class Tab {
    //   所有的标签对象都是用的类中的对象属性来进行村粗,所以不存在作用域的问题
    constructor(id, liactive, conactive) {
      // 用来存储当前对象
      that = this
      //   接受tab栏传来的头部样式类
      this.liactive = liactive
      //   接受tab栏传来的内容部分样式类
      this.conactive = conactive
      this.main = document.querySelector(id)
      this.ul = this.main.children[0].children[0]
      this.tabscon = this.main.children[1]
      this.add = this.main.children[0].children[1]
      this.init()
    }
    //   初始化操作,每次进行增删操作后都必须进行初始化
    init() {
      // 更新元素对象
      this.lis = this.ul.children
      this.section = this.tabscon.children
      this.test = []
      this.del = []
      for (var i = 0; i < this.lis.length; i++) {
        this.test.push(this.lis[i].children[0])
        this.del.push(this.lis[i].children[1])
      }
      //   this.test = this.ul.querySelectorAll('li span:first-child')
      //   this.del = this.ul.querySelectorAll('li .icon-guanbi')
      //   注册监听事件
      this.add.addEventListener('click', this.addTab)
      for (var i = 0; i < this.lis.length; i++) {
        this.lis[i].setAttribute('data-index', i)
        this.lis[i].addEventListener('click', this.toggleTab)
        this.del[i].addEventListener('click', this.delTab)
        this.test[i].addEventListener('dblclick', this.editTab)
        this.section[i].addEventListener('dblclick', this.editTab)
      }
    }
    // 清除所有的样式
    clearCss() {
      // 排他
      for (var i = 0; i < that.lis.length; i++) {
        that.lis[i].classList.remove(that.liactive)
        that.section[i].classList.remove(that.conactive)
      }
    }
    // 切换
    toggleTab() {
      that.clearCss()
      var index = this.getAttribute('data-index')
      that.lis[index].classList.add(that.liactive)
      that.section[index].classList.add(that.conactive)
    }
    // 增加
    addTab() {
      that.clearCss()
      var li = `<li class=${that.liactive}><span>测试${that.lis.length + 1}</span><span class="iconfont icon-guanbi"></span></li>`
      var section = `<section class=${that.conactive}>测试${that.lis.length + 1}</section>`
      //   向子元素的最后添加字符串
      that.ul.insertAdjacentHTML('beforeend', li)
      that.tabscon.insertAdjacentHTML('beforeend', section)
      //   初始化操作 更新元素对象  重新注册监听事件
      that.init()
    }
    // 删除
    delTab(e) {
      // 防止删除的点击事件触发父元素点击事件造成角标越界而找不到元素
      e.stopPropagation()
      var index = this.parentNode.getAttribute('data-index')
      var classStr = this.parentNode.className
      this.parentNode.remove()
      that.section[index].remove()
      //   初始化操作 更新元素对象  重新注册监听事件
      that.init()
      //   当删除的是高亮元素,则将高亮给前一个元素
      if (classStr == that.liactive) {
        index--
        // 当高亮在第一个时,就++变成第一个
        if (index == -1) index++
        // 防止没有元素时,调用点击事件出错
        that.lis[index] && that.lis[index].click()
      }
    }
    // 编辑
    editTab() {
      var str = this.innerHTML
      // 双击禁止选定文字
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
      this.innerHTML = `<input type="text" value=${str}>`
      var input = this.children[0]
      //   点击后input中内容默认被选中
      input.select()
      //   防止input中双击 事件冒泡到父元素 导致双击事件的再次触发引起 报错
      input.addEventListener('dblclick', function (e) {
        e.stopPropagation()
      })
      input.addEventListener('blur', function () {
        this.parentNode.innerHTML = this.value
      })
      input.addEventListener('keydown', function (e) {
        if (e.key == 'Enter') this.blur()
      })
    }
  }
  //   传递大盒子id,和头部样式类,主题内容样式类
  new Tab('#tab', 'liactive', 'conactive')
})
