import { Schema, arrayOf } from 'normalizr';

export const burger = new Schema('burgers');
export const customer = new Schema('customers');

export const arrayOfBurgers = arrayOf(burger);
export const arrayOfCustomers = arrayOf(customer);
