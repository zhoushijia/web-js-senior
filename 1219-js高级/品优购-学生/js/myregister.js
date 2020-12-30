//需求:
//1 blur时判断手机号、密码是否合法，且是否正确输入验证码,验证码为1000-9999之间的随机数
//判断条件:
//a 手机号为11位的阿拉伯数字字符串即可
//b 密码只能有英文大小写、数字、下划线构成，且长度需在6-18之间,密码同时包含英文大小写及数字为强密码，
//包含三者中的两者为中，只含一种为弱
//c 确认密码和密码须一致
//d 需勾选 同意 注册条款
//2 注册成功后往本地存储中写入用户名及密码
window.onload = function () {
  //1 获取元素
  var phone = document.querySelector('#phone')
  var checkcode = document.querySelector('#checkcode')
  var code = document.querySelector('.code')
  var pwd = document.querySelector('#pswd')
  var confirmpswd = document.querySelector('#confirmpswd')
  var safe = document.querySelector('.safe')
  var safeClassR = safe.children[0].className
  var safeClassZ = safe.children[1].className
  var safeClassQ = safe.children[2].className
  var agree = document.querySelector('#agree')
  var submit = document.querySelector('#submit')
  //2 生成4位随机数验证码并显示
  code.innerHTML = rand(1000, 9999)
  //3 点击验证码时生成新的验证码
  code.addEventListener('click', function () {
    code.innerHTML = rand(1000, 9999)
  })

  //4 表单元素失去焦点时判断填写信息是否合法，合法时提示绿色文字提示，否则红色文字报错
  // 手机号验证
  phone.addEventListener('blur', function () {
    var phoneSpan = phone.nextElementSibling
    if (validPhone(this.value)) {
      phoneSpan.className = 'success'
      phoneSpan.innerHTML = '<i class="success_icon"></i> 手机号码输入正确'
    } else {
      phoneSpan.className = 'error'
      phoneSpan.innerHTML = '<i class="error_icon"></i> 手机号码格式不正确，请从新输入'
    }
  })
  // 验证码验证
  checkcode.addEventListener('blur', function () {
    var codeSpan = code.nextElementSibling
    if (this.value == code.innerHTML) {
      codeSpan.className = 'success'
      codeSpan.innerHTML = '<i class="success_icon"></i> 验证码输入正确'
    } else {
      codeSpan.className = 'error'
      codeSpan.innerHTML = '<i class="error_icon"></i> 验证码不正确，请从新输入'
    }
  })

  // 密码验证
  pwd.addEventListener('blur', function () {
    var pwdSpan = pwd.nextElementSibling
    if (validPswd(pwd.value)) {
      pwdSpan.className = 'success'
      pwdSpan.innerHTML = '<i class="success_icon"></i> 密码输入正确'
      safe.children[getPswdLevel(pwd.value) - 1].className += ' current'
    } else {
      pwdSpan.className = 'error'
      pwdSpan.innerHTML = '<i class="error_icon"></i> 需为6-16位英文大小写字母/数字/_'
      safe.children[0].className = safeClassR
      safe.children[1].className = safeClassZ
      safe.children[2].className = safeClassQ
    }
  })
  // 再次密码验证
  confirmpswd.addEventListener('blur', function () {
    var confirmpswdSpan = confirmpswd.nextElementSibling
    if (pwd.value === confirmpswd.value) {
      confirmpswdSpan.className = 'success'
      confirmpswdSpan.innerHTML = '<i class="success_icon"></i> 密码核实正确'
    } else {
      confirmpswdSpan.className = 'error'
      confirmpswdSpan.innerHTML = '<i class="error_icon"></i> 密码不一致，请从新输入'
    }
  })
  // write your code here ...
  //5 点击提交按钮时，判断是否同意注册条款及各项填写内容是否正确(可利用步骤4中判断结果)，
  //都符合要求时将手机号及密码写入本地存储作为一个新的合法用户，且将手机号写入本地存储作为当前用户名，
  //跳转首页，有一项不符合要求时阻止表单提交且报错
  // write your code here ...
  submit.addEventListener('click', function () {
    var submitSpan = submit.nextElementSibling
    var flag = false
    var arr = getUsers()
    if (arr.length == 0) {
      if (agree.checked && validPhone(phone.value) && checkcode.value == code.innerHTML && validPswd(pwd.value) && pwd.value === confirmpswd.value) {
        saveAccount(phone.value, pswd.value, flag)
        location.href = 'index.html'
      } else if (!agree.checked) {
        submitSpan.className = 'error'
        submitSpan.innerHTML = '<i class="error_icon"></i>您需要同意注册协议!'
      } else {
        submitSpan.className = 'error'
        submitSpan.innerHTML = '<i class="error_icon"></i> 注册信息有误!'
      }
    }
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].phone == phone.value) {
        submitSpan.className = 'error'
        submitSpan.innerHTML = '<i class="error_icon"></i>您该用户名已被注册!'
        break
      } else if (agree.checked && validPhone(phone.value) && checkcode.value == code.innerHTML && validPswd(pwd.value) && pwd.value === confirmpswd.value) {
        saveAccount(phone.value, pswd.value, flag)
        location.href = 'index.html'
      } else if (!agree.checked) {
        submitSpan.className = 'error'
        submitSpan.innerHTML = '<i class="error_icon"></i>您需要同意注册协议!'
        break
      } else {
        submitSpan.className = 'error'
        submitSpan.innerHTML = '<i class="error_icon"></i> 注册信息有误!'
        break
      }
    }
  })
}

// 以下函数供直接调用
// 判断手机号是否合法
function validPhone(num) {
  // 创建手机号正则表达式
  var telreg = /^1[3|4|5|7|8]\d{9}$/
  return telreg.test(num)
}
// 判断密码是否合法
function validPswd(pswd) {
  var scope = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'
  if (pswd.length < 6 || pswd.length > 16) {
    return false
  } else {
    for (var i = 0; i < pswd.length; i++) {
      if (scope.indexOf(pswd[i]) == -1) {
        return false
      }
    }
  }
  return true
}

// 获取密码弱中强 等级  1 弱 2 中 3 强
function getPswdLevel(pswd) {
  var lvl = 0
  if (pswd.match(/[0-9_]/)) {
    lvl++
  }
  if (pswd.match(/[A-Z]/)) {
    lvl++
  }
  if (pswd.match(/[a-z]/)) {
    lvl++
  }
  return lvl
}

// 往本地存储中存放新用户信息
function saveAccount(phone, pswd, flag) {
  var accounts = getUsers()
  accounts.push({ phone: phone, pswd: pswd, flag: flag })
  localStorage.setItem('validUsers', JSON.stringify(accounts))
}

// 获取已存在的用户名及密码
function getUsers() {
  var usersStr = localStorage.getItem('validUsers')
  if (usersStr) {
    return JSON.parse(usersStr)
  } else {
    return []
  }
}

// 生成min到max之间的随机数
function rand(min, max) {
  return min + parseInt(Math.random() * (max - min + 1))
}
