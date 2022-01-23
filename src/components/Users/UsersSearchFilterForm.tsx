import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Field, Form, Formik, useFormik } from 'formik';
import React from 'react';
import { FilterType } from '../../types/types';
import { FilterInput, Input } from '../common/FormControls';

type PropsType = {
    filter: FilterType,

    onFilterSet: (filter: FilterType)=>void
}

const UsersSearchFilterForm = (props: PropsType) => {
    const formik = useFormik({
        initialValues: {
          term: '',
        },
        onSubmit: (values) => {
            props.onFilterSet({term: values.term, friend: null});
        },
      });
      
  return <div>
        <form onSubmit={formik.handleSubmit}>
        <TextField sx={{marginBottom: '10px', marginTop: '7px'}}
          id="term"
          name="term"
          label="Find Users"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.term}
        />
        <Button color="primary" variant="contained" type="submit" sx={{marginTop: '17px', marginLeft: '5px'}}>
          Find
        </Button>
        </form>
  </div>;
};

export default UsersSearchFilterForm;


//props.onFilterSet({term: values.term, friend: null});