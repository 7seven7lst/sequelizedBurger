import React, { PropTypes } from 'react';

const Burger = ({ onClick, devoured, burger_name, customer }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: devoured ? 'line-through' : 'none',
    }}
  >
    {burger_name}, order By: {customer.customer_name}
  </li>
);

Burger.propTypes = {
  onClick: PropTypes.func.isRequired,
  devoured: PropTypes.bool.isRequired,
  burger_name: PropTypes.string.isRequired,
  customer: PropTypes.object.isRequired,
};

export default Burger;
