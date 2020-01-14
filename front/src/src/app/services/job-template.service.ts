import {Injectable} from '@angular/core';
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

  public getJobTemplates(): Observable<HttpResponse<Array<JobTemplate>>> {
    return this.http.get<Array<JobTemplate>>(backEndUrl + '/jobTemplate/get', {observe: 'response'});
  }

  public delete(jobTemplate: JobTemplate): Observable<HttpResponse<object>> {
    return this.http.delete(backEndUrl + '/jobTemplate/delete/' + jobTemplate.id, {observe: 'response'});
  }

  public put(jobTemplateToEdit: JobTemplate): Observable<HttpResponse<JobTemplate>> {
    return this.http.put<JobTemplate>(backEndUrl + '/jobTemplate/update', jobTemplateToEdit, {observe: 'response'});
  }
}
