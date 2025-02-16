import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Log, LogService, LogStatus } from '../services/log.service';
import { DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss'],
  imports: [
    RouterModule,
    MatPaginator,
    MatTableModule,
    DatePipe,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class LogTableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'tags', 'status', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Log>();
  totalCount: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private logService: LogService, private router: Router) { }

  ngOnInit(): void {
    this.loadLogs(1, 10);
  }

  loadLogs(pageNumber: number, pageSize: number) {
    this.logService.getLogs(pageNumber, pageSize).subscribe(response => {
      this.dataSource.data = response.items;
      this.totalCount = response.totalCount;
    });
  }

  onPageChange(event: any) {
    this.loadLogs(event.pageIndex + 1, event.pageSize);
  }

  handleStatus(status: LogStatus) {
    return LogStatus[status];
  }

  handleAddLog() {
    this.router.navigateByUrl('log/log-form')
  }
}
