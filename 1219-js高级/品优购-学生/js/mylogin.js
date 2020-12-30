//需求:
//点击登录按钮时:
//用户名或密码未填写时报错
//用户名密码正确时登录成功，否则报错
//合法用户名、密码存在localStorage中
//当前用户名存在localStorage中
window.addEventListener('load', function () {
  // 获取元素
  var user = document.querySelector('#user')
  var pwd = document.querySelector('#pwd')
  var autologin = document.querySelector('#autologin')
  var btn = document.querySelector('#btn')
  var error = document.querySelector('.error')
  // 点击提交按钮时判断用户名密码是否填写及是否正确，填写了且正确时将用户名写入本地存储作为当前用户且跳转到首页，
  btn.addEventListener('click', function (e) {
    // 阻止表单的默认行为
    e.preventDefault()
    var obj = checkUser(user.value, pwd.value)
    if (obj) {
      location.href = 'index.html'
    } else {
      error.innerHTML = '用户名或密码错误!'
    }
  })
  // 否则报错并停留在当前页面
  // write your code here ...
})

//判断用户名及密码是否为存在的账号
function checkUser(username, pswd) {
  // write your code here ...
  var arr = getUsers()
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].phone == username && arr[i].pswd == pswd) {
      arr[i].flag = true
      localStorage.clear()
      for (var j = 0; j < arr.length; j++) {
        saveAccount(arr[j].phone, arr[j].pswd, arr[j].flag)
      }
      return arr[i]
    }
  }
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
