import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from 'src/core/models/country.model';
import { CountryService } from 'src/core/services/country.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {

  editMode : boolean = false;

  countryForm = this.fb.group({
    id: [''],
    name: [''],
    continent: [''],
    capitalCity: [''],
    area: [''],
    population: [''],
    populationDensity: [''],
  });

  constructor(private fb : FormBuilder, private _countryService : CountryService, private _route : ActivatedRoute) { }

  ngOnInit(): void {
    this.loadEditMode();
  }

  loadEditMode(): void{
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.editMode = id != null;
      if(this.editMode)
      {
        this._countryService.getById(id).subscribe(country => this.initializeFormData(country));
      }
    });
  }

  initializeFormData(country : Country): void{
    this.countryForm.get('id')!.setValue(country.id);
    this.countryForm.get('name')!.setValue(country.name);
    this.countryForm.get('continent')!.setValue(country.continent);
    this.countryForm.get('capitalCity')!.setValue(country.capitalCity);
    this.countryForm.get('area')!.setValue(country.area);
    this.countryForm.get('population')!.setValue(country.population);
    this.countryForm.get('populationDensity')!.setValue(country.populationDensity);
  }

  handleSubmit(){
    if(!this.editMode){
      this._countryService.post(this.countryForm.value).subscribe();
    }
    else{
      this._countryService.patch(this.countryForm.value).subscribe();
    }
  }
}
