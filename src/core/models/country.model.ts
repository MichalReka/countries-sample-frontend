export class Country{
    id!: string;
    name : string | undefined;
    continent : string | undefined;
    capitalCity : string | undefined;
    area : number | undefined;
    population : number | undefined;
    populationDensity : number | undefined;
    createdAt : Date | undefined;
    updatedAt : Date | undefined;
}

export class CountriesGetResult{
    data! : Country[];
    metadata : Object | undefined;
}

export class CountryGetResult{
    data! : Country;
    metadata : Object | undefined;
}