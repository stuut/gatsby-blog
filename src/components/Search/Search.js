import React from "react";
import PropTypes from "prop-types";
import { InstantSearch, SearchBox, Hits, Stats, Highlight, Pagination } from "react-instantsearch/dom";

import Hit from "./Hit";


class Search extends React.Component {
render() {
  return (
    <div>

          <InstantSearch
          appId="XO41XKK6M6"
          apiKey="c64f3a6ff1a39506621a4cf04600641f"
          indexName="morethanmulch"
          >
            <SearchBox translations={{ placeholder: "Search" }} />
            <Stats />
            <Hits hitComponent={Hit} />

            <Pagination />
          </InstantSearch>

    </div>
  );
 }
}


export default Search
