import React from 'react';

import { SearchIcon } from './icons/SearchIcon';
import { LoadingIcon } from './icons/LoadingIcon';

function SearchBoxComponent(props) {
  const { onReset } = props.getFormProps({
    inputElement: props.inputRef.current,
  });
  return (
    <>
      <form
        className="DocSearch-Form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
        onReset={onReset}
      >
        <label className="DocSearch-MagnifierLabel" {...props.getLabelProps()}>
          <SearchIcon />
        </label>

        <div className="DocSearch-LoadingIndicator">
          <LoadingIcon />
        </div>

        <input
          className="DocSearch-Input"
          placeholder="Search"
          type="search"
          {...props.getInputProps({
            inputElement: props.inputRef.current,
            autoFocus: props.query.length === 0,
            maxLength: 64,
          })}
        />

        <div className="DocSearch-PlatformLabel">in {props.platform}</div>
      </form>

      <button className="DocSearch-Cancel" onClick={props.onClose}>
        Cancel
      </button>
    </>
  );
}

export const SearchBox = SearchBoxComponent;
