import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputMask from 'react-input-mask';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CustomerCreateRequest } from '../Profile/profile_pb';
import { client } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type FormData = {
  username: string;
  firstName: string;
  lastName: string;
  birthday: string;
  adress: string;
  phone: string;
  gender: string;
};
function CreateCustomer() {
  const showToastMessage = () => {
    toast.success('Successfully created !', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const { reset, register, handleSubmit } = useForm<FormData>();
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54')
  );

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  const onSubmit = (data: any) => {
    console.log(data, 'dayjs');
    const customer = new CustomerCreateRequest();
    customer.setUsername(data.username);
    customer.setFirstName(data.firstName);
    customer.setLastName(data.lastName);
    customer.setBirthdate(data.birthday);
    customer.setAddress(data.adress);
    customer.setGender(data.gender);
    customer.setPhoneNumber(data.phone);
    customer.setImageUrl('path/customer');
    console.log(customer);
    client
      .doCustomerCreate(customer, null)
      .then((response) => {
        console.log(response, 'response');
        showToastMessage();
        // <ToastContainer />
      })
      .catch((error) => {
        console.log(error, 'error');
      })
      .finally(() => {
        reset();
      });
  };
  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        '& > :not(style)': {
          m: 4,
          width: '45ch',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      noValidate
      autoComplete='off'
    >
      <ToastContainer />
      <TextField
        {...register('username')}
        id='outlined-basic'
        label='UserName'
        variant='outlined'
      />
      <TextField
        {...register('firstName')}
        id='outlined-basic'
        label='FirstName'
        variant='outlined'
      />
      <TextField
        {...register('lastName')}
        id='outlined-basic'
        label='LastName'
        variant='outlined'
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          {...register('birthday')}
          label='Date desktop'
          inputFormat='MM/DD/YYYY'
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <TextField
        {...register('phone')}
        name='phone'
        type='text'
        id='outlined-basic'
        label='Phone'
        variant='outlined'
      >
        <InputMask mask='(0)999 999 99 99' maskChar=' ' />
      </TextField>
      <TextField
        {...register('adress')}
        id='outlined-basic'
        label='Adress'
        variant='outlined'
      />
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
        <Select
          {...register('gender')}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Gender'
          defaultValue={1}
          //   onChange={handleChange}
        >
          <MenuItem value={1}>Male</MenuItem>
          <MenuItem value={2}>Female</MenuItem>
        </Select>
      </FormControl>
      <Button variant='contained' color='primary' type='submit'>
        submit
      </Button>
    </Box>
  );
}
export default CreateCustomer;
