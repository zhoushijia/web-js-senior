// ## js原生实现贪吃蛇
// #### 分析
//       把贪吃蛇这个游戏当做一个对象,他又由一下部分组成:
//       1.食物; Food （宽，高，颜色，坐标xy）
//       2.小蛇; Snake （宽，高，颜色，坐标xy，小蛇移动）
//       3.游戏规则；Game(地图map) （游戏结束和胜利，用户键盘控制，解决连续键盘事件）

// 我们将这三部分也当做三个对象,逐个分析,对它们添加自己的属性和方法,因为地图比较简单只需要设置样式即可,就不做分析,分析顺序按照难度从易到难来分析;(形参皆为游戏对象后期传进去的属性)
// 处理了几个bug，添加了几个功能，如下：

// 1.撞击自己game over
// 2.食物不会刷新在小蛇的身体上
// 3.解决连续键盘事件game.flag
// 4.添加游戏胜利条件
// 5.添加游戏开始（重新开始）
// 6.添加暂停继续

// 食物
;(function () {
  // 用来存储渲染到页面上的食物对象
  var elements = []
  // 创建食物构造函数
  //   有宽高颜色属性 食物的坐标
  function Food(width, height, color) {
    this.width = width || 20
    this.height = height || 20
    this.color = color || 'skyblue'
    // 食物的坐标
    this.x = 0
    this.y = 0
  }

  Food.prototype.init = function (map, snake) {
    this.removeFood()
    //   创建食物div模型
    var div = document.createElement('div')
    // 食物div的宽高颜色
    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.color
    // 食物div产生的位置是随机的
    this.x = parseInt(Math.random() * (map.offsetWidth / this.width))
    this.y = parseInt(Math.random() * (map.offsetHeight / this.height))
    // 如果食物产生在小蛇身体上,则重新产生
    while (true) {
      var i
      for (i = 0; i < snake.body.length; i++) {
        if (this.x == snake.body[i].x && this.y == snake.body[i].y) {
          this.x = parseInt(Math.random() * (map.offsetWidth / this.width))
          this.y = parseInt(Math.random() * (map.offsetHeight / this.height))
          break
        }
      }
      if (i == snake.body.length) break
    }
    // 食物div盒子的位置
    // 定位
    div.style.position = 'absolute'
    div.style.left = this.x * this.width + 'px'
    div.style.top = this.y * this.height + 'px'
    // 将食物div放进map中
    map.appendChild(div)
    // 将食物存储，方便后面删除
    elements.push(div)
  }

  //   当吃到食物时，清除食物坐标
  Food.prototype.removeFood = function () {
    for (var i = 0; i < elements.length; i++) {
      elements && elements[i].remove()
      elements.splice(0, 1)
    }
  }

  window.Food = Food
})()

// 小蛇
;(function () {
  // 存储小蛇对象的数组
  var elements = []
  // 小蛇对象
  function Snake(width, height, direction) {
    // 小蛇身体每部分的宽高
    this.width = width || 20
    this.height = height || 20
    // 小蛇头部朝向
    this.direction = direction || 'right'
    // 小蛇上一次朝向   用来比较本次与上次的方向是否有冲突
    this.beforeDirection = this.direction
    // 小蛇坐标和颜色
    this.body = [
      { x: 3, y: 2, color: 'red' },
      { x: 2, y: 2, color: 'gray' },
      { x: 1, y: 2, color: 'gray' }
    ]
  }

  // 小蛇初始化
  Snake.prototype.init = function (map) {
    // 清除前一次小蛇元素对象
    this.removeSnake()

    // 重新创建小蛇坐标
    for (var i = 0; i < this.body.length; i++) {
      var div = document.createElement('div')
      map.appendChild(div)
      // 小蛇身体每部分的宽高
      div.style.width = this.width + 'px'
      div.style.height = this.height + 'px'
      // 小蛇身体每部分的坐标 颜色
      div.style.position = 'absolute'
      div.style.left = this.body[i].x * this.width + 'px'
      div.style.top = this.body[i].y * this.height + 'px'
      div.style.backgroundColor = this.body[i].color
      div.style.borderRadius = '50%'
      // 将小蛇对象存储到elements中
      elements.push(div)
    }
  }
  // 创建清除小蛇的函数
  Snake.prototype.removeSnake = function () {
    for (var i = 0; i < elements.length; i++) {
      elements[i].remove()
    }
    elements.splice(0, elements.length)
  }
  // 小蛇移动函数,小蛇移动就是除头部以外的部分向前移动一个身位
  Snake.prototype.move = function (map, food) {
    // 小蛇移动就是除头部以外的部分向前移动一个身位,即前一个状态的最后一个身位丢弃
    var index = this.body.length - 1
    for (var i = index; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x
      this.body[i].y = this.body[i - 1].y
    }
    // 小蛇的头部移动依靠当前direction来判断坐标
    switch (this.direction) {
      case 'right':
        this.body[0].x++
        break
      case 'left':
        this.body[0].x--
        break
      case 'up':
        this.body[0].y--
        break
      case 'down':
        this.body[0].y++
        break
    }
    // console.log(this.body[0].x, this.body[0].y)
    // 判断是否吃到了食物
    if (this.body[0].x == food.x && this.body[0].y == food.y) {
      // 重新生成食物
      food.init(map, this)
      // 得到小蛇目前状态的身体最后一点的属性
      var last = this.body[this.body.length - 1]
      this.body.push({ x: last.x, y: last.y, color: last.color })
    }
  }

  // 将Snake构造函数传给window作为其属性
  window.Snake = Snake
})()

