import { TableConfigType } from './types';

export const countriesBaseUrl = `https://countriesnow.space/api/v0.1/countries`;
export const tableConfig: TableConfigType[] = [
  {
    columnName: 'countryName',
    columnText: 'Name'
  },
  {
    columnName: 'countryCode',
    columnText: 'Code'
  },
  {
    columnName: 'population',
    columnText: 'Population'
  }
];

export const emptyCountryDetails = {
  countryName: '-',
  countryCode: '-',
  population: 0,
  capital: '-',
  capitalPopulation: 0,
  currency: '-',
  isLoading: false
};
