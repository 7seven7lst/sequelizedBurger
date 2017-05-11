import React, { PropTypes } from 'react';
import TextInput from 'grommet/components/TextInput';
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Deploy from 'grommet/components/icons/base/Deploy';

import { connect } from 'react-redux';
import { addCustomer } from '../actions';
import * as _ from 'lodash';

const AddCustomer = ({ dispatch }) => {
  let input;

  return (
    <div>
      <Columns>
        <Box align='center'
          pad='medium'
          margin='small'
          colorIndex='light-2'>
          <Form
            onSubmit={e => {
              e.preventDefault();
              console.log("submitting")
              if (!input.trim()) {
                return;
              }
              let newCustomer = _.assign({}, 
                {
                  customer_name: input,
                });
              dispatch(addCustomer(newCustomer));
              input.value = '';
            }}
          >
            <FormFields>
              <TextInput 
              onDOMChange={e=>{input = e.target.value}} 
              ref={node => { input = node; }} 
              />
            </FormFields>
            <Footer>
              <Button icon={<Deploy />}
                label='Add Customer'
                type='submit'
                primary={true}
               />
            </Footer>
          </Form>
        </Box>
      </Columns>
    </div>
  );
};

AddCustomer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddCustomer);
