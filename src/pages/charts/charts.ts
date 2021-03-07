import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { OrderService } from '../../service/order.service';
@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  allOrders: any;
  canvasList = ['barCanvas', 'doughnutCanvas', 'lineCanvas']

  constructor(public navCtrl: NavController, public navParams: NavParams, public orderService: OrderService) {
    orderService.getPastOrders().subscribe((data) => {
        this.allOrders = data;
        console.log(data);
    })
  }

  ionViewDidLoad() {
 
   this.initChart();

}
changeType(type)
{
  this.initChart();
}
initChart()
{
  this.canvasList.forEach((canvas) => {
    new Chart(this[canvas].nativeElement, {

    type: canvas.slice(0,canvas.length-6),
    data: {
        labels: ["Siddhi", "Surya", "Metal", "Glass", "Hybrid"],
        datasets: [{
            label: 'Units sold',
            data: [12, 19, 10, 5, 4],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }

});
})
}

}
