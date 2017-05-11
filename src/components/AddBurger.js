
import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getAllCustomers } from '../reducers';
import moment from 'moment';
import * as _ from 'lodash';
import FetchError from './FetchError';

class AddBurger extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
    
  }

  fetchData() {
    console.log("fetching all the users >>>>>");
    const {fetchCustomers} = this.props;
    fetchCustomers('all');
  }

  render() {
    let {mycustomers, handleFormSubmit}  = this.props;
    let input, selection;
    let customerSelector=[];
    _.each(mycustomers, (customer,key)=>{
      console.log("customer is >>>", customer);
      customerSelector.push({value: customer.id, label: customer.customer_name});
    })
    return (
      <div>
        <form
          onSubmit={(event)=>{event.preventDefault(); handleFormSubmit(event, input.value, selection.value); input.value =""; selection.value="";}}
        >
          <label>Burger Name<input ref={node => { input = node; }} /></label>
          <label>Customer Id<input ref={node=> {selection = node;}} /></label>
        
          <button type="submit">
            Add Burger
          </button>
        </form>
      </div>
    );
  }
}

AddBurger.propTypes = {
  mycustomers: PropTypes.object.isRequired,
  fetchCustomers: PropTypes.func.isRequired,
};

const mapStateToProps = (state, {params}) => {
  const filter = params.filter || 'all';
  return {
    mycustomers: state.customers,
    filter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFormSubmit: (event, input, selection) => {
      let newBurger = _.assign({}, 
        {
          burger_name: input,
          devoured: false, 
          date: moment().format('YYYY-MM-DD HH:mm:ss'),
          customerId: selection
        });
      dispatch(actions.addBurger(newBurger));
    },
    fetchCustomers: filter => {
      dispatch(actions.fetchCustomers(filter));
    }
  }
}



AddBurger = withRouter(connect(
  mapStateToProps, 
  mapDispatchToProps,
)(AddBurger));

export default AddBurger;
