var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = bgColor.value;
ctx.fillRect(0, 0, c.width, c.height);
autoSetCanvas(c)
listenEvent()
listenOptions()


//监听按钮
var eraserEnable = false
function listenOptions() {
    var optionsEnable = true
    var node = options.parentNode.childNodes
    for(var i = 2; i<node.length; i++){
        if(node[i].nodeType === 1){
            node[i].style.display = 'none'
        }
    }
    options.onclick = function(){
        optionsEnable = !optionsEnable
        if(optionsEnable){
            for(var i = 2; i<node.length; i++){
                if(node[i].nodeType === 1){
                    node[i].style.display = 'none'
                    options.textContent = 'option'
                }
            }
        }else{
            for(var i = 2; i<node.length; i++){
                if(node[i].nodeType === 1){
                    node[i].style.display = 'block'
                    options.textContent = 'hide'
                }
            }
        } 
    }
    bgBtn.onclick = function () {
        if(drawStart){
            var name = prompt(`
        实验性功能:
            更改画布背景会覆盖掉您之前的创作,您希望继续吗?
            y(继续),n(返回)`)
            if(name === 'y'){
                bgColor.click();
            }
        }else{
            bgColor.click();
        }
        
          
    };
    bgColor.onchange = function () {
        ctx.fillStyle = bgColor.value;
        ctx.fillRect(0, 0, c.width, c.height);
    };
    brushColorBtn.onclick = function () {
        brushColor.click();
    };
    eraser.onclick = function () {
        eraserEnable = true
        myCanvas.setAttribute('class', 'eraser')
        eraser.classList.add('active')
        pencil.classList.remove('active')
        pen.classList.remove('active')
        brush.classList.remove('active')
    }
    ctx.lineWidth = 2;
    pencil.onclick = function () {
        eraserEnable = false
        ctx.lineWidth = 2;
        myCanvas.setAttribute('class', 'pencil')
        pencil.classList.add('active')
        pen.classList.remove('active')
        brush.classList.remove('active')
        eraser.classList.remove('active')
    }
    pen.onclick = function () {
        eraserEnable = false
        ctx.lineWidth = 4;
        myCanvas.setAttribute('class', 'pen')
        pen.classList.add('active')
        pencil.classList.remove('active')
        brush.classList.remove('active')
        eraser.classList.remove('active')
    }
    brush.onclick = function () {
        eraserEnable = false
        ctx.lineWidth = 6;
        myCanvas.setAttribute('class', 'brush')
        brush.classList.add('active')
        pen.classList.remove('active')
        pencil.classList.remove('active')
        eraser.classList.remove('active')
    }
    clear.onclick = function () {
        drawStart = false
        ctx.clearRect(0, 0, c.width, c.height)
        ctx.fillStyle = bgColor.value;
        ctx.fillRect(0, 0, c.width, c.height);
    }
    reset.onclick= function(){
        drawStart = false
        ctx.clearRect(0, 0, c.width, c.height)
        bgColor.value= '#ffffff'
        ctx.fillStyle = bgColor.value;
        ctx.fillRect(0, 0, c.width, c.height);
        brushColor.value = "#111111"
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
var drawStart = false
function drawLine(x1, y1, x2, y2) {
    drawStart = true
    ctx.beginPath();
    ctx.strokeStyle= brushColor.value;
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