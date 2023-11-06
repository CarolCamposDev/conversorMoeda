import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.css']
})
export class CurrencyTableComponent implements OnInit {
  currencies: any[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getCurrencyList().subscribe((data) => {
      this.currencies = Object.keys(data.rates).map((code) => ({ code, name: data.rates[code] }));
    });
  }
}
