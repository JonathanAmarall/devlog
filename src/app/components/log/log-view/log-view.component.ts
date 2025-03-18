import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Log, LogService, LogStatus } from '../services/log.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-log-view',
  imports: [MatDialogModule, CommonModule, MatButtonModule, MatDividerModule],
  templateUrl: './log-view.component.html',
  styleUrl: './log-view.component.css'
})
export class LogViewComponent implements OnInit {

  log?: Log;
  /**
   *
   */
  constructor(
    private readonly logService: LogService,
    @Optional() private dialogRef: MatDialogRef<LogViewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit(): void {
    console.log("LogViewComponent", this.data);
    this.logService.getLogById(this.data).subscribe(next => {
      this.log = next;
    })
  }
}
