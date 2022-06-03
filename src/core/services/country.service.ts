import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { catchError, map, Observable, of, take, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { CountriesGetResult, Country, CountryGetResult } from "../models/country.model";

@Injectable({
    providedIn: 'root',
})
export class CountryService{
    countries : Country[];
    
    public constructor(public http: HttpClient, private _snackBar: MatSnackBar, private _router: Router){
        this.countries = [];
    }

    public get() : Observable<Country[]>{
        return this.http.get<CountriesGetResult>(environment.api+'/countries').pipe(
            take(1),
            map(result => result.data));
    }

    public getById(id : string) : Observable<Country>{
        return this.http.get<CountryGetResult>(environment.api+'/countries/'+id).pipe(
            take(1),
            map(result => result.data));
    }

    public post(entity : Country) : Observable<Country>{
        return this.http.post<Country>(environment.api+'/countries', entity).pipe(
            take(1),
            tap(_ =>{
                this._snackBar.open('Pomyślnie dodano kraj', 'Zamknij', {
                    duration: 3000
                  });
                  this._router.navigate(['']);
            }),
            catchError(_ =>{
                this._snackBar.open('Wystąpił błąd z żądaniem', 'Zamknij', {
                    duration: 3000
                  });
                  return of();
            }));
    }

    public patch(entity : Country) : Observable<Country>{
        return this.http.patch<Country>(environment.api+'/countries/'+entity.id, entity).pipe(
            take(1),
            tap(_ =>{
                this._snackBar.open('Edycja zakończyła się pomyślnie', 'Zamknij', {
                    duration: 3000
                  });
                  this._router.navigate(['']);
            }),
            catchError(_ =>{
                this._snackBar.open('Wystąpił błąd z żądaniem', 'Zamknij', {
                    duration: 3000
                  });
                  return of();
            }));
    }

    public delete(id : string) : Observable<unknown>{
        return this.http.delete(environment.api+'/countries/'+id).pipe(
            take(1),
            tap(_ =>{
                this._snackBar.open('Usunięto kraj', 'Zamknij', {
                    duration: 3000
                  });
            }),
            catchError(_ =>{
                this._snackBar.open('Wystąpił błąd z żądaniem', 'Zamknij', {
                    duration: 3000
                  });
                  return of();
            }));
    } 
}