import 'grommet/scss/vanilla/index';
import React, { Component, PropTypes } from 'react';
import TextInput from 'grommet/components/TextInput';
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Select from 'grommet/components/Select';
import Label from 'grommet/components/Label';
import Deploy from 'grommet/components/icons/base/Deploy';
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
      customerSelector.push({value: customer.id, label: customer.customer_name});
    })
    return (
      <div>
        <Columns>
          <Box align='center'
            pad='medium'
            margin='small'
            colorIndex='light-2'>
            <Form
              onSubmit={(event)=>{event.preventDefault(); handleFormSubmit(event, input, selection); }}
            >
              <FormFields>
                <Box align='center'
                  pad='medium'
                  margin='small'
                  colorIndex='light-2'>
                  <Label>
                    Burger Name
                  </Label>
                  <TextInput 
                    onDOMChange={e=>{input = e.target.value}} 
                    ref={node => { input = node; }} 
                  />

                
                  <Label>
                    Customer Name
                  </Label>
                  <Select 
                    options={customerSelector}
                    onChange={(value)=>{console.log("!!!!!!!", value); selection=value.value.value}} 
                  />

                </Box>
              </FormFields>
              <Footer>
                <Button icon={<Deploy />}
                  label='Add Burger'
                  type='submit'
                  primary={true}
                 />
              </Footer>
            </Form>
          </Box>
        </Columns>
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
      console.log("input is>>>>", input);
      console.log("selection is>>>", selection);
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
