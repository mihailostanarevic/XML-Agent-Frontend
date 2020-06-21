import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  public mostKmT: any = null;
  public leastKmT: any = null;
  public mostComm: any = null;
  public leastComm: any = null;
  public mostRated: any = null;
  public leastRated: any = null;
  public bestAvg: any = null;
  public worstAvg: any = null;
  private user: any;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupData();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  private setupData(): void {
    this.reportService.getStatisticByAgent(this.user.id).subscribe(data => {
      this.mostKmT = data.brandNameMostKilometersTraveled
              + ': ' + data.modelNameMostKilometersTraveled
              + ': ' + data.mostKilometersTraveled;

      this.leastKmT = data.brandNameLeastKilometersTraveled
              + ' ' + data.modelNameLeastKilometersTraveled
              + ': ' + data.leastKilometersTraveled;

      this.mostComm = data.brandNameMostCommented
              + ' ' + data.modelNameMostCommented
              + ': ' + data.mostCommentedAd;

      this.leastComm = data.brandNameLeastCommented
              + ' ' + data.modelNameLeastCommented
              + ': ' + data.leastCommentedAd;

      this.mostRated = data.brandNameMostRated
              + ' ' + data.modelNameMostRated
              + ': ' + data.mostRateddAd;

      this.leastRated = data.brandNameLeastRated
              + ' ' + data.modelNameLeastRated
              + ': ' + data.leastRatedAd;

      this.bestAvg = data.brandNameBestRated
              + ' ' + data.modelNameBestRated
              + ': ' + data.bestAvgRating;

      this.worstAvg = data.brandNameWorstRated
              + ' ' + data.modelNameWorstRated
              + ': ' + data.worstAvgRating;
    });
  }

}
