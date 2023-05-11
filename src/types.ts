export type CurrencyDataType = {
  name: string;
  currency: string;
  iso2: string;
  iso3: string;
};

export type CapitalDataType = {
  name: string;
  capital: string;
  iso2: string;
  iso3: string;
};

type PopulationYear = {
  year: number;
  value: number;
};

export type PopulationDataType = {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationYear[];
};

type BaseResponseType = {
  error: boolean;
  msg: string;
};

type PopulationsType = BaseResponseType & {
  data: PopulationDataType[];
};
type CurrenciesType = BaseResponseType & {
  data: CurrencyDataType[];
};
type CapitalsType = BaseResponseType & {
  data: CapitalDataType[];
};

export type CountryResponseType = [PopulationsType, CurrenciesType, CapitalsType];

export type FormattedCountriesType = {
  countryName: string;
  countryCode: string;
  capital: string;
  currency: string;
  population: number;
};

export type TableConfigType = {
  columnName: keyof FormattedCountriesType;
  columnText: string;
};

export type CountryDetails = {
  countryName: string;
  countryCode: string;
  capital: string;
  capitalPopulation: number;
  currency: string;
  isLoading: boolean;
  errorMsg?: string | undefined;
};
