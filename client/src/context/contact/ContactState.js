import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        type: 'professional',
        name: 'Sarah Smith',
        email: 'ssmith@gmail.com',
        phone: '111-111-1111',
      },
      {
        id: 2,
        type: 'personal',
        name: 'Ted Johnson',
        email: 'ted@gmail.com',
        phone: '222-222-2222',
      },
      {
        id: 3,
        type: 'personal',
        name: 'Melissa Williams',
        email: 'melissa@gmail.com',
        phone: '777-777-7747',
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add item
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update contact

  // Filter contacts

  // Clear filter

  return (
    <ContactContext.Provider
      value={{
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        current: state.current,
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
