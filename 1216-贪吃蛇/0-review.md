# 以下为所学知识关键词(看到词语能想到答案或者能快速找到答案)

## js 高级

面向过程 面向对象
类定义 类的本质就是构造函数 结构(属性和方法)
继承 extends super
案例 `tab 栏切换`(增删改查) innerAdjacentHTML dblclick select()
静态成员 实例成员
构造函数 实例对象 原型对象 对象的原型(每个对象中都有原型) 前面四者的关系--> `原型链`
构造函数的继承:父构造函数属性的继承(call)+父构造函数方法的继承(prototype=实例对象;prototype.constructor=构造函数)
改变 this 指向：bind 只改变 this 的指向,不调用函数,返回一个新的函数
call 改变 this 的指向,调用函数
apply 改变 this 的指向,调用函数,传递的参数是数组
函数的四种声明方式(函数也是对象)-->万物皆对象
this 指向 普通函数 对象中的函数 定时器中的函数 立即执行函数 构造器函数 事件函数
Array.forEach/filter/find/some/includes/map/findIndex/from() 案例：`商品查询`
String.startsWith/endsWith/repeat()
Object.keys/defineProperty/assign()
高阶函数 函数做参数/返回参数
闭包：延长局部变量的生命周期
递归：js 函数每调用一次就会在栈中开辟一片空间 案例：`商品id查找`
浅拷贝：Object.assign(newObj,oldObj) 深拷贝：对象拷贝(类似商品 id 查找 instanceof)
正则：//包含 /[]/包含其中一种 -范围符 ^$边界符 {}量词符 ()优先级或被额外提取出的内容
//gi g：表示全局查找 i：忽视大小写 String.replace()/match() 配合 reg 案例：`正则替换/表单验证`
RegExp.test()/exec()
var let const 使用 let/const 定义的变量不在是 window 对象的属性
剩余参数 扩展运算符-->合并数组(Array.from()) 数组/对象解构
箭头函数(注意 this) `面试题`  
Set 数据结构(存储不重复的值) `数组去重`几种方法 Set.add/delete/has/clear() 属性：size

## 数据可视化 echarts

echarts.init(dom 对象) option 配置 setOption(option) resize
title legend tooltip toolbox grid xAxis/yAxis color series
border-image border-image-slice 无单位 border-image-source/width/repeat
案例：立可得 利用 border-image 的`布局思想` 信息无缝滚动 设置私有属性渲染数据  `for 和渲染实现类似定时器`的效果 `解决事件冲突`

## jQuery

对 js 代码的封装
$(function(){})
jQ对象与js对象的互相转换
jQ对象获取$(选择器) eq even odd parent() parents() children() find() siblings() index() hasClass()
获取内容 html() text() val() 元素属性 css() addClass()/remove/toggle prop() attr()
效果 show() hide() toggle() slideDown() slideUp() slideToggle() fadeIn() fadeOut() fadeToggle() fadeTo(时间，透明)
animate(对象,时间) stop()
`案例：微博下拉菜单 tab 栏切换 图片高亮 手风琴（王者荣耀）`
$(选择器).each(function(index,dom){}) $.each(数组或对象,function(index,item){})
创建jQ对象$(标签与内容字符串) append(字符串也行) prepend() before() after() remove() empty() html('')
width() innerWidth() outerWidth()
案例：`购物车`保留小数toFixed()
offset().top/left position().top/left scrollTop()/Left()
案例：`电梯导航` window 的 scrollTop `评论删除评论` confirm(字符串)
事件注册 on 事件委托 解除绑定事件 off
自动触发事件 事件名() trigger('事件名') triggerHandler('事件名')-->阻止默认行为
事件对象与 APIs 中相同
`插件：jq22/htmlleaf 瀑布流插件 图片懒加载 全屏滚动`
案例：`todolist `-->本地存储 localStorage JSON.stringify(数组对象) JSON.parse(字符串)
拷贝$.extend([深/浅拷贝,]目标,被拷贝对象[,待合并到第一个对象的对象])

## webAPIs

api 方法特征的集合，只有方法特征无方法功能，通过不同的类来实现不同的功能，多实现功能
webapis 操作 html 页面与 browser 的接口
dom 操作 html 页面的属性和方法
获取：元素 元素内容 元素属性 元素 css 样式 类名 自定义元素属性 getAttribute
事件：源 类型 处理程序
排他思想 全选 `密码框校验` 微博栏显示 tab 栏切换
父节点 parentNode 子节点 children 兄弟节点获取 nextElementSibling prevElementSibling
创建元素对象 createElement() appendChild() insertBefore() remove() removeChild() cloneNode(true/false)
innerHTML innerHTML 数组拼接
案例： 评论删除/添加 confirm(字符串) 表格数据渲染
事件流：事件捕获 当前事件 事件冒泡
事件委托:事件冒泡
`事件：click change mouseover/out mouseenter/leave mousemove/down/up scroll focus/blur change keydown keyup(down 和 up 不区分大小写) keypress` 区分大小写不能识别功能键
案例：搜索框 focus `京东快递搜索查询` 鼠标天使 pageX/Y clientX/Y screenX/Y
事件对象 preventDefault() returnValue stopPropagation() cancelBubble 文字不能复制 contextmenu selectstart
bom 浏览器对象模型
window.onload document.DOMContentLoaded resize 案例：flexible.js
延时器 setTimeout 定时器 `setInterval(往往伴随着清除定时器)` 回调函数 `案例：倒计时，日期，短信验证码`
`同步异步` Event Loop 执行原理 js 是单线程
location href search hash assign()/replace()/reload() 案例：页面跳转
navigator userAgent 匹配手机或 PC 端
history back() forword() go()

PC 网页特效：
属性：offsetTop/Left/Width/Height(含边框) 与 style 之间的区别
`案例：模态框 放大镜`
立即执行函数
scrollTop/Left/Width/Height(不含边框)
window.pageXOffset 属性 案例：返回顶部
`案例：定时器实现动画效果 轮播图(1.高亮小点 2.箭头 3.自动播放 4.节流阀)` 筋斗云
本地存储：localStorage.setItem(key,value(数组字符串))/getItem/removeItem/clear sessionStorage

移动端网页特效
`事件： touchstart touchmove touchend` 事件对象：touches targetTouches changedTouches
案例：移动端模态图 轮播图 classList.add()/remove()/toggle()
`移动端 click 事件 300ms 延时`：移动端双击会缩放页面 怎么阻止：1.禁止缩放 2.封装函数 3.插件 fastclick
swiper superslide2 bootstrap

## js 基础

组成
引入方式
输入 输出
数据类型 简单 复杂
字面值
var let const
运算符
三种结构
变量
函数 两种声明的区别 function 函数名(形参){函数体} arguments
作用域 预解析 就近原则
对象 属性 方法 四种声明方式 遍历 new 关键字执行过程
内置对象:掌握增删改查插入方法
Math
Date 倒计时案例 去零  
Array（有序集合） `案例：查找元素个数 去重`
String 案例：`统计字符个数`（对象存储） `url 解析案例`
`简单数据类型变量和复杂数据类型变量存储位置的区别` 栈内存和堆内存

## css

引入方式
基本选择器 c3 新增选择器（伪元素选择器必要属性'content'）
三大特性
选择器的权重大小
字体样式 文字居中
文本样式
背景样式 background:linear-gradient（渐变色）
display 行内 行内块 块
盒子模型 对比 c3 盒子模型 盒子居中方法
标准流
浮动（半脱标 文字环绕） 三大特征 清除浮动
定位 各自参考系是什么 内部元素特征 z-index
display visibility overflow 三者隐藏的区别
border 圆角 任意三角形制造
盒子阴影
文本阴影
单行溢出文字带省略号隐藏 多行隐藏
vertical-align(基线对齐) cursor resize outline
video audio
filter(图像模糊)
transition(过渡)
精灵图 background
字体图标
favicon 图标制作
页面 logo 制作注意事项
2D/3D 特效 transform translate rotate scale 左手定则 视距 transform-style
动画@keyframes animation

## 移动端布局

二倍图/三倍图
百分比布局
flex布局  原理  父盒子属性  子盒子属性
media  rem  less  flexible.js
响应式布局  栅格系统

## HTML

html骨架
行内标签
块标签

## Git

git config --global user.name 用户名 注：了解即可
git config --global user.email 用户邮箱 注：了解即可
git --list 注：了解即可
git status
git add . 或者 git add 文件名(注意带上扩展名)
git commit -m 注解(日志)
git log 注：了解即可
git reflog
git reset --hard 哈希值或者 id 号
git branch
git branch 分支名
git branch -d 分支名
git branch -D 分支名 注意：这个是强制删除分支
git checkout 分支名
git merge 分支名
git remote add 别名 远程地址
git push -u 别名 分支名
git push
git pull
解决冲突
.gitignore
git remote remove 别名 注：了解即可
git remote -v 注：了解即可
