import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IfStmt } from '@angular/compiler';



declare const $: any;
declare const Chart: any;
declare const window: any;


@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

	ngOnInit() {
	console.log("works");
	}

	/* options = {
		responsive: false,
		maintainAspectRatio: false,
		legend: {
			display : false
		},
		layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
		},
		scales: {
			yAxes: [{
			  ticks: {
				stepSize: 10,
				beginAtZero: true
			  }
			}]
		  }
	}
	alto: any;
	departamentos: any;
	departamentoSeleccionado : any;
	display : boolean = false;
	Indicadores : any = new Array();
	municipioSeleccionado : any;
	dataSeleccionada : any;
	Tipo: number;
	data: any;
	municipios : any = new Array();
	tipoEstadisticas: string = 'Departamento';
	indicadoresSeleccionados : any;

	indicadoresMunicipio : any;	


	constructor(private servicio : AppService) { this.alto = '400px'; }

	text: string;

    results: string[];

    search(event) {
        console.log(event.query);
    }





	showDialog(){
        this.display = true;
    }

	 getColorIndicador(e): string{
		let color : string;

			switch (e) {
				case 65:
					color = '#007dbb'
					break;
				case 63:
					color = '#00b5bb'
					break;
				case 62:
					color = '#00bb45'
					break;
				case 60:
					color = '#b2bb00'
					break;
				case 59:
					color = '#bb1c00'
					break;
			
				default:
					color = '#a76daa'
					break;
			}
			return color;
	}


	getIndicadores(){
		this.servicio.get('indicadores/departamento/tipo/'.concat(this.departamentoSeleccionado.codigoDepartamento).concat('/').concat(this.Tipo.toString())).subscribe( result =>{ 
			this.indicadoresSeleccionados = result;
			this.data = {
				"labels" : [],
				"datasets": [{
							label: this.indicadoresSeleccionados[0].nombreTipo, 
							backgroundColor: this.getColorIndicador(this.Tipo),
							borderColor: this.getColorIndicador(this.Tipo),
							data: []
				}]
			}; 
			  this.indicadoresSeleccionados.forEach(element => {
					this.data.labels.push(element.nombreMunicipio);
					this.data.datasets[0].data.push(element.valor);
			  });
		});
	}


	setTipoEstatidisticas(e){
		this.tipoEstadisticas = e;
		this.display = false;
	}


	cambiarGrafica(e){
		this.Tipo = e;
		this.getIndicadores();
	}


	ngOnInit() {


		this.servicio.get('indicadores/list').subscribe(result =>{this.Indicadores = result});
		this.servicio.get('departamentos/list').subscribe(
			result =>{
				this.departamentos = result;
				this.departamentoSeleccionado = this.departamentos[0];
				this.Tipo = 65;
				this.getMunicipios();
				this.getIndicadores();
			}

		)

		$(function () {


			$('#chat-conversation').slimscroll({
				height: '264px',
				size: '5px'
			});
			initCardChart();
			

			
		});

		function initCardChart() {


			//Chart Bar
			$('.chart.chart-bar').sparkline([6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5, 6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5], {
				type: 'bar',
				barColor: '#0986b7',
				negBarColor: '#fff',
				barWidth: '4px',
				height: '45px'
			});

			$('.chart.chart-bar2').sparkline([6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5, 6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5], {
				type: 'bar',
				barColor: '#6709b7',
				negBarColor: '#fff',
				barWidth: '4px',
				height: '45px'
			});

			$('.chart.chart-bar3').sparkline([6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5, 6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5], {
				type: 'bar',
				barColor: '#1e185b',
				negBarColor: '#fff',
				barWidth: '4px',
				height: '45px'
			});

			$('.chart.chart-bar4').sparkline([6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5, 6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5], {
				type: 'bar',
				barColor: '#78747f',
				negBarColor: '#fff',
				barWidth: '4px',
				height: '45px'
			});


			//Chart Pie
			$('.chart.chart-pie').sparkline([30, 35, 25, 8], {
				type: 'pie',
				height: '45px',
				sliceColors: ['#65BAF2', '#F39517', '#F44586', '#6ADF42']
			});


			//Chart Line
			$('.chart.chart-line').sparkline([9, 4, 6, 5, 6, 4, 7, 3], {
				type: 'line',
				width: '60px',
				height: '45px',
				lineColor: '#65BAF2',
				lineWidth: 2,
				fillColor: 'rgba(0,0,0,0)',
				spotColor: '#F39517',
				maxSpotColor: '#F39517',
				minSpotColor: '#F39517',
				spotRadius: 3,
				highlightSpotColor: '#F44586'
			});

			// live chart
			var mrefreshinterval = 500; // update display every 500ms
			var lastmousex = -1;
			var lastmousey = -1;
			var lastmousetime;
			var mousetravel = 0;
			var mpoints = [];
			var mpoints_max = 30;
			$('html').on("mousemove", function (e) {
				var mousex = e.pageX;
				var mousey = e.pageY;
				if (lastmousex > -1) {
					mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
				}
				lastmousex = mousex;
				lastmousey = mousey;
			});
			var mdraw = function () {
				var md = new Date();
				var timenow = md.getTime();
				if (lastmousetime && lastmousetime != timenow) {
					var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
					mpoints.push(pps);
					if (mpoints.length > mpoints_max)
						mpoints.splice(0, 1);
					mousetravel = 0;
					$('#liveChart').sparkline(mpoints, {
						width: mpoints.length * 2,
						height: '45px'
					});

					$('#liveChart2').sparkline(mpoints, {
						width: mpoints.length * 2,
						height: '45px',
						lineColor: '#f71616',
						fillColor: '#fc7878',

					});
				}
				lastmousetime = timenow;
				setTimeout(mdraw, mrefreshinterval);
			};
			// We could use setInterval instead, but I prefer to do it this way
			setTimeout(mdraw, mrefreshinterval);





			







		}
	
		

	}

	getAcronimo(e) : string{
		let acronimo : string;
		switch (e) {
				case 'Indice Desempeño Fiscal':
				acronimo = 'I.D.F.'
				break;
				case 'Capacidad de Ahorro':
				acronimo = 'C.A.'
				break;
				case 'Magnitud de La Inversión':
				acronimo = 'M.I.'
				break;
				case 'Generación de Recursos Propios':
				acronimo = 'G.R.P.'
				break;
				case 'Dependecia de Transferencias de La Nación':
				acronimo = 'D.T.'
				break;
		
			default:
				break;
		}
		return  acronimo;
	}


	getIndicadoresMunicipio(e){
		console.log(e);
		this.indicadoresMunicipio = null;
		setTimeout(() => {
			this.municipioSeleccionado = e;
		this.servicio.get('/indicadores/departamento/municipio/'.concat(this.departamentoSeleccionado.codigoDepartamento).concat('/').concat(this.municipioSeleccionado.municipio)).subscribe(result =>{
			this.indicadoresMunicipio = result;
		});

		}, 200);
	}


	getMunicipios(){
		this.servicio.get('municipios/departamento/'.concat(this.departamentoSeleccionado.codigoDepartamento)).subscribe(
			result =>{
				this.municipios = result;
				console.log('Municipios');
				console.log(this.municipios.length);
				console.log(this.municipios);
				if(this.municipios.length > 25){
					this.alto = '1400px';
				}else{
					this.alto = '400px';
				}

			}
		)
	}


	getIndicadoresDepartamento(e){
		console.log(e);
		this.departamentoSeleccionado = e;
		this.getMunicipios();
		this.cambiarGrafica(this.Tipo);
	}




	getDepartamentos(){
		this.servicio.get('departamentos/list').subscribe(
			result =>{
				this.departamentos = result;
			}
		)
	}




	dataInfo(e){
        let data;
        this.indicadoresSeleccionados.forEach(i => {
            if(i.nombreMunicipio === e.element._model.label){
                data = i;
            }
        });
        this.dataSeleccionada = data;
        this.showDialog();

	  } */
	  
	 

}
