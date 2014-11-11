AFV.sumaGastos = (function(presupuesto) {
    console.log("sumaGastos", presupuesto);
    var data = [];
    var color = new RColor;
    var ingreso = presupuesto.ingreso;
    var dineroLibre = 0;
    for (var indexCategoria in presupuesto.categorias) {
        var categoria = presupuesto.categorias[indexCategoria];
        var montoTotal = 0;
        for (var indexGasto in categoria.gastos) {
            var gasto = categoria.gastos[indexGasto];
            montoTotal += gasto.monto;
        }
        montoTotal = Math.round((montoTotal / ingreso) * 100);
        dineroLibre += montoTotal;
        data.push({value: montoTotal, label: categoria.nombre, color: color.get(true), highlight: color.get(true)});
    }
    dineroLibre = Math.round(((ingreso - dineroLibre) / ingreso) * 100);
    data.push({value: dineroLibre, label: "Dinero Libre", color: color.get(true), highlight: color.get(true)});
    return data;
});

AFV.chartInit = (function($scope, presupuesto) {
    console.log("chartInit", presupuesto);
    $scope.$on('$viewContentLoaded', function() {
        if (AFV.isPresupuestoReady(presupuesto)) {
            AFV.showPresupuesto(presupuesto);
            AFV.showPresupuestoBarras(presupuesto);
        } else {
            $("#chartsDiv").addClass("hide");
            $("#prespuestoCard").removeClass("hide");
        }
    });
});

AFV.showPresupuestoBarras = (function(presupuesto) {
    var canvas = $("#presupuestoChartBarras").get(0);
    var ctx = canvas.getContext("2d");
});

AFV.showPresupuesto = (function(presupuesto) {
    var canvas = $("#presupuestoChart").get(0);
    var ctx = canvas.getContext("2d");
    var presupuestoChart = new Chart(ctx).Pie(AFV.sumaGastos(presupuesto), AFV.chartOptions);
    canvas.onclick = function(evt) {
        var activePoints = presupuestoChart.getSegmentsAtEvent(evt);
        console.log("Chart Click", activePoints);
        // => activePoints is an array of segments on the canvas that are at the same position as the click event.
    };
});

AFV.isPresupuestoReady = (function(presupuesto) {
    for (var indexCategoria in presupuesto.categorias) {
        var categoria = presupuesto.categorias[indexCategoria];
        for (var indexGasto in categoria.gastos) {
            var gasto = categoria.gastos[indexGasto];
            if (gasto.monto) {
                return true;
            }
        }
    }
    return false;
});

AFV.chartOptions = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke: true,
    //String - The colour of each segment stroke
    segmentStrokeColor: "#fff",
    //Number - The width of each segment stroke
    segmentStrokeWidth: 2,
    //Number - The percentage of the chart that we cut out of the middle
    //percentageInnerCutout: 50, // This is 0 for Pie charts
    //Number - Amount of animation steps
    animationSteps: 100,
    //String - Animation easing effect
    animationEasing: "easeOutBounce",
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate: true,
    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale: false,
    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

};


