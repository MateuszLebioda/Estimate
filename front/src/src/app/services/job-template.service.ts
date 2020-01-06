import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {backEndUrl} from '../utils/static';
import {KeyCloakService} from '../utils/key-cloak-service';
import {JobTemplate} from '../model/job-template';

@Injectable({
  providedIn: 'root'
})
export class JobTemplateService {

  constructor(private keyCloakService: KeyCloakService, private http: HttpClient) {
  }

  public addJobTemplate(jobTemplate: JobTemplate): Observable<HttpResponse<number>> {
    return this.http.post<number>(backEndUrl + '/jobTemplate/add', jobTemplate, {observe: 'response'});
  }

  public getJobTemplates(): Observable<HttpResponse<JobTemplate>> {
    return this.http.get<JobTemplate>(backEndUrl + '/jobTemplate/get', {observe: 'response'});
  }
}
