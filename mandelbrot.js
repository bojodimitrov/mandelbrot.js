
var canvas = document.getElementById("mandelbrot")
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var magnificationFactor = 500;
var translate = {
    x: 1,
    y: 1
}


var zoomIn = function () {
    magnificationFactor *= 2
}

var zoomOut = function () {
    magnificationFactor /= 2
}

var scaleCanvas = function (event) {
    var direction = event.wheelDelta
    if (direction > 0) {
        zoomIn()
        draw()
    }
    else {
        zoomOut()
        draw()
    }
}

var translation =  function(direction){
    switch(direction){
        case 'r': translate.x -= 0.1/(magnificationFactor/300); break;
        case 'l': translate.x += 0.1/(magnificationFactor/300); break;
        case 'd': translate.y -= 0.1/(magnificationFactor/300); break;
        case 'u': translate.y += 0.1/(magnificationFactor/300); break;
    }
    draw()
}

canvas.addEventListener("wheel", scaleCanvas)
var startDragOffset = {};
var mouseDown = false;

// add event listeners to handle screen drag
// canvas.addEventListener("mousedown", function (event) {
//     mouseDown = true;
//     startDragOffset.x = event.clientX - translate.x;
//     startDragOffset.y = event.clientY - translate.y;
// });

// canvas.addEventListener("mouseup", function (event) {
//     mouseDown = false;
// });

// canvas.addEventListener("mouseover", function (event) {
//     mouseDown = false;
// });

// canvas.addEventListener("mouseout", function (event) {
//     mouseDown = false;
// });

// canvas.addEventListener("mousemove", function (event) {
//     if (mouseDown) {
//         translate.x = event.clientX - startDragOffset.x;
//         translate.y = event.clientY - startDragOffset.y;
//         draw()
//     }
// });


var checkIfBelongsToMandelbrotSet = function (x, y) {
    var realComponentOfResult = x;
    var imaginaryComponentOfResult = y;
    var maxIterations = 200;


    for (var i = 0; i < maxIterations; i++) {
        var tempRealComponent = realComponentOfResult * realComponentOfResult
            - imaginaryComponentOfResult * imaginaryComponentOfResult
            + x;

        var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
            + y;

        realComponentOfResult = tempRealComponent;
        imaginaryComponentOfResult = tempImaginaryComponent;


        if (realComponentOfResult * imaginaryComponentOfResult > 5)
            return ((i / maxIterations * 100));
    }


    return 0;
}

var draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {
            var belongsToSet = checkIfBelongsToMandelbrotSet((x / magnificationFactor) - translate.x, (y / magnificationFactor) - translate.y);

            if (belongsToSet == 0) {
                ctx.fillStyle = '#000';
                ctx.fillRect(x, y, 3, 3);
            }
            else {
                ctx.fillStyle = 'hsl(140, 100%, ' + belongsToSet + '%)';
                ctx.fillRect(x, y, 3, 3);
            }
        }
    }
}

draw()