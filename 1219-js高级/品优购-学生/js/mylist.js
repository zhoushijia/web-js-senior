// 手机列表数据
var data = [
  { title: '荣耀X10 5G双模 麒麟820  4300mAh续航', newprice: '¥6088', oldprice: '￥6988', img: 'hornor.webp', selled: '0.87', left: 25 },
  { title: '荣耀30青春版 5G双模 6.5英寸柔滑全速屏 4000mAh大电池', newprice: '¥6088', oldprice: '￥6988', img: 'hornor1.webp', selled: '0.87', left: 28 },
  { title: 'Redmi K30 王一博同款 120Hz流速屏 前置挖孔', newprice: '¥6088', oldprice: '￥6988', img: 'redmi.webp', selled: '0.87', left: 3 },
  { title: 'Redmi 9 全场景AI四摄 高性能游戏芯 4GB+64GB', newprice: '¥6088', oldprice: '￥6988', img: 'xiaomi.webp', selled: '0.87', left: 5 },
  { title: 'OPPO Reno4 超级夜景视频 65W超级闪充 视频超', newprice: '¥6088', oldprice: '￥6988', img: 'oppa.webp', selled: '0.87', left: 67 },
  { title: 'OPPO Reno4 SE 65W超级闪充 3200万前置自拍 轻', newprice: '¥6088', oldprice: '￥6988', img: 'oppa1.webp', selled: '0.87', left: 45 },
  { title: 'vivo X50 Pro+ 5G手机 8+256GB 引力 超清一亿模式 高通骁龙865 60倍超级变焦 双模5G全网通手机', newprice: '¥6088', oldprice: '￥6988', img: 'vivo.webp', selled: '0.87', left: 15 },
  { title: 'vivo Y73s 5G手机 8GB+128GB 黑镜 AMOLED高清护眼屏 4800', newprice: '¥6088', oldprice: '￥6988', img: 'vivo1.webp', selled: '0.87', left: 20 }
]

//将列表字符串插入ul中
window.addEventListener('load', function () {
  // 将上述数据渲染到列表ul中
  // write your code here...
  var ulNode = document.querySelector('.sk_bd').children[0]
  var str = ``
  for (var i = 0; i < data.length; i++) {
    str += `<li class="goods">
    <img src="upload/${data[i]['img']}" alt="">
    <h5 class="goods_title">${data[i]['title']}</h5>
    <p class="goods_price"><em>${data[i]['newprice']}</em> <del>${data[i]['oldprice']}</del></p>
    <div class="goods_progress">
        已售<i>${data[i]['selled'] * 100}%</i>
        <div class="bar">
            <div class="bar_in"></div>
        </div>
        剩余<em>${data[i]['left']}</em>件
    </div>
    <a href="#" class="goods_buy">立即抢购</a>
</li>`
  }
  ulNode.innerHTML = str
})
