window.onload = function () {
  //需求:
  //0 若localStorage中有shopcar,则将shopcar数据追加到购物车列表的最后且处于勾选状态，并显示已勾选商品的总数量及总金额
  var phone = localStorage.getItem('phone')
  if (phone) {
    var obj = JSON.parse(phone)
    var cartItemList = $('.cart-item-list')
    var cartItem = cartItemList.children[0].cloneNode(true)
    cartItemList.appendChild(cartItem)
    var shopcarImg = $$('.p-goods img')
    var shopcarMsg = $$('.p-goods .p-msg')
    var shopcarPrice = $$('.p-price')
    var shopcarNum = $$('.p-num .itxt')
    var shopcarSum = $$('.p-sum')

    shopcarImg[shopcarImg.length - 1].src = obj.phoneImg
    shopcarImg[shopcarImg.length - 1].style.width = 80 + 'px'
    shopcarImg[shopcarImg.length - 1].style.height = 80 + 'px'
    shopcarMsg[shopcarMsg.length - 1].innerHTML = obj.phoneName
    shopcarPrice[shopcarPrice.length - 1].innerHTML = obj.phonePrice
    shopcarNum[shopcarNum.length - 1].value = obj.phoneMount
    shopcarSum[shopcarSum.length - 1].innerHTML = '￥' + obj.phonePrice.substr(1) * obj.phoneMount
  }

  // 获取各个元素
  var checkall1 = $('.checkall')
  var checkall2 = $('.select-all .checkall')
  var amountSum = $('.amount-sum em')
  var priceSum = $('.price-sum em')
  var cartItems = $$('.cart-item')
  var checks = $$('.j-checkbox')
  var shopcarPrice = $$('.p-price')
  var shopcarNum = $$('.p-num .itxt')
  var shopcarSum = $$('.p-sum')
  for (var j = 0; j < cartItems.length; j++) {
    cartItems[j].setAttribute('data-index', j)
  }

  // 结算栏总价
  function getSum() {
    var sum = 0
    var sumPrice = 0
    for (var i = 0; i < checks.length; i++) {
      if (checks[i].checked) {
        var sNum = Number(shopcarNum[i].value)
        var sPrice = Number(shopcarSum[i].innerHTML.substr(1))
        sum += sNum
        sumPrice += sPrice
      }
    }
    amountSum.innerHTML = sum
    priceSum.innerHTML = '￥' + sumPrice.toFixed(2)
  }
  // 获取初始结算模块中商品数量和总价
  getSum()

  //1 勾选全选时，所有商品均勾选，反之，取消勾选,且更新总数量、总金额
  checkall1.addEventListener('click', function () {
    checkall2.checked = checkall1.checked
    // 防止在全选时，先有单选，结算栏有价格，在全选之前，先将数量和价格清空，最后再全部加一遍
    for (var i = 0; i < checks.length; i++) {
      checks[i].checked = this.checked
      cartItems[i].className = this.checked ? 'cart-item check-cart-item' : 'cart-item'
    }
    getSum()
  })
  checkall2.addEventListener('click', function () {
    checkall1.checked = checkall2.checked
    for (var i = 0; i < checks.length; i++) {
      checks[i].checked = this.checked
      cartItems[i].className = this.checked ? 'cart-item check-cart-item' : 'cart-item'
    }
    getSum()
  })
  //2 勾选商品左边的checkbox时，为已勾选商品增加高亮背景色，若此时所有商品均已勾选，则全选checkbox也要勾选，否则全选checkbox不勾选，且更新总数量、总金额
  for (var i = 0; i < checks.length; i++) {
    checks[i].addEventListener('click', function () {
      this.parentNode.parentNode.className = this.checked ? 'cart-item check-cart-item' : 'cart-item'
      var checkedLength = $$('.p-checkbox .j-checkbox:checked').length
      checkall1.checked = checkedLength === checks.length
      checkall2.checked = checkall1.checked
      getSum()
    })
  }
  //3 点击数量旁边的+/-按钮时，数量相应增减，但数量不能小于1,且旁边商品价格及下方总商品数量、总价格相应变化
  var decrement = $$('.decrement')
  var increment = $$('.increment')
  for (var i = 0; i < decrement.length; i++) {
    decrement[i].addEventListener('click', function () {
      var index = this.parentNode.parentNode.parentNode.getAttribute('data-index')
      var val = shopcarNum[index].value
      if (val > 1) {
        val--
        shopcarNum[index].value = val
        shopcarSum[index].innerHTML = '￥' + val * shopcarPrice[index].innerHTML.substr(1)
      } else {
        this.style.cursor = 'not-allowed'
      }
      getSum()
    })
  }
  for (var i = 0; i < increment.length; i++) {
    increment[i].addEventListener('click', function () {
      var index = this.parentNode.parentNode.parentNode.getAttribute('data-index')
      var val = shopcarNum[index].value
      val++
      // 当数量大于1时需要把 - 号的禁用解除
      if (val > 1) {
        decrement[index].style.cursor = 'pointer'
      }
      shopcarNum[index].value = val
      shopcarSum[index].innerHTML = '￥' + val * shopcarPrice[index].innerHTML.substr(1)
      getSum()
    })
  }
  //4 直接修改数量时也会发生3 中的变化
  for (var i = 0; i < shopcarNum.length; i++) {
    shopcarNum[i].addEventListener('change', function () {
      var index = this.parentNode.parentNode.parentNode.getAttribute('data-index')
      if (shopcarNum[index].value < 1) shopcarNum[index].value = 1
      shopcarSum[index].innerHTML = '￥' + shopcarNum[index].value * shopcarPrice[index].innerHTML.substr(1)
      getSum()
    })
  }

  // 删除时刷新各元素
  function newEle() {
    cartItems = $$('.cart-item')
    checks = $$('.j-checkbox')
    shopcarPrice = $$('.p-price')
    shopcarNum = $$('.p-num .itxt')
    shopcarSum = $$('.p-sum')
    for (var j = 0; j < cartItems.length; j++) {
      cartItems[j].setAttribute('data-index', j)
    }
  }
  //5 清空购物车时所有商品删除，同时总数量、总金额归零
  //6 当总数量、总金额为0时，全选checkbox需取消勾选状态
  var clearAll = $('.clear-all')
  clearAll.addEventListener('click', function () {
    for (var i = 0; i < cartItems.length; i++) {
      cartItems[i].remove()
    }
    newEle()
    getSum()
    checkall1.checked = false
    checkall2.checked = false
  })

  // 8 删除单个商品
  // write your code here ...
  var delOne = $$('.p-action a')
  for (var i = 0; i < delOne.length; i++) {
    delOne[i].addEventListener('click', function () {
      var item = this.parentNode.parentNode
      item.remove()
      newEle()
      if (cartItems.length == 0) {
        checkall1.checked = false
        checkall2.checked = false
      }
      getSum()
    })
  }
  // 9 删除勾选的商品
  // write your code here ...
  var removeBatch = $('.remove-batch')
  removeBatch.addEventListener('click', function () {
    var checkeds = $$('.p-checkbox .j-checkbox:checked')
    for (var i = 0; i < checkeds.length; i++) {
      checkeds[i].parentNode.parentNode.remove()
    }
    newEle()
    if (cartItems.length == 0) {
      checkall1.checked = false
      checkall2.checked = false
    }
    getSum()
  })

  // 1 获取商品列表大盒子
  // 2 若localStorage中有shopcar（if语句）,则将shopcar数据追加到购物车列表的最后
  // write your code here ...

  // 3 获取所有商品左边的checkbox、全选checkbox、商品列表中的所有商品
  // 4 通过全选checkbox控制j-checkbox(全选及取消全选)，并改变总数量总金额
  // write your code here ...

  // 5 通过j-checkbox控制checkall,当所有j-checkbox均勾选时，checkall也勾选，否则checkall不勾选，并改变总数量总金额
  // write your code here ...

  // 6 点击 +/- 让对应input框中数量 +1  -1（但商品数量不能小于1）,同时 更新 小计 中的商品金额及总金额、总数量
  // write your code here ...

  // 7 直接编辑单个商品数量时（onchange），小计及总金额、总数量也相应改变
  // write your code here ...

  // 打开页面时即需计算总数量及总金额
  // 封装函数计算总数量及总金额

  // 8 删除单个商品
  // write your code here ...
  // 9 删除勾选的商品
  // write your code here ...
  // 10 清空购物车
  // write your code here ...
}
// 根据选择器获取单个元素
function $(selector) {
  return document.querySelector(selector)
}
// 根据选择器获取所有元素
function $$(selector) {
  return document.querySelectorAll(selector)
}
