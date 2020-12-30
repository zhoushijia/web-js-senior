window.onload = function () {
  // 电话号码正则
  var regtel = /^1[3|4|5|7|8]\d{9}$/
  //   qq号正则
  var regqq = /^[1-9]\d{4,}$/
  //    昵称正则
  var regnc = /^[\u4e00-\u9fa5]{2,8}$/
  //   验证码正则
  var regmsg = /^\d{6}$/
  //   密码正则
  var regpwd = /^[a-zA-Z0-9_]{6,16}$/

  var tel = document.querySelector('#tel')
  var qq = document.querySelector('#qq')
  var nc = document.querySelector('#nc')
  var message = document.querySelector('#msg')
  var pwd = document.querySelector('#pwd')
  var surepwd = document.querySelector('#surepwd')
  //   协议框
  var agree = document.querySelector('.agree input')
  var form = document.querySelector('#form')

  checkmsg(tel, regtel)
  checkmsg(qq, regqq)
  checkmsg(nc, regnc)
  checkmsg(message, regmsg)
  checkmsg(pwd, regpwd)
  surePwd(surepwd, pwd)
  function checkmsg(obj, reg) {
    obj.addEventListener('blur', function () {
      if (reg.test(this.value)) {
        this.nextElementSibling.className = 'success'
        this.nextElementSibling.innerHTML = `<i class="success_icon"></i> 恭喜您输入正确`
        return true
      } else {
        this.nextElementSibling.className = 'error'
        this.nextElementSibling.innerHTML = `<i class="error_icon"></i> 格式不正确，请从新输入 `
        return false
      }
    })
  }

  //   核实再次输入密码是否一致
  function surePwd(sureobj, obj) {
    sureobj.addEventListener('blur', function () {
      if (obj.value == this.value && this.value.trim().length != 0) {
        this.nextElementSibling.className = 'success'
        this.nextElementSibling.innerHTML = `<i class="success_icon"></i> 密码核实正确`
        return true
      } else {
        this.nextElementSibling.className = 'error'
        this.nextElementSibling.innerHTML = `<i class="error_icon"></i> 密码不一致，请从新输入 `
        return false
      }
    })
  }

  //   提交跳转
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    // checkmsg(tel, regtel) && checkmsg(qq, regqq) && checkmsg(nc, regnc) && checkmsg(message, regmsg) && checkmsg(pwd, regpwd) && surePwd(surepwd, pwd) && agree.checked
  })
}
