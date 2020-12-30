window.onload = function () {
  
  // 轮播图
  // 功能分析：
  // 1 鼠标移入focus 显示 向左 向右箭头 移出时隐藏
  // 2 动态生成小圆点，且点击时 高亮相应切换
  // 3 点击小圆点时 能切换到对应轮播图
  // 4 点击向左 向右箭头  会分别切换到 上一张、下一张
  // 5 点击向左向右时，小圆点也会相应切换，且点击向左向右和点击小圆点 能互相关联
  // 6 自动播放(代码模拟 播放 下一张)
  // 7 鼠标移入focus，停止自动播放 鼠标移出focus后，轮播图自动播放

  // write your code here ...
  // 动画函数
  function animate(obj, target, callback) {
    //   保证点击后只有一个定时器在运行，防止多次点击，浪费内存资源
    clearInterval(obj.timer)
    // 以obj.timer来存储,保证定时器的唯一性
    obj.timer = setInterval(function () {
      var step = (target - obj.offsetLeft) / 10
      step = step > 0 ? Math.ceil(step) : Math.floor(step)
      if (obj.offsetLeft === target) {
        // console.log('清除了定时器')
        callback && callback()
        return clearInterval(obj.timer)
      }
      obj.style.left = obj.offsetLeft + step + 'px'
    }, 15)
  }
  // 轮播图
  var focus = document.querySelector('.focus')
  var ulLis = document.querySelectorAll('.focus ul > li')
  var ul = document.querySelector('.focus ul')
  var ol = document.querySelector('.focus ol')
  var arr_l = document.querySelector('.arrow-l')
  var arr_r = document.querySelector('.arrow-r')
  var focusWidth = focus.offsetWidth
  var timer
  // 2 动态生成小圆点，且点击时 高亮相应切换
  //   ol获取ul中
  for (var i = 0; i < ulLis.length; i++) {
    var liNode = document.createElement('li')
    ol.appendChild(liNode)
    if (i == 0) liNode.className = 'current'
  }
  // 3 点击小圆点时 能切换到对应轮播图
  //   给ol注册点击事件
  var olLis = ol.children
  for (var i = 0; i < olLis.length; i++) {
    olLis[i].setAttribute('data-index', i)
    olLis[i].addEventListener('click', function () {
      for (var j = 0; j < olLis.length; j++) {
        olLis[j].className = ''
      }
      var index = this.getAttribute('data-index')
      num = index
      count = index
      olLis[index].className = 'current'
      animate(ul, -index * focusWidth)
    })
  }
  // 1 鼠标移入focus 显示 向左 向右箭头 移出时隐藏
  // 7 鼠标移入focus，停止自动播放 鼠标移出focus后，轮播图自动播放
  // 鼠标移动到盒子上，箭头显示出来
  focus.addEventListener('mouseenter', function () {
    arr_l.style.display = 'block'
    arr_r.style.display = 'block'
    // 鼠标移动到盒子上，停止播放
    clearInterval(timer)
  })
  // 鼠标移出盒子外，箭头隐藏
  focus.addEventListener('mouseleave', function () {
    arr_l.style.display = 'none'
    arr_r.style.display = 'none'
    // 鼠标移出盒子外，继续播放
    timer = setInterval(function () {
      arr_r.click()
    }, 2000)
  })
  // num用来记录ul中图片且换
  // 4 点击向左 向右箭头  会分别切换到 上一张、下一张
  var num = 0
  var count = 0
  //   节流阀标记
  var flag = true
  ul.appendChild(ulLis[0].cloneNode(true))
  arr_r.addEventListener('click', function () {
    //   节流
    if (flag) {
      flag = false
      //   当切换到第一张时，回到头部
      if (num >= ul.children.length - 1) {
        num = 0
        ul.style.left = 0
      }
      num++
      // 每次点击图片移动距离
      animate(ul, -num * focusWidth, function () {
        //   回调函数节流
        flag = true
      })
      // 当count为3的时候会进else循环count++变4
      if (count >= olLis.length - 1) {
        count = 0
      } else {
        count++
      }
      // console.log(count)
      for (var i = 0; i < olLis.length; i++) {
        olLis[i].className = ''
      }
      olLis[count].className = 'current'
    }
  })

  arr_l.addEventListener('click', function () {
    if (flag) {
      flag = false
      //   当左切时，回到尾部
      if (num <= 0) {
        num = ul.children.length - 1
        ul.style.left = -num * focusWidth + 'px'
      }
      num--
      // 每次点击图片移动距离
      animate(ul, -num * focusWidth, function () {
        flag = true
      })
      // 当count为3的时候会进else循环count++变4
      if (count <= 0) {
        count = olLis.length - 1
      } else {
        count--
      }
      for (var i = 0; i < olLis.length; i++) {
        olLis[i].className = ''
      }
      olLis[count].className = 'current'
    }
  })

  // 6 自动播放(代码模拟 播放 下一张)
  //   自动播放功能
  timer = setInterval(function () {
    //   新增方法
    arr_r.click()
  }, 2000)

  // 循环输出服务
  // 数据：
  var services = [
    { title: '话费', styleClass: 'service_ico_huafei', bargin: false },
    { title: '机票', styleClass: 'service_ico_feiji', bargin: true },
    { title: '影票', styleClass: 'service_ico_movie', bargin: false },
    { title: '充电', styleClass: 'service_ico_charge', bargin: false },
    { title: '彩票', styleClass: 'service_ico_lottery', bargin: false },
    { title: '加油', styleClass: 'service_ico_oil', bargin: false },
    { title: '礼物', styleClass: 'service_ico_gift', bargin: false },
    { title: '文案', styleClass: 'service_ico_write', bargin: false },
    { title: '酒店', styleClass: 'service_ico_hotel', bargin: false },
    { title: '高铁', styleClass: 'service_ico_rail', bargin: false },
    { title: '缴费', styleClass: 'service_ico_pay', bargin: false },
    { title: '理财', styleClass: 'service_ico_invest', bargin: false }
  ]

  // 将以上数据渲染到lifeservice 模块中
  // write your code here ...
  var str = ``
  for (var i = 0; i < services.length; i++) {
    str += `<li>
    <a href="#">
      <i class="service_ico ${services[i]['styleClass']}"></i>
      <p>${services[i]['title']}</p>
    </a>
    <span class="${services[i]['bargin']}"></span>
  </li>`
  }
  var lifeservice = document.querySelector('.lifeservice')
  lifeservice.children[0].innerHTML = str

  // 搜索框自动获取焦点
  // 1 监听键盘事件
  // 2 按下s键时让搜索框得到焦点
  var searchIpt = document.querySelector('.search .text')
  document.addEventListener('keyup', function (e) {
    console.dir(e)
    if (e.keyCode == 83) {
      searchIpt.focus()
    }
  })
}
