window.onload = function () {
  // 放大镜

  // 1 获取元素
  // write your code here ...
  var preview = document.querySelector('.preview_img')
  var mask = document.querySelector('.mask')
  var big = document.querySelector('.big')
  var bigImg = document.querySelector('.bigImg')

  // 2 鼠标滑过放大镜下方缩略图，切换图片(改变src)
  // write your code here ...
  var ulLis = document.querySelectorAll('.list_item li')
  for (var i = 0; i < ulLis.length; i++) {
    ulLis[i].setAttribute('data-index', i + 1)
    ulLis[i].addEventListener('mouseenter', function () {
      for (var j = 0; j < ulLis.length; j++) {
        ulLis[j].className = ''
      }
      this.className = 'current'
      preview.children[0].src = 'upload/s' + this.getAttribute('data-index') + '.jpg'
      bigImg.src = 'upload/b' + this.getAttribute('data-index') + '.jpg'
    })
  }
  // 3 定义关键参数变量:滑块宽高、滑块能移动的最大距离、大图能移动的最大距离
  // 4 鼠标移入box时滑块及大图,并计算关键参数,移出时隐藏
  // 5 移动光标,相应移动mask,但不能超过上述最大距离
  // write your code here ...
  preview.addEventListener('mouseenter', function () {
    mask.style.display = 'block'
    big.style.display = 'block'
  })
  preview.addEventListener('mousemove', function (e) {
    var maskWidth = mask.offsetWidth
    var maskHeight = mask.offsetHeight
    var deltaX = preview.offsetWidth - maskWidth
    var deltaY = preview.offsetHeight - maskHeight
    var y = e.pageY - preview.offsetTop - maskHeight / 2
    var x = e.pageX - preview.offsetLeft - maskWidth / 2
    if (x < 0) {
      x = 0
    }
    if (x > deltaX) {
      x = deltaX
    }
    if (y < 0) {
      y = 0
    }
    if (y > deltaY) {
      y = deltaY
    }
    mask.style.left = x + 'px'
    mask.style.top = y + 'px'
    var bigWidth = big.offsetWidth - bigImg.offsetWidth
    var bigHeight = big.offsetHeight - bigImg.offsetHeight
    bigImg.style.left = (x * bigWidth) / deltaX + 'px'
    bigImg.style.top = (y * bigHeight) / deltaY + 'px'
  })

  preview.addEventListener('mouseleave', function () {
    mask.style.display = 'none'
    big.style.display = 'none'
  })

  //选项卡 含 左侧 及下方 两个
  // write your code here ...
  // 有多个选项卡选择，封装成函数，避免代码多次重复
  function select(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
      arr1[i].setAttribute('data-index', i)
      arr1[i].addEventListener('click', function () {
        for (var j = 0; j < arr2.length; j++) {
          var a1 = arr2[j].className.split(' ')
          arr2[j].className = a1[0]
          arr2[j].style.display = 'none'
          var a = arr1[j].className.split(' ')
          arr1[j].className = a[0]
        }
        this.className = this.className + ' current'
        arr2[this.getAttribute('data-index')].style.display = 'block'
        arr2[this.getAttribute('data-index')].className = arr2[this.getAttribute('data-index')].className + ' current'
      })
    }
  }
  var firstTabLis = document.querySelectorAll('.tab_list ul li')
  var tabConUls = document.querySelectorAll('.tab_con ul')
  select(firstTabLis, tabConUls)
  // for (var i = 0; i < firstTabLis.length; i++) {
  //   firstTabLis[i].setAttribute('data-index', i)
  //   firstTabLis[i].addEventListener('click', function () {
  //     for (var j = 0; j < tabConUls.length; j++) {
  //       var arr1 = tabConUls[j].className.split(' ')
  //       tabConUls[j].className = arr1[0]
  //       tabConUls[j].style.display = 'none'
  //       var arr = firstTabLis[j].className.split(' ')
  //       firstTabLis[j].className = arr[0]
  //     }
  //     this.className = this.className + ' current'
  //     tabConUls[this.getAttribute('data-index')].style.display = 'block'
  //     tabConUls[this.getAttribute('data-index')].className = tabConUls[this.getAttribute('data-index')].className + ' current'
  //   })
  // }
  var detail_tab_list_lis = document.querySelectorAll('.detail_tab_list ul li')
  var detail_tab_con_divs = document.querySelectorAll('.detail_tab_con div')
  select(detail_tab_list_lis, detail_tab_con_divs)

  // 选择 商品参数 增加高亮样式
  // write your code here ...
  // 由于三个选择一样，直接封装一个函数，进行排他选择
  function choose(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener('click', function () {
        for (var j = 0; j < arr.length; j++) {
          arr[j].className = ''
        }
        this.className = 'current'
      })
    }
  }
  var chooseColor = document.querySelectorAll('.choose_color dd a')
  choose(chooseColor)
  //   for (var i = 0; i < chooseColor.length; i++) {
  //     chooseColor[i].addEventListener('click', function () {
  //       for (var j = 0; j < chooseColor.length; j++) {
  //         chooseColor[j].className = ''
  //       }
  //       this.className = 'current'
  //     })
  //   }
  var chooseVersion = document.querySelectorAll('.choose_version dd a')
  choose(chooseVersion)
  //   for (var i = 0; i < chooseVersion.length; i++) {
  //     chooseVersion[i].addEventListener('click', function () {
  //       for (var j = 0; j < chooseVersion.length; j++) {
  //         chooseVersion[j].className = ''
  //       }
  //       this.className = 'current'
  //     })
  //   }

  var chooseType = document.querySelectorAll('.choose_type dd a')
  choose(chooseType)
  //   for (var i = 0; i < chooseType.length; i++) {
  //     chooseType[i].addEventListener('click', function () {
  //       for (var j = 0; j < chooseType.length; j++) {
  //         chooseType[j].className = ''
  //       }
  //       this.className = 'current'
  //     })
  //   }

  // 加减商品数量
  // 1 获取 加减号 元素
  // 2 点击 加减号 元素 分别增加 减少数量(不能小于1)
  // write your code here ...
  var choose_amount = document.querySelector('.choose_amount')
  var choose_amount_children = choose_amount.children

  choose_amount_children[1].addEventListener('click', function () {
    choose_amount_children[0].value++
    if (choose_amount_children[0].value > 1) {
      choose_amount_children[2].style.cursor = 'pointer'
    }
  })
  choose_amount_children[2].addEventListener('click', function (e) {
    if (choose_amount_children[0].value > 1) {
      choose_amount_children[0].value--
      // this.style.cursor = 'pointer'
    } else {
      // e.preventDefault()
      this.style.cursor = 'not-allowed'
    }
  })
  // 直接改变数量
  choose_amount_children[0].addEventListener('change', function () {
    if (choose_amount_children[0].value < 1) choose_amount_children[0].value = 1
  })

  // 加入购物车,将当前商品的相关信息(品名、价格、数量、图片路径)加入本地存储
  // write your code here ...
  var addcar = document.querySelector('.addcar')
  addcar.addEventListener('click', function () {
    var pname = document.querySelector('.sku_name').innerHTML
    var price = document.querySelector('.price').innerHTML
    var mount = document.querySelector('.choose_amount input').value
    var img = document.querySelector('.preview_img img').src
    var phone = {
      phoneImg: img,
      phoneName: pname,
      phonePrice: price,
      phoneMount: mount
    }
    localStorage.setItem('phone', JSON.stringify(phone))
    location.href = 'car.html'
  })
}
