var buttons = $('#buttons > button')            //获取四个按键

buttons.on('click', function (x) {                 //按钮点击事件
    var index = $(x.currentTarget).index()      //获取元素在兄弟元素中的排行
    console.log(index)
    var p = index * -200
    $('#images').css({                         //移动图片
        transform: 'translate(' + p + 'px)'
    })
    n = index
    buttons.eq(index).addClass('red').siblings('.red').removeClass('red')    //按钮变红
})

var n = 0
var size = buttons.length
buttons.eq(n % size).trigger('click')                //设置初始状态
var timeId = setTimer()
function setTimer() {
    return setInterval(() => {                             //每1000ms自行一次触发事件
        n++
        buttons.eq(n % size).trigger('click')
    }, 2000)
}

$('.window').on('mouseenter', function () {
    window.clearInterval(timeId)
})

$('.window').on('mouseleave', function () {
    timeId = setTimer()
})