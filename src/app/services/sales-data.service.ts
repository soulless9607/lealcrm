import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalesDataService {
  private salesDataSubject = new BehaviorSubject<any[]>([]);
  salesData$: Observable<any[]> = this.salesDataSubject.asObservable();

  constructor() {
    const mockSalesData = [
      { period: 'January', category: 'Electronics', client: 'Client A', amount: 1000 },
      { period: 'February', category: 'Clothing', client: 'Client B', amount: 1500 },
    ];

    this.salesDataSubject.next(mockSalesData);
  }

  updateSalesData(newData: any[]): void {
    this.salesDataSubject.next(newData);
  }


}
