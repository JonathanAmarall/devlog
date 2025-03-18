import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

export interface Log {
  title: string;
  description: string;
  category: string;
  tags: string[];
  projectId: string;
  status: LogStatus | string;
  attachments: {
    fileName: string;
    url: string;
  }[];
  createdAt: Date;
}
export interface PagedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: T[];
}

export enum LogStatus {
  Open = 0,
  Resolved,
  InProgress
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private baseUrl = environment.apiUrl + '/api/v1/log-entry';

  constructor(private http: HttpClient) { }

  createLog(log: Log): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl, log, { headers });
  }

  getLogs(pageNumber: number, pageSize: number, title?: string): Observable<PagedResponse<Log>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (title) {
      params = params.set('title', title);
    }

    return this.http.get<PagedResponse<Log>>(this.baseUrl, { params });
  }

  getLogById(id: string): Observable<Log> {
    return this.http.get<Log>(`${this.baseUrl}/${id}`);
  }

  updateLog(id: string, log: Log): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, log);
  }

  deleteLog(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
