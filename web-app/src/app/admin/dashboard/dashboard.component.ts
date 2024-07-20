import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { StaticsService } from '../../service/statics.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any;

  totalUsers:number = 0 ;
  totalFemale:number =0;
  totalMale:number =0;

  constructor(private staticsService :StaticsService){
    
   

  }

  ngOnInit() {
    this.staticsService.userByFemaleAndMale().subscribe({
      next:(res)=>{
        this.totalFemale = res.totalFemale ;
        this.totalMale = res.totalMale ;
        this.totalUsers = res.totalUsers;
        
        this.data = [
          { label: 'Females', total: this.totalFemale },
          { label: 'Males', total: this.totalMale },
          { label: 'Others/Undefined', total: this.totalUsers - (this.totalFemale + this.totalMale) }
        ];
        
        const labels = this.data.map((item: { label: string; }) => item.label);
        const totals = this.data.map((item: { total: number; }) => item.total);
    
        console.log(labels , totals);
        
    
        this.data = {
          labels: labels,
          datasets: [
            {
              data: totals,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ]
            }
          ]
        };
      }
    })

    
    
   
  }

}
