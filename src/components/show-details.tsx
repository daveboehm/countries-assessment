import React, { useCallback } from 'react';
import { FormattedCountriesType } from '../types';
import { fetchCapitalCityData } from '../service/countries';
import { emptyCountryDetails } from '../constants';
import '../styles/show-details.scss';

type ShowDetailsProps = {
  data: FormattedCountriesType;
  onClick: (arg: any) => void;
};

export const ShowDetails = (props: ShowDetailsProps) => {
  const { data, onClick: setSelectedCountry } = props;
  const { capital, countryCode, countryName, currency } = data;

  const handleClick = useCallback(async () => {
    setSelectedCountry({ isLoading: true });
    try {
      const capitalPopulation: number = await fetchCapitalCityData(capital);

      setSelectedCountry({
        capital,
        countryName,
        countryCode,
        capitalPopulation,
        currency,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
      setSelectedCountry({
        ...emptyCountryDetails,
        isLoading: false,
        errorMsg: `Could not fetch data for ${capital}`
      });
    }
  }, [capital]);

  return (
    <button type="button" className="show-details-button" onClick={() => handleClick()}>
      {countryName}
    </button>
  );
};
