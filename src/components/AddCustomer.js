import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addCustomer } from '../actions';
import * as _ from 'lodash';

const AddCustomer = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          let newCustomer = _.assign({}, 
            {
              customer_name: input.value,
            });
          dispatch(addCustomer(newCustomer));
          input.value = '';
        }}
      >
        <input ref={node => { input = node; }} />
        <button type="submit">
          Add Customer
        </button>
      </form>
    </div>
  );
};

AddCustomer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddCustomer);
