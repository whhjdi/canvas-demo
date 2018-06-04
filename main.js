var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
autoSetCanvas(c)
listenEvent(c)
listenOptions()
var eraserEnable = false
setBgColor()
setBrushColor()


//颜色设置
function setBgColor() {
    bgBtn.onclick = function(){
        bgColor.click();
    };
    bgColor.onchange = function(){
        document.body.style.background = this.value;
    }
}
function setBrushColor() {
    brushColorBtn.onclick = function(){
        brushColor.click();
    };
}

//监听选项
function listenOptions() {

    eraser.onclick = function () {
        eraserEnable = true
        chooseBrush.innerText = "继续"
        brushWrapper.classList.remove('active')
        myCanvas.className = 'eraser'
        console.log(myCanvas.className)
    }
    var usingbrush = false
    chooseBrush.onclick = function () {
        eraserEnable = false
        if (chooseBrush.innerText === "继续") {
            chooseBrush.innerText = "笔刷"
        } else {
            usingbrush = !usingbrush
            if (usingbrush) {
                chooseBrush.innerText = "笔刷"
                brushWrapper.classList.add('active')
            } else {
                brushWrapper.classList.remove('active')
            }
        }
    }
    ctx.lineWidth = 2;
    pencil.onclick = function () {
        ctx.lineWidth = 2;
        myCanvas.className = 'pencil'
    }
    pen.onclick = function () {
        ctx.lineWidth = 4;
        myCanvas.className = 'pen'
    }
    brush.onclick = function () {
        ctx.lineWidth = 6;
        myCanvas.className = 'brush'
    }

    var optionItems = false
    options.onclick = function () {
        optionItems = !optionItems
        if (optionItems) {
            wrapper.classList.add('active')
            brushWrapper.classList.remove('active')
        } else {
            wrapper.classList.remove('active')
        }

    }
    clear.onclick = function () {
        ctx.clearRect(0, 0, c.width, c.height)
    }
    save.onclick = function () {
        var url = c.toDataURL("./image/png")
        var a = document.createElement('a')
        document.body.appendChild(a);
        a.href = url
        a.download = '我的涂鸦.png';
        a.target = '_blank'
        a.click();
    }
}
//监听鼠标事件绘画
function listenEvent() {
    var using = false
    var lastPoint = {
        'x': undefined,
        'y': undefined
    }

    if (document.body.ontouchstart !== undefined) {
        c.ontouchstart = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            console.log(e.touches[0].clientX)
            using = true
            if (eraserEnable) {
                ctx.clearRect(x, y-5, 15, 15)
            } else {
                lastPoint.x = x
                lastPoint.y = y
            }
        }
        c.ontouchmove = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            if (using) {
                if (eraserEnable) {
                    ctx.clearRect(x, y-5, 15, 15)

                } else {
                    var newPoint = {
                        'x': x,
                        'y': y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        c.ontouchend = function (e) {
            using = false
        }
    } else {
        c.onmousedown = function (e) {
            var x = e.clientX
            var y = e.clientY
            using = true
            if (eraserEnable) {
                ctx.clearRect(x, y+5, 15, 15)
            } else {
                lastPoint.x = x + 3
                lastPoint.y = y + 27
            }
        }
        c.onmousemove = function (e) {
            var x = e.clientX
            var y = e.clientY
            if (using) {
                if (eraserEnable) {
                    ctx.clearRect(x, y+5, 15, 15)

                } else {
                    var newPoint = {
                        'x': x + 3,
                        'y': y + 27
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }

        }
        c.onmouseup = function (e) {
            using = false
        }

    }

}
//划线函数
function drawLine(x1, y1, x2, y2) {
    ctx.strokeStyle = brushColor.value;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath()
}
//设置canvas大小
function autoSetCanvas(c) {
    listenResize()
    stayImage()
    window.onresize = function () {
        listenResize()
    }
    function stayImage(){
        var data_url = c.toDataURL();
        var image = new Image();
        image.src = data_url;
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
        }
    }
    function listenResize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        c.width = pageWidth
        c.height = pageHeight
    }
}