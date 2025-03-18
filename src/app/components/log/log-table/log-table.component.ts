import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Log, LogService, LogStatus } from '../services/log.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LogViewComponent } from '../log-view/log-view.component';

@Component({
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatPaginator,
    MatTableModule,
    DatePipe,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class LogTableComponent implements OnInit {
  filterTitle = new Subject<string>();

  displayedColumns: string[] = ['title', 'tags', 'status', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Log>();
  totalCount: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private logService: LogService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.filterTitle
      .pipe(debounceTime(500))
      .subscribe((value) =>
        this.loadLogs(1, 10, value)
      );
  }

  ngOnInit(): void {
    this.loadLogs(1, 10);
  }

  loadLogs(pageNumber: number, pageSize: number, title?: string) {
    this.logService.getLogs(pageNumber, pageSize, title).subscribe(response => {
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

  show(id: string) {
    this.dialog.open(LogViewComponent, { data: id });
  }
}
