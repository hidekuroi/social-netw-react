import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/redux-store';
import { FilterType } from '../../types/types';

type PropsType = {
    filter: FilterType,

    onFilterSet: (filter: FilterType)=>void
}

const UsersSearchFilterForm = (props: PropsType) => {
    const isAuth = useSelector((state: RootState)=>{ return state.auth.isAuth})

    const formik = useFormik({
        initialValues: {
          term: '',
          friend: null as null | boolean | string
        },
        onSubmit: (values) => {

            if(values.friend == 'null') values.friend = null;
            if(values.friend == 'true') values.friend = true;
            if(values.friend == 'false') values.friend = false;
            //@ts-ignore
            props.onFilterSet({term: values.term, friend: values.friend});
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
        {isAuth &&
            <FormControl>
              <InputLabel id="is-followed-label" sx={{marginTop: '7px', marginLeft: '4px'}}>Is Followed</InputLabel>
              <Select sx={{ minWidth: '12em', marginBottom: '0px', marginTop: '7px', marginLeft: '5px' }}
                labelId="is-followed-label"
                id="friend"
                name="friend"
                
                label="Is followed"
                onChange={formik.handleChange}
                value={formik.values.friend}
              >
                <MenuItem value={'null'}>All</MenuItem>
                <MenuItem value={'true'}>Only followed</MenuItem>
                <MenuItem value={'false'}>Only unfollowed</MenuItem>
              </Select>
            </FormControl>
        }
        <Button color="primary" variant="contained" type="submit" sx={{marginTop: '17px', marginLeft: '5px'}}>
          Find
        </Button>
        </form>
  </div>;
};

export default UsersSearchFilterForm;


//props.onFilterSet({term: values.term, friend: null});