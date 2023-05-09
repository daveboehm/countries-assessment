import React, { useState, useEffect } from 'react';
import { CountryDetails, FormattedCountriesType } from '../types';
import { SortableHeader } from './sortable-header';
import { ShowDetails } from './show-details';
import { CountryDetailsPanel } from './country-details-panel';
import { emptyCountryDetails, tableConfig } from '../constants';

type CountriesListProps = {
  data: FormattedCountriesType[] | undefined;
};

export const CountriesList = (props: CountriesListProps) => {
  const { data = [] } = props;
  const [sortDir, setSortDir] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<keyof FormattedCountriesType>('countryName');
  const [filterTerm, setFilterTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<CountryDetails>(emptyCountryDetails);
  const [displayedData, setDisplayedData] = useState<FormattedCountriesType[]>(data);

  useEffect(() => {
    const filteredData = data.filter(row => {
      return (
        row.countryName.toLowerCase().includes(filterTerm.toLowerCase()) ||
        row.countryName.toLowerCase().includes(filterTerm.toLowerCase())
      );
    });
    setDisplayedData(filteredData);
  }, [data, filterTerm]);

  const handleSort = (colName: keyof FormattedCountriesType) => {
    const newSortDirection = colName === sortColumn ? sortDir * -1 : 1;

    setSortDir(newSortDirection);
    setSortColumn(colName);

    const sortedData = displayedData.sort((a, b) => {
      if (colName === 'population') {
        return (a.population - b.population) * newSortDirection;
      }
      return newSortDirection > 0
        ? a[colName].toString().localeCompare(b[colName].toString())
        : b[colName].toString().localeCompare(a[colName].toString());
    });
    setDisplayedData(sortedData);
  };

  return (
    <div className="countries-list-wrapper">
      <input
        type="text"
        data-testid="filter-input"
        className="filter"
        placeholder="Filter by country name or code"
        onChange={e => setFilterTerm(e.target.value)}
      />

      <div className="data-display-wrapper">
        <div className="scroller">
          <table className="table">
            <thead>
              <tr className="headers row">
                {tableConfig.map((column, idx) => (
                  <th key={column.columnName ?? idx} className="col">
                    <SortableHeader
                      columnName={column.columnName}
                      columnText={column.columnText}
                      isCurrentSortedColumn={column.columnName === sortColumn}
                      onClick={handleSort}
                      sortedDir={sortDir}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedData.map(row => (
                <tr
                  className={`row ${row.countryCode === selectedCountry?.countryCode ? 'selected' : ''}`}
                  key={row.countryCode}
                >
                  <td className="col countryName">
                    <ShowDetails data={row} onClick={setSelectedCountry} />
                  </td>
                  <td className="col countryCode">{row.countryCode}</td>
                  <td className="col population">{row.population.toLocaleString('en-US')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CountryDetailsPanel {...selectedCountry} />
      </div>
    </div>
  );
};
