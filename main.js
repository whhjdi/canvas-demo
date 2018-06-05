var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
autoSetCanvas(c)
listenEvent()
listenOptions()


//监听按钮
var eraserEnable = false
function listenOptions() {
    bgBtn.onclick = function () {
        bgColor.click();
    };
    bgColor.onchange = function () {
        c.style.background = this.value;
    }
    brushColorBtn.onclick = function () {
        brushColor.click();
    };
    eraser.onclick = function () {
        eraserEnable = true
        chooseBrush.innerText = "继续"
        brushWrapper.classList.remove('active')
        myCanvas.className = 'eraser'
        eraser.classList.add('active')
    }
    var usingbrush = false
    chooseBrush.onclick = function () {
        eraserEnable = false
        if (chooseBrush.innerText === "继续") {
            chooseBrush.innerText = "笔刷"
            eraser.classList.remove('active')
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
        pencil.classList.add('active')
        pen.classList.remove('active')
        brush.classList.remove('active')
    }
    pen.onclick = function () {
        ctx.lineWidth = 4;
        myCanvas.className = 'pen'
        pen.classList.add('active')
        pencil.classList.remove('active')
        brush.classList.remove('active')
    }
    brush.onclick = function () {
        ctx.lineWidth = 6;
        myCanvas.className = 'brush'
        brush.classList.add('active')
        pen.classList.remove('active')
        pencil.classList.remove('active')
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
//监听鼠标事件和touch事件
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
            using = true
            if (eraserEnable) {
                ctx.clearRect(x, y - 5, 15, 15)
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
                    ctx.clearRect(x, y - 5, 15, 15)

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
                ctx.clearRect(x, y + 5, 15, 15)
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
                    ctx.clearRect(x, y + 5, 15, 15)

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
//设置canvas大小/重绘
function autoSetCanvas(c) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    c.width = pageWidth
    c.height = pageHeight
    window.onresize = function () {
        ctx.lineWidth = 2;
        var img = ctx.getImageData(0, 0, c.width, c.height)
        ctx.putImageData(img, 0, 0)
    }

}
