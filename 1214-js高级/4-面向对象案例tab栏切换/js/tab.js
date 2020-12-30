window.addEventListener('load', function () {
  // 用来存当前对象
  var that
  class Tab {
    constructor(id) {
      // 将匿名对象赋值给that
      that = this
      //   将标签tab对象赋值给匿名对象的main属性
      this.main = document.querySelector(id)
      this.ul = this.main.querySelector('.fisrstnav ul')
      this.plus = this.main.querySelector('.tabadd')
      this.tabscon = this.main.querySelector('.tabscon')
      //   初始化
      this.init()
    }

    updateEle() {
      // 这里直接将标签元素存储到对象的属性中,不用考虑变量的作用域问题
      this.lis = this.ul.children
      this.hd = this.main.querySelectorAll('.fisrstnav li:first-child')
      this.del = this.main.querySelectorAll('.icon-guanbi')
      this.con = this.tabscon.children
    }
    init() {
      this.updateEle()
      for (var i = 0; i < this.lis.length; i++) {
        this.lis[i].addEventListener('click', this.toggleC)
      }
    }
    // 点击时切换
    toggleC() {
      for (var i = 0; i < that.lis.length; i++) {
        that.lis[i].classList.remove('liactive')
        that.con[i].classList.remove('conactive')
      }
      that.lis[that.index].classList.add('liactive')
      that.con[that.index].classList.add('conactive')
    }
  }

  new Tab('#tab')
})
