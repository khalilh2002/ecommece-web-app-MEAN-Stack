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
  dataUserByFemaleAndMale: any;
  dataCategoryByProductsCount: any;
  totalUsers = 0;
  totalCategories = 0;
  colors = {
    backgroundColor: [
      '#FF5733', // red
      '#33FF57', // green
      '#3357FF', // blue
      '#FF33A6', // pink
      '#FFBD33', // yellow
      '#33FFF6'  // cyan
    ],
    hoverBackgroundColor: [
      '#E74C3C', // darker red
      '#2ECC71', // darker green
      '#3498DB', // darker blue
      '#E84393', // darker pink
      '#F1C40F', // darker yellow
      '#1ABC9C'  // darker cyan
    ]
  };

  constructor(private staticsService: StaticsService) {}

  ngOnInit() {
    this.loadUserByFemaleAndMaleData();
    this.loadCategoryByProductsCountData();
  }

  private loadUserByFemaleAndMaleData() {
    this.staticsService.userByFemaleAndMale().subscribe({
      next: (res) => {
        this.totalUsers = res.totalUser;
        const totalFemale = res.totalFemale;
        const totalMale = res.totalMale;
        const totalUsers = res.totalUsers;
        
        this.dataUserByFemaleAndMale = [
          { label: 'Females', total: totalFemale },
          { label: 'Males', total: totalMale },
          { label: 'Others/Undefined', total: totalUsers - (totalFemale + totalMale) }
        ];
        
        const labels = this.dataUserByFemaleAndMale.map((item: { label:string; }) => item.label);
        const totals = this.dataUserByFemaleAndMale.map((item: { total: number; }) => item.total);
        
        this.dataUserByFemaleAndMale = {
          labels: labels,
          datasets: [
            {
              data: totals,
              backgroundColor: this.colors.backgroundColor,
              hoverBackgroundColor: this.colors.hoverBackgroundColor
            }
          ]
        };
      }
    });
  }

  private loadCategoryByProductsCountData() {
    this.staticsService.CategoriesByProductsCount().subscribe({
      next: (res) => {

        const values = res.map((item: any) => item);
        this.totalCategories = values.length
        const labels = values.map((item: { _id: string; }) => item._id);
        const counts = values.map((item: { count: number; }) => item.count);

        this.dataCategoryByProductsCount = {
          labels: labels,
          datasets: [
            {
              data: counts,
              backgroundColor: this.colors.backgroundColor,
              hoverBackgroundColor: this.colors.hoverBackgroundColor
            }
          ]
        };
      }
    });
  }
}
