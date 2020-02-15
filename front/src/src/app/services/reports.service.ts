import {Injectable} from '@angular/core';
import {KeyCloakService} from '../utils/key-cloak-service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {backEndUrl} from '../utils/static';
import {DatePipe} from '@angular/common';
import {saveAs} from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private keyCloakService: KeyCloakService, private http: HttpClient, private datepipe: DatePipe) {
  }

  public getMaterialsPriceListResponse() {
    return this.http.get<any>(backEndUrl + '/reports/getMaterialPriceList', {responseType: 'arraybuffer' as 'json'});
  }

  public getServicesPriceListResponse() {
    return this.http.get<any>(backEndUrl + '/reports/getServicesPriceListResponse', {responseType: 'arraybuffer' as 'json'});
  }

  public generateEstimateReportResponse(id: number) {
    return this.http.get<any>(backEndUrl + '/reports/getEstimateReport/' + id, {responseType: 'arraybuffer' as 'json'});
  }

  public generateServicePriceListReport() {
    this.getServicesPriceListResponse().subscribe(response => {
      const date = this.datepipe.transform(new Date(), 'yyyy_MM_dd');
      const blob = new Blob([response], {type: 'application/pdf'});
      saveAs(blob, 'Cennik_usugi_' + date + '.pdf');
    });
  }

  public generateMaterialsPriceListReport() {
    this.getMaterialsPriceListResponse().subscribe(response => {
      const date = this.datepipe.transform(new Date(), 'yyyy_MM_dd');
      const blob = new Blob([response], {type: 'application/pdf'});
      saveAs(blob, 'Cennik_materialy_' + date + '.pdf');
    });
  }

  public generateEstimateReport(id: number) {
    this.generateEstimateReportResponse(id).subscribe(response => {
      const date = this.datepipe.transform(new Date(), 'yyyy_MM_dd');
      const blob = new Blob([response], {type: 'application/pdf'});
      saveAs(blob, 'Kosztorys_' + date + '.pdf');
    });
  }

}
