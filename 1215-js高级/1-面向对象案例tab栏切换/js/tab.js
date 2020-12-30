window.addEventListener('load', function () {
  // 用来存当前对象
  var that
  class Tab {
    constructor(id) {
      // 将匿名对象赋值给that
      that = this
      //   将标签tab对象赋值给匿名对象的main属性
      this.main = document.querySelector(id)
      this.ul = this.main.children[0].children[0]
      this.plus = this.main.children[0].children[1]
      this.tabscon = this.main.children[1]
      //   初始化
      this.init()
    }

    updateEle() {
      // 这里直接将标签元素存储到对象的属性中,不用考虑变量的作用域问题
      this.lis = this.ul.children
      this.hd = this.main.querySelectorAll('.fisrstnav li span:first-child')
      this.del = this.main.querySelectorAll('.icon-guanbi')
      this.con = this.tabscon.children
    }
    init() {
      // 更新元素对象
      this.updateEle()
      // 注册增删改查点击事件
      this.plus.addEventListener('click', this.addTab)
      for (var i = 0; i < this.lis.length; i++) {
        this.lis[i].setAttribute('data-index', i)
        this.lis[i].addEventListener('click', this.toggleTab)
        this.del[i].addEventListener('click', this.delTab)
        this.hd[i].addEventListener('dblclick', this.editTab)
        this.con[i].addEventListener('dblclick', this.editTab)
      }
    }

    // 点击时切换
    toggleTab() {
      // 这里的this指的是触发事件的对象
      var index = this.getAttribute('data-index')
      // 得用当前的对象调用方法
      that.clearCss()
      that.lis[index].classList.add('liactive')
      that.con[index].classList.add('conactive')
    }

    // 清除所有样式
    clearCss() {
      for (var i = 0; i < this.lis.length; i++) {
        this.lis[i].classList.remove('liactive')
        this.con[i].classList.remove('conactive')
      }
    }

    // 增加
    addTab() {
      that.clearCss()
      var li = `<li class="liactive"><span>测试${that.lis.length + 1}</span><span class="iconfont icon-guanbi"></span></li>`
      var conSection = `<section class="conactive">测试${that.lis.length + 1}</section>`
      // 向ul中的后面添加li，注意里面有两个参数
      that.ul.insertAdjacentHTML('beforeend', li)
      that.tabscon.insertAdjacentHTML('beforeend', conSection)
      // 进行增加操作后要重新刷新数据  给所有的li重新注册点击事件
      that.init()
    }

    // 删除
    delTab(e) {
      // 需要阻止默认行为 否则事件冒泡，会触发li点击 角标越界错误导致找不到元素对象
      // tab.js:39 Uncaught TypeError: Cannot read property 'classList' of undefined at HTMLLIElement.toggleTab (tab.js:39)
      e.stopPropagation()
      if (confirm('确认要删除吗?')) {
        var index = this.parentNode.getAttribute('data-index')
        var classStr = that.lis[index].className
        that.lis[index].remove()
        that.con[index].remove()
        // 进行删除操作后要重新刷新数据  给所有的li重新注册点击事件
        that.init()
        // 如果存在高亮,则中断
        // if (querySelector('.liactive')) return
        // 判断删除项li是否为高亮，如果是，则让被删除的前一个元素高亮
        if (classStr == 'liactive') {
          index--
          if (index == -1) index++
          // 防止索引为-1时,报错
          that.lis[index] && that.lis[index].click()
        }
      }
    }
    // 编辑
    editTab() {
      var str = this.innerHTML
      // 双击禁止选定文字
      // window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
      // 点击时内容区添加input框,可以输入
      this.innerHTML = `<input type="text" value=${str}>`
      // input 中的文字处于被选定的状态
      this.children[0].select()
      this.children[0].addEventListener('dblclick', function (e) {
        // 防止事件冒泡触发父元素的双击事件
        // Uncaught DOMException: Failed to set the 'innerHTML' property on 'Element': The node to be removed is no longer a child of this node. Perhaps it was moved in a 'blur' event handler?
        e.stopPropagation()
      })
      this.children[0].addEventListener('blur', function (e) {
        // 输入完成后内容区删除input框
        this.parentNode.innerHTML = this.value
      })
      this.children[0].addEventListener('keydown', function (e) {
        if (e.key == 'Enter') this.blur()
      })
    }
  }

  new Tab('#tab')
})
