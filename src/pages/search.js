import React from "react";
import PropTypes from "prop-types";
import Search from "../components/Search";
import './search.css'

const SearchPage = props => {
  const { data } = props;

  return (
    <div>
      <div>
        <Search/>
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default SearchPage;

//eslint-disable-next-line no-undef
