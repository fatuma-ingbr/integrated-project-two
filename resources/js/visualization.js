function barChart(x, y, programme) {
    let chart;
    let canvas = document.getElementById("line-chart");
    chart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: x,
            datasets: [{
                label: programme,
                data: y,
                backgroundColor: [
                    'rgba(175, 12, 192, 0.4)',
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 35, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 102, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(25, 15, 64, 0.4)',
                ],
                borderColor: [
                    'rgba(175, 12, 192, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 35, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 102, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(25, 15, 64, 0.8)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function lineChart(x, y, programme) {
    let chart;
    Chart.defaults.global.defaultFontColor = 'rgb(15, 15, 39)';
    let canvas = document.getElementById("line-chart");
    chart = new Chart(canvas, {
        type: 'line',

        data: {
            labels: x,
            datasets: [{
                label: programme,
                backgroundColor: 'rgba(15, 15, 39, 0.8)',
                borderColor: 'rgb(241, 196, 15)',
                data: y,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}