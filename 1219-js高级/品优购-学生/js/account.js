window.addEventListener('load', function () {
  // 1 判断当前是否处于登录状态，并显示欢迎 或 提示 登录,调用下方checkLogin函数
  // 2 用户若已处于登录状态，点击 登出 时退出当前账户(删除记录当前用户的本地存储)并刷新，
  // 需用事件代理(因 登出 标签为动态生成，直接注册事件可能会报语法错误)
  // 3 按下s键 搜索框自动获取光标
  // write code here ...
  if (checkLogin()) {
    var logout = document.querySelector('.logout')
    var userPhone = document.querySelector('.userPhone')

    logout.addEventListener('click', function () {
      var arr = getUsers()
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].phone == userPhone.innerHTML) {
          arr[i].flag = false
          localStorage.clear()
          for (var j = 0; j < arr.length; j++) {
            saveAccount(arr[j].phone, arr[j].pswd, arr[j].flag)
          }
          break
        }
      }
      checkLogin()
    })
  }
  //判断当前是否处于登录状态，并显示欢迎 或 提示 登录
  function checkLogin() {
    // 1 获取header中 class="welcome" 的元素
    // 2 从本地存储中获取当前用户（在登录，或注册成功时会写入）
    // 3 若存在当前用户,则 元素内容为 欢迎您，用户名,否则 显示 请登录 及 免费注册 超链接
    // write code here...
    var arr = getUsers()
    var welcome = document.querySelector('.welcome')
    if (arr.length == 0) {
      welcome.innerHTML = `<a href="login.html">请登录!</a> <a href="register.html" class="style-red">免费注册</a>`
      return false
    }
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].flag) {
        welcome.innerHTML = '欢迎您,<span class="userPhone">' + arr[i].phone + '</span> <a class="logout" href="javascript:;">登出</a>'
        return true
      } else {
        welcome.innerHTML = `<a href="login.html">请登录!</a> <a href="register.html" class="style-red">免费注册</a>`
      }
    }
    return false
  }
  //从本地存储获取已存在的用户名及密码
  function getUsers() {
    var usersStr = localStorage.getItem('validUsers')
    if (usersStr) {
      return JSON.parse(usersStr)
    } else {
      return []
    }
  }
  // 往本地存储中存放新用户信息
  function saveAccount(phone, pswd, flag) {
    var accounts = getUsers()
    accounts.push({ phone: phone, pswd: pswd, flag: flag })
    localStorage.setItem('validUsers', JSON.stringify(accounts))
  }
})
