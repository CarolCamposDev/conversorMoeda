import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CurrencyService } from '../currency.service';

interface Currency {
  symbol: string;
  name: string;
}

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.css']
})
export class CurrencyTableComponent implements OnInit {
  @Output() tableHeightChanged = new EventEmitter<number>();
  displayedColumns: string[] = ['symbol', 'name'];
  dataSource = new MatTableDataSource<Currency>([]);

  @ViewChild('input') input: HTMLInputElement | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private currencyService: CurrencyService) {}

  onTableHeightChanged(height: number) {
    this.tableHeightChanged.emit(height);
  }

  ngOnInit() {
    this.currencyService.getCurrenciesNames().subscribe(
      (response) => {
        if (response.result === 'success' && response.supported_codes) {
          const currenciesArray: Currency[] = response.supported_codes.map((currency: any) => ({
            symbol: currency[0],
            name: currency[1]
          }));
          this.dataSource.data = currenciesArray;
        }
      },
      (error) => {
        console.error('Erro na solicitação:', error);
      }
    );
  }

  ngAfterViewInit() {
  if (this.paginator) {
    this.dataSource.paginator = this.paginator;
  }
  if (this.sort) {
    this.dataSource.sort = this.sort;
  }
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
