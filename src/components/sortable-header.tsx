import React, { useState, useEffect } from 'react';
import { FormattedCountriesType } from '../types';
import '../styles/sortable-header.scss';

type SortableHeaderProps = {
  columnName: keyof FormattedCountriesType;
  columnText: string;
  isCurrentSortedColumn: boolean;
  onClick: (colName: keyof FormattedCountriesType) => void;
  sortedDir: number;
};

export const SortableHeader = (props: SortableHeaderProps) => {
  const { columnName, columnText, isCurrentSortedColumn, onClick: handleClick, sortedDir } = props;
  const [sortArrow, setSortArrow] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setSortArrow(
      isCurrentSortedColumn ? (
        <span className={`arrow ${sortedDir < 0 ? 'up' : 'down'}`}></span>
      ) : (
        <span className="arrow"></span>
      )
    );
  }, [isCurrentSortedColumn, sortedDir]);

  return (
    <div className="sortable-header">
      <button
        type="button"
        className={`flex p-text text-left ${isCurrentSortedColumn ? 'active-sort' : ''}`}
        onClick={() => handleClick(columnName)}
      >
        {columnText} {sortArrow}
      </button>
    </div>
  );
};
