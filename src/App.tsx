import React, { useState, useEffect } from 'react';
import { fetchAllCountriesData } from './service/countries';
import { CountriesList } from './components/countries-list';
import { FormattedCountriesType } from './types';
import './styles/styles.scss';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [countriesList, setCountriesList] = useState<FormattedCountriesType[]>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response: FormattedCountriesType[] = await fetchAllCountriesData();
        setCountriesList(response);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching country data', err);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return <div>{isLoading ? <p>Imagine this is a beautiful spinner</p> : <CountriesList data={countriesList} />}</div>;
}

export default App;
