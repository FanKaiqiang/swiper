var index = 0   //     初始化第一张图片
var buttons = $('#buttons > button')    //获取按钮
init(index)      //  初始化
var timeId = setTimer()

function setTimer() {
    return setInterval(() => {
        var n = index % 4 + 1
        makeLeave(n).one('transitionend', function (e) {    //展示的图片移出
            if ($(e.currentTarget).hasClass('leave')) {     //在监听对象具有leave类时才会执行添加enter类
                makeEnter(e)    //移出的图片移至待定区
            }
        })
        makeCurrent(n)      //待定区的图片展示
        index++             //展示下一张图片
    }, 1500)                //2秒执行一次
}

buttons.on('click', (x) => {        //按钮事件
    window.clearInterval(timeId)    //按下后停止轮播
    $('.images > img').addClass('stop').removeClass('leave current').addClass('enter')  //重新初始化
    index = $(x.currentTarget).index()
    init(index)
    setTimeout(() => {          //继续轮播
        $('.images > img').removeClass('stop')
    }, 1000)
    timeId = setTimer()

})

function init(index) {        //初始化函数
    $(`.images > img:nth-child(${index + 1})`).removeClass('enter leave').addClass('current').siblings().removeClass('current leave').addClass('enter')
    $(`#buttons > button:nth-child(${index + 1})`).addClass('red').siblings().removeClass('red')
}

function makeLeave(n) {          //移出状态
    $(`#buttons > button:nth-child(${n})`).removeClass('red')
    return $(`.images > img:nth-child(${n})`).removeClass('current enter').addClass('leave')
}
function makeEnter(e) {          //待定状态
    return $(e.currentTarget).removeClass('leave current').addClass('enter')
}
function makeCurrent(n) {        //展示状态
    $(`#buttons > button:nth-child(${n % 4 + 1})`).addClass('red')
    return $(`.images > img:nth-child(${n % 4 + 1})`).removeClass('enter leave').addClass('current')
}

