import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Country } from 'src/core/models/country.model';
import { CountryService } from 'src/core/services/country.service';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements OnInit, AfterViewInit {

  countries : MatTableDataSource<Country>;
  selectedCountry : Country | undefined;
  displayedColumns : string[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _countryService : CountryService, private _router : Router) {
    this.countries = new MatTableDataSource();
    this.displayedColumns = ["id","name","continent","capitalCity","area","population","populationDensity"];
   }
  
  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel="Rekordy na stronę: ";
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} z ${length}`;
    };
    this.countries.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.selectedCountry = undefined;
    this._countryService.get().subscribe(countries =>{
      this.countries = new MatTableDataSource(countries);
      this.countries.paginator = this.paginator;
    })
  }

  selectCountry(country : Country): void{
    this.selectedCountry = country;
  }

  deleteCountry(): void{
    this._countryService.delete(this.selectedCountry!.id).subscribe(_ =>{
      this.countries.data = this.countries.data.filter(country => country.id !== this.selectedCountry!.id);
    });
  }

  navigateToEdit(): void{
    this._router.navigate(['/form', { id: this.selectedCountry!.id }]);
  }

}
