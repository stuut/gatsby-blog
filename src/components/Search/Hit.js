import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";


const Hit = props => {
  const {hit} = props;

  return (
    <div>
    <Link to={hit.fields.slug}>
      {hit.frontmatter.title}
    </Link>
    <img src={hit.frontmatter.mainImage}/>
</div>
  );
};

export default Hit
