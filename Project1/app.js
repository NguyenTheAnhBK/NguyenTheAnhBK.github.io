
function showSurface3D(z, xRange, yRange, resolution) {
    var data = new vis.DataSet();
    var counter = 0;
    var xRange = xRange;
    var yRange = yRange;
    xRange[0] = parseFloat(xRange[0]);
    xRange[1] = parseFloat(xRange[1]);
    yRange[0] = parseFloat(yRange[0]);
    yRange[1] = parseFloat(yRange[1]);
    var resolution = resolution;
    var xInterval = (xRange[1]-xRange[0])/resolution;
    var yInterval = (yRange[1]-yRange[0])/resolution;
    for (var x = xRange[0]; x <= xRange[1]; x += xInterval) {
        for (var y = yRange[0]; y <= yRange[1]; y+= yInterval) {
            //var value = (Math.pow(x, 2) + Math.pow(y, 2));
            var value = eval(z);
            // console.log(value);
            // console.log(typeof value);
            // if(value == null){
            //     break;
            // }
            // else {
            //     if(typeof value == "underfined") {
            //         alert('hi');
            //         throw error();
            //     }
            //     else if(isNaN(value)) {
            //         throw error();
            //     }
            //     else
            //     data.add({id:counter++,x:x,y:y,z:value,style:value});
            // }
            data.add({id:counter++,x:x,y:y,z:value,style:value});
        }
    }
    // specify options
    var options = {
        width:  document.getElementById('test').style.width,
        height: '552px',
        style: 'surface',
        showPerspective: true,
        showGrid: true, 
        showShadow: false,
        keepAspectRatio: false, 
        verticalRatio: 1,
        // gridColor: '#',
        showLegend: true,
        legendLabel: 'Chú thích',
        tooltip: true,
        tooltipStyle: {
            content: {
                borderRadius: '5px'
            }
        },
        xLabel: 'x',
        yLabel: 'y',
        zLabel: 'z',
    };
    // Instantiate our graph object.
    var container = document.getElementById('test');
    var graph3d = new vis.Graph3d(container, data, options);
}

function calculate() {
    var expression = document.getElementById('expression').value.trim();
    // if(expression)
    var xRange = document.getElementById('xRange').value;
    xRange = xRange.split(",");
    var yRange = document.getElementById('yRange').value;
    yRange = yRange.split(",");
    var resolution = document.getElementById('resolution').value;

    // console.log(resolution);
    // console.log(xRange);
    // console.log(yRange);

    showSurface3D(expression, xRange, yRange, resolution);
}

function error(){
    alert("I don't know");
}

// function checkExpression() {
//     try{
//         var expression = document.getElementById('expression').value.trim();

//         expression = enteredExpression.replace("if", "");
//         expression = enteredExpression.replace(",", "?");

//         if (expression.indexOf("?") > -1){
//             if (expression.indexOf(",") > -1){
//                 expression = expression.replace(",", ":");
//             } else {
//                 expression = expression.slice(0, -1);
//                 expression += ": null)";
//             }
//         }
//     } catch (e) {
//         alert("I don't know!");
//     }
// }