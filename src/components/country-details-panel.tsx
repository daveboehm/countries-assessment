import React, { useState, useEffect } from 'react';
import { CountryDetails } from '../types';

export const CountryDetailsPanel = (props: CountryDetails) => {
  const { countryName, countryCode, capital, capitalPopulation, currency, isLoading = false, errorMsg } = props;

  const detailsData = (<table className="country-details">
    <tbody>
    <tr>
      <td>
        <b>Country Name:</b>
      </td>
      <td>{countryName}</td>
    </tr>
    <tr>
      <td>
        <b>Country Code:</b>
      </td>
      <td>{countryCode}</td>
    </tr>
    <tr>
      <td>
        <b>Capital City:</b>
      </td>
      <td>{capital}</td>
    </tr>
    <tr>
      <td>
        <b>Capital Population:</b>
      </td>
      <td>{Number(capitalPopulation).toLocaleString('en-US')}</td>
    </tr>
    <tr>
      <td>
        <b>Currency:</b>
      </td>
      <td>{currency}</td>
    </tr>
    </tbody>
  </table>);
  const errorState = (
      <p className="error">{errorMsg}</p>
  );
  const displayedContent = errorMsg ? errorState : detailsData;

  return (
    <div className="country-details-panel" data-testid="details-panel">
      {isLoading ? (
        <div className="spinning-thing" />
      ) : (
          displayedContent
      )}
    </div>
  );
};
