// 第一步:分析
// 把贪吃蛇这个游戏当做一个对象,他又由一下部分组成:
// 1.小蛇;
// 2.食物;
// 3.游戏背景(地图)
// 同样我们将这三部分也当做三个对象,逐个分析,对它们添加自己的属性和方法,因为地图比较简单只需要设置样式即可,就不做分析,分析顺序按照难度从易到难来分析;(形参皆为游戏对象后期传进去的属性)
// 食物
;(function () {
  // 用来存储上一次的食物对象（div标签）的数组，便于清除
  var elements = []
  //   (1) 食物属性
  function Food(width, height, color) {
    this.width = width || 20
    this.height = height || 20
    this.color = color || 'green'
    this.x = 0
    this.y = 0
  }
  //   (2)运用对象的原型对对象设置方法—>生成食物初始化每个食物(即每次只有一个食物产生),remove()是为了初始化每个食物(即每次只有一个食物产生);
  //原型对象添加方法—>把食物显示在地图上的
  Food.prototype.init = function (map, snack) {
    remove()
    //1.创建小盒子
    var div = document.createElement('div')
    //2.div添加到map中
    map.appendChild(div)
    //3.设置样式
    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.color
    div.style.position = 'absolute'
    //生成随机数
    var xx = parseInt(Math.random() * (map.offsetWidth / this.width))
    var yy = parseInt(Math.random() * (map.offsetHeight / this.height))

    // var flag = true
    // while (flag) {
    //   var i
    //   for (i = 0; i < snack.body.length; i++) {
    //     if (xx == snack.body[i].x && yy == snack.body[i].y) {
    //       var xx = parseInt(Math.random() * (map.offsetWidth / this.width))
    //       var yy = parseInt(Math.random() * (map.offsetHeight / this.height))
    //       break
    //     }
    //   }
    //   if (i === snack.body.length) flag = false
    // }
    this.x = xx * this.width
    this.y = yy * this.height
    div.style.left = this.x + 'px'
    div.style.top = this.y + 'px'
    elements.push(div)
  }
  // 清除食物小方块
  function remove() {
    for (var i = 0; i < elements.length; i++) {
      elements[i].parentElement.removeChild(elements[i])
      elements.splice(i, 1)
    }
  }
  window.Food = Food
})()

// 小蛇
;(function () {
  // 用来存储上一个状态的小蛇对象（div标签）的数组
  var elements = []
  // (1)添加小蛇的属性
  function Snack(width, height, direction) {
    this.width = width || 20
    this.height = height || 20
    this.direction = direction || 'right'
    // 用来存储上一次小蛇运动的朝向
    this.beforeDirection = this.direction
    this.body = [
      { x: 2, y: 2, color: 'red' }, //头部
      { x: 1, y: 2, color: 'orange' },
      { x: 0, y: 2, color: 'orange' }
    ]
  }
  //   (2)生成小蛇,并用remove初始化小蛇
  Snack.prototype.init = function (map) {
    remove()
    function remove() {
      // 第一次init过后elements的长度就会一直>=3
      for (var i = 0; i < elements.length; i++) {
        // elements[i].parentElement 必须加  否则会出现找不到元素对象的错误
        elements[i].parentElement && elements[i].parentElement.removeChild(elements[i])
      }
      elements.splice(0, elements.length - 1)
    }

    for (var i = 0; i < this.body.length; i++) {
      //1.创建小盒子
      var div = document.createElement('div')
      //2.div添加到map中  显示在页面上
      map.appendChild(div)
      //3.设置样式
      div.style.width = this.width + 'px'
      div.style.height = this.height + 'px'
      div.style.backgroundColor = this.body[i].color
      div.style.borderRadius = '50%'
      div.style.position = 'absolute'
      // 小蛇的初始坐标
      div.style.left = this.body[i].x * this.width + 'px'
      div.style.top = this.body[i].y * this.height + 'px'
      // 添加到elements中，不是body中
      elements.push(div)
    }
  }

  //   (3)用原型给小蛇添加移动函数
  Snack.prototype.move = function (food, map) {
    var index = this.body.length - 1
    // 除头部外的this.body.length - 1个点的坐标  变成  除尾部1个元素以外的所有元素的坐标
    for (var i = index; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x
      this.body[i].y = this.body[i - 1].y
    }
    //判断小蛇头部坐标的位置
    // 默认是right
    // 头部移动
    switch (this.direction) {
      case 'right':
        this.body[0].x += 1
        break
      case 'left':
        this.body[0].x -= 1
        break
      case 'top':
        this.body[0].y -= 1
        break
      case 'buttom':
        this.body[0].y += 1
        break
    }
    //判断蛇头的坐标  是否吃到食物
    //获取蛇头的坐标
    var headX = this.body[0].x * this.width
    var headY = this.body[0].y * this.height
    // 食物的坐标
    var foodX = food.x
    var foodY = food.y
    // 条件成立则吃到了食物
    if (headX == foodX && headY == foodY) {
      food.init(map)
      // 得到小蛇的身体最后一个元素
      var last = this.body[this.body.length - 1]
      // 将小蛇的身体最后一个元素坐标和颜色给小蛇  此时还未真正渲染到页面上 但通过定时器  在下一次move就会渲染在页面上
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      })
    }
  }

  window.Snack = Snack
})()
;(function () {
  // 第二步:将小蛇,食物,背景三个对象添加到游戏对象中
  function Game() {
    this.food = new Food()
    this.snack = new Snack()
    this.map = document.querySelector('.map')
  }

  // 第三步:设置游戏规则,换言之就是讲规则当做游戏的方法添加到游戏对象中
  // 1.不能碰壁
  Game.prototype.runSnack = function () {
    // var that = this
    //移动
    var timeId = setInterval(
      function () {
        this.snack.move(this.food, this.map)
        this.snack.init(this.map)
        //判断横纵坐标最大值
        var maxX = this.map.offsetWidth / this.snack.width
        var maxY = this.map.offsetHeight / this.snack.height
        //蛇头的坐标
        var headX = this.snack.body[0].x
        var headY = this.snack.body[0].y

        // 头部撞击自己的身体，游戏结束
        for (var i = 1; i < this.snack.body.length; i++) {
          if (this.snack.body[i].x == headX && this.snack.body[i].y == headY) {
            clearInterval(timeId)
            alert('游戏结束')
          }
        }
        if (headX < 0 || headX >= maxX) {
          clearInterval(timeId)
          alert('游戏结束')
        }
        if (headY < 0 || headY >= maxY) {
          clearInterval(timeId)
          alert('游戏结束')
        }
        //把这个函数绑定在that指向上  that指向game
      }.bind(this),
      100
    )
  }

  //   2.改变方向
  Game.prototype.keyDown = function () {
    // var that = this
    document.addEventListener(
      'keydown',
      function (e) {
        this.snack.beforeDirection = this.snack.direction
        switch (e.keyCode) {
          case 37: //左键
            this.snack.beforeDirection !== 'right' ? (this.snack.direction = 'left') : (this.snack.direction = 'right')
            break
          case 38: //上键
            this.snack.beforeDirection !== 'buttom' ? (this.snack.direction = 'top') : (this.snack.direction = 'buttom')
            break
          case 39: //右键
            this.snack.beforeDirection !== 'left' ? (this.snack.direction = 'right') : (this.snack.direction = 'left')
            break
          case 40: //下键
            this.snack.beforeDirection !== 'top' ? (this.snack.direction = 'buttom') : (this.snack.direction = 'top')
            break
        }
        //把这个函数绑定在that指向上  that指向game
      }.bind(this)
    )
  }

  //   3.调用小蛇,食物,两个规则
  Game.prototype.init = function () {
    //显示食物和小蛇
    this.food.init(this.map, this.snack)
    this.snack.init(this.map)
    //调用移动函数
    this.runSnack()
    this.keyDown(this.map)
  }

  window.Game = Game
})()

// 第四步:调用游戏对象,实现效果
;(function () {
  var game = new Game()
  game.init()
})()
