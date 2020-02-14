export function getOptions(data: any): any {
    const options: any = {
      scales: {
        yAxes: [{
          gridLines: {
            color: '#E9E9E9',
            zeroLineColor: '#E9E9E9',
          },
      ticks: {
        callback: function(value) {
            value = value / 1000000;
            return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '"';
        }
      },
        }]
      },
      tooltips: {
        enabled: false,
        custom: function (tooltipModel) {
          let tooltipEl = document.getElementById('chartjs-tooltip');

          // Create element on first render
          if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.classList.add('tooltip');
              tooltipEl.id = 'chartjs-tooltip';
              document.body.appendChild(tooltipEl);
          }

          if (!tooltipModel) {
            tooltipEl.style.opacity = '0';
            return;
          }

          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = '0';
            return;
        }

          tooltipEl.classList.add(tooltipModel.yAlign);
          const i = tooltipModel.dataPoints[0].index;

          console.log(tooltipModel)
          console.log(tooltipModel.dataPoints);


          const valor =  '$' + (tooltipModel.dataPoints[0].value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
          const innerHtml = '<div class="container">' +
          '<div class="row">' +
            '<div class="col-6" style="text-align: center;">' +
              '<i class="tim-icons icon-money-coins mb-0 pb-0"></i>' +
              '<h6 style="color: white" class="mt-0 pt-0">' + data[tooltipModel.dataPoints[0].datasetIndex].label + '</h6>' +
              '<h6  style="color: white">' + valor + '</h6>' +
              '</div>' +
            '<div class="col-6" style="text-align: center; border-left: 1px solid white; ">' +
            '<i class="tim-icons icon-calendar-60 mb-0"></i>' +
            '<h6 style="color: white" class="mt-0">' + 'Año' + '</h6>' +
            '<h4 style="color: white" class="mt-0">' + tooltipModel.dataPoints[0].label + '</h4>' +
            '</div>' +
          '</div>' +
          '<div class="row mt-2" >' +
          '</div>' +
      '</div>';
          tooltipEl.innerHTML = innerHtml;
          document.body.appendChild(tooltipEl);

          const position = this._chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = '.8';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
          tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
          tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
          tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
          tooltipEl.style.padding = '10px';
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.background = data[tooltipModel.dataPoints[0].datasetIndex].backgroundColor;
          tooltipEl.style.color = 'white';
          tooltipEl.style.webkitTransition = 'all .3s ease';
          tooltipEl.style.transition = 'all .3s ease';
          tooltipEl.style.webkitTransform = 'translate(-50%, 0)';
          tooltipEl.style.transform = 'translate(-50%, 0)';
          tooltipEl.style.width = '300px';
      }
    }
  };
    return options;
  }
