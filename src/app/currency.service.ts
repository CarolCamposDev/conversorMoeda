import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ExchangeRate {
  result: string;
  conversion_rate: number;
  base_code: string;
  target_code: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/';
  private key = '042ea495731fe1fde7804fbd';

  constructor(private http: HttpClient) {}

  private buildApiUrl(endpoint: string): string {
    return `${this.apiUrl}${this.key}/${endpoint}`;
  }

  getSupportedCurrencies(): Observable<any> {
    return this.http.get(this.buildApiUrl('latest/BRL'));
  }

  getCurrenciesNames(): Observable<any> {
    return this.http.get(this.buildApiUrl('codes'));
  }

  converterMoeda(valor: number, moedaOrigem: string, moedaDestino: string): Observable<any> {
    const params = new HttpParams()
      .set('from', moedaOrigem)
      .set('to', moedaDestino)
      .set('amount', valor.toString());

    return this.http.get(this.buildApiUrl('convert'), { params });
  }

  getListaDeMoedas(): Observable<any> {
    return this.http.get(this.buildApiUrl('currencies'));
  }

  getExchangeRate(base: string, target: string, amount?: number): Observable<ExchangeRate> {
    let url = this.buildApiUrl(`pair/${base}/${target}`);
    if (amount) {
      url += `/${amount}`;
    }
    return this.http.get<ExchangeRate>(url);
  }
}
