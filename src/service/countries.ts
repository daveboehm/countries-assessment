import { CountryResponseType, FormattedCountriesType, PopulationDataType } from '../types';
import { countriesBaseUrl } from '../constants';

const mutateSuccessfulResponses = (countryResponses: CountryResponseType): FormattedCountriesType[] => {
  const [populationsData, currenciesData, capitalsData] = countryResponses;
  const { data: populations } = populationsData;
  const { data: currencies } = currenciesData;
  const { data: capitals } = capitalsData;

  const formattedData = populations.map((country: PopulationDataType) => {
    const currencyMatch = currencies.find(currency => country.iso3 === currency.iso3);
    const capitalMatch = capitals.find(capital => country.iso3 === capital.iso3);
    const latestPopulationCount = country.populationCounts.slice(-1);

    return {
      countryName: country.country,
      countryCode: country.code,
      capital: capitalMatch?.capital ?? '',
      currency: currencyMatch?.currency ?? '',
      population: latestPopulationCount[0].value
    };
  });

  return formattedData.sort((a, b) => {
    return a.countryName.localeCompare(b.countryName);
  });
};

export const fetchCapitalCityData = async (city: string): Promise<number> => {
  const capitalCityData = await fetch(`${countriesBaseUrl}/population/cities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      city: city
    })
  }).then(res => {
    if (res.ok) return res.json();
    throw Error(`Error fetching capital city data for ${city}.`);
  });

  return capitalCityData.data.populationCounts.slice(-1)[0].value;
};
export const fetchAllCountriesData = async (): Promise<FormattedCountriesType[]> => {
  const populations = fetch(`${countriesBaseUrl}/population`).then(res => {
    if (res.ok) return res.json();
    throw Error('Error fetching population data');
  });
  const currencies = fetch(`${countriesBaseUrl}/currency`).then(res => {
    if (res.ok) return res.json();
    throw Error('Error fetching currency data');
  });
  const capitals = fetch(`${countriesBaseUrl}/capital`).then(res => {
    if (res.ok) return res.json();
    throw Error('Error fetching capitals data');
  });

  return Promise.all([populations, currencies, capitals]).then(mutateSuccessfulResponses);
};
