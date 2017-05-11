import React from 'react';
import FilterLink from './FilterLink';

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="all">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="available">
      Available
    </FilterLink>
    {", "}
    <FilterLink filter="devoured">
      Devoured
    </FilterLink>
  </p>
);

export default Footer;