// 地图map html中类名为map的即为地图
// 游戏规则Game
;(function () {
  // 创造游戏构造函数
  function Game() {
    this.food = new Food()
    this.snake = new Snake()
    this.map = document.querySelector('.map')
    // 用于判断连续按键触发方向改变
    this.flag = false
  }

  // 游戏规则  不能碰壁  不能撞击自身 获得胜利
  Game.prototype.death = function () {
    this.timer = setInterval(
      function () {
        this.snake.move(this.map, this.food)
        // 将移动后的坐标渲染在页面上
        this.snake.init(this.map)
        // 重新渲染后方向按键才生效
        this.flag = true
        // 根据小蛇头部坐标来判断小蛇是否撞墙死亡
        var maxX = this.map.offsetWidth / this.snake.width
        var maxY = this.map.offsetHeight / this.snake.height
        // 小蛇头部坐标
        var headX = this.snake.body[0].x
        var headY = this.snake.body[0].y
        if (headX < 0 || headX >= maxX) {
          this.snake.removeSnake()
          clearInterval(this.timer)
          alert('游戏结束')
        }
        if (headY < 0 || headY >= maxY) {
          this.snake.removeSnake()
          clearInterval(this.timer)
          alert('游戏结束')
        }
        // 判断小蛇是否撞到自己的身体
        for (var i = 1; i < this.snake.body.length; i++) {
          if (this.snake.body[0].x == this.snake.body[i].x && this.snake.body[0].y == this.snake.body[i].y) {
            this.snake.removeSnake()
            clearInterval(this.timer)
            alert('游戏结束')
          }
        }
        //   游戏胜利
        if (maxX * maxY == this.snake.body.length) alert('恭喜你，吃完了所有食物')
      }.bind(this),
      100
    )
  }

  // 注册键盘按下事件
  Game.prototype.changeDirection = function () {
    document.addEventListener(
      'keydown',
      function (e) {
        if (this.flag) {
          switch (e.key) {
            case 'ArrowRight':
              // 如果小蛇上一个状态头部朝向是向左，则按右键不更改方向;否则，改变头部朝向向右
              this.snake.direction = this.snake.beforeDirection == 'left' ? 'left' : 'right'
              break
            case 'ArrowLeft':
              // 如果小蛇上一个状态头部朝向是向右，则按左键不更改方向;否则，改变头部朝向向左
              this.snake.direction = this.snake.beforeDirection == 'right' ? 'right' : 'left'
              break
            case 'ArrowUp':
              // 如果小蛇上一个状态头部朝向是向下，则按上键不更改方向;否则，改变头部朝向向上
              this.snake.direction = this.snake.beforeDirection == 'down' ? 'down' : 'up'
              break
            case 'ArrowDown':
              // 如果小蛇上一个状态头部朝向是向上，则按下键不更改方向;否则，改变头部朝向向下
              this.snake.direction = this.snake.beforeDirection == 'up' ? 'up' : 'down'
              break
          }
          // 同步方向
          this.snake.beforeDirection = this.snake.direction
          this.flag = false
        }
        // this指针指向game对象
      }.bind(this)
    )
  }

  // 将Game构造函数传给window作为其属性
  window.Game = Game
})()
;(function () {
  // 获取开始按钮  也是重新开始按钮
  var gameStart = document.querySelector('.start')
  // 获取暂停按钮
  var gameStop = document.querySelector('.stop')
  var game = null

  // 开始按钮  也是重新开始按钮
  gameStart.addEventListener('click', function () {
    // 如果game对象存在则清空数据
    if (game) {
      // 清空食物
      game.food.removeFood()
      // 终止定时器
      clearInterval(game.timer)
      // 移除小蛇元素
      game.snake.removeSnake()
      // game对象置空
      game = null
    }
    game = new Game()
    game.food.init(game.map, game.snake)
    game.death()
    game.changeDirection()
  })
  // 暂停/继续按钮
  gameStop.addEventListener('click', function () {
    if (game && this.innerHTML.trim() == '继续') {
      clearInterval(game.timer)
      game.death()
      this.innerHTML = '暂停'
    } else if (game && this.innerHTML.trim() == '暂停') {
      clearInterval(game.timer)
      this.innerHTML = '继续'
    }
  })
})()
