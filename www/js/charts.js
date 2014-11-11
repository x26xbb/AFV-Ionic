AFV.timeOut = 1200;

AFV.sumaGastos = (function(presupuesto) {
    console.log("sumaGastos", presupuesto);
    var data = [];
    var color = new RColor;
    var ingreso = presupuesto.ingreso;
    var dineroLibre = ingreso;
    for (var indexCategoria in presupuesto.categorias) {
        var categoria = presupuesto.categorias[indexCategoria];
        var montoTotal = 0;
        for (var indexGasto in categoria.gastos) {
            var gasto = categoria.gastos[indexGasto];
            montoTotal += gasto.monto;
        }
        dineroLibre = dineroLibre - montoTotal;
        montoTotal = Math.round((montoTotal / ingreso) * 100);
        data.push({value: montoTotal, label: categoria.nombre, color: color.get(true), highlight: color.get(true)});
    }
    dineroLibre = Math.round((dineroLibre / ingreso) * 100);
    data.push({value: dineroLibre, label: "Dinero Libre", color: color.get(true), highlight: color.get(true)});
    return data;
});

AFV.datosBarras = (function(presupuesto) {
    console.log("Grafico de barras", presupuesto);
    var labelsCategories = [];
    var ingreso = presupuesto.ingreso;
    var porcentajeTotalCategoria = [];
    var porcentajeActualCategoria = [];
    for (var indexCategoria in presupuesto.categorias) {
        var categoria = presupuesto.categorias[indexCategoria];
        var nombreCategoria = categoria.nombre;
        labelsCategories.push(nombreCategoria);
        porcentajeTotalCategoria.push(categoria.porcentaje);
        var montoTotal = 0;
        for (var indexGasto in categoria.gastos) {
            var gasto = categoria.gastos[indexGasto];
            montoTotal += gasto.monto;
        }
        montoTotal = Math.round((montoTotal / ingreso) * 100);
        porcentajeActualCategoria.push(montoTotal);
    }

    var data = {
        labels: labelsCategories,
        datasets: [
            {
                label: "Porcentaje Estimado de Categoria",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: porcentajeTotalCategoria
            },
            {
                label: "Porcentaje Actual de Categoria",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: porcentajeActualCategoria
            }
        ]
    };

    return data;

});

AFV.chartInitHome = (function() {
    var presupuestos = AFV.tempPresupuestos;
    for (var presupuestoIndex in presupuestos) {
        var presupuesto = presupuestos[presupuestoIndex];
        console.log("pres", presupuesto);
        AFV.chartInit(presupuesto);
    }
});

AFV.chartInit = (function(presupuesto) {
    console.log("chartInit", presupuesto);

    if (AFV.isPresupuestoReady(presupuesto)) {
        AFV.showPresupuesto(presupuesto);
        AFV.showPresupuestoBarras(presupuesto);
    } else {
        $("#chartsDiv_" + presupuesto.presupuestoId).addClass("hide");
        $("#prespuestoCard_" + presupuesto.presupuestoId).removeClass("hide");
    }

});

AFV.showPresupuestoBarras = (function(presupuesto) {
    var canvas = $("#presupuestoChartBarras_" + presupuesto.presupuestoId).get(0);
    var ctx = canvas.getContext("2d");
    var PresupuestoChartBarras = new Chart(ctx).Bar(AFV.datosBarras(presupuesto), AFV.charOptionsBar);
});

AFV.showPresupuesto = (function(presupuesto) {
    var canvas = $("#presupuestoChart_" + presupuesto.presupuestoId).get(0);
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

AFV.charOptionsBar = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: true,
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,
    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",
    //Number - Width of the grid lines
    scaleGridLineWidth: 1,
    //Boolean - If there is a stroke on each bar
    barShowStroke: true,
    //Number - Pixel width of the bar stroke
    barStrokeWidth: 2,
    //Number - Spacing between each of the X value sets
    barValueSpacing: 5,
    //Number - Spacing between data sets within X values
    barDatasetSpacing: 1,
    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

