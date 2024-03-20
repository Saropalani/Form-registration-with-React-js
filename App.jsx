import React, {useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaCheckCircle, FaExclamationCircle, FaSort } from 'react-icons/fa';


function Form() {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState({
    'Employee Name': '',
    'Gender': '',
    'Department': '',
    'Date of Join': '',
    'Email': ''
  });

  const initialValues = {
    'Employee Name': '',
    'Gender': '',
    'Department': '',
    'Date of Join': '',
    'Email': ''
  };
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));

    setFormSuccess(prevState => ({
      ...prevState,
      [name]: value.trim() !==''
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const errors = validate(details);
    setFormError(errors);
    
    if (Object.keys(errors).length === 0) {
      setData([...data, details]);
      setDetails(initialValues);
      setFormSuccess('');
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  };
  

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (!values['Employee Name']) {
      errors['Employee Name'] = "Name is required";
    } 
    if (!values['Gender']) {
      errors['Gender'] = "Field is not filled";
    }
    if (!values['Department']) {
      errors['Department'] = "Field is not filled";
    }
    if (!values['Date of Join']) {
      errors['Date of Join'] = "Please enter a valid input";
    }
    if (!values['Email']) {
      errors['Email'] = "Email is required";
    } else if (!regex.test(values['Email'])) {
      errors['Email'] = "Please enter a valid email";
    }
    return errors;
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Employee Name', accessor: 'Employee Name' },
      { Header: 'Gender', accessor: 'Gender' },
      { Header: 'Department', accessor: 'Department' },
      { Header: 'Date of Join', accessor: 'Date of Join' },
      { Header: 'Email', accessor: 'Email' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <div>
  <form className='form-container' onSubmit={handleSubmit}>
    <h2 className='header'>FORM REGISTRATION</h2>
    <div className='input-group'>
  <label htmlFor='employeeName'>Employee Name</label>
  <input
    type='text'
    className={`input-field ${formSuccess['Employee Name'] ? 'success' : formError['Employee Name'] ? 'error' : ''}`}
    id='employeeName'
    name='Employee Name'
    value={details['Employee Name']}
    onChange={handleChange}
    style={{ border: formSuccess['Employee Name'] ? '2px solid green' : formError['Employee Name'] ? '2px solid red' : ''}}
  />
  {formSuccess['Employee Name'] && <FaCheckCircle className='fa-fa-circle' />}
  <div className='error' id='nameError'>{formError['Employee Name']}</div>
</div>

<br />

<div className='input-group'>
    <label htmlFor='gender'>Gender :</label>
    <select
      id='gender'
      name='Gender'
      className={`input-field ${formSuccess['Gender'] ? 'success' : ''}`}
      value={details['Gender']}
      onChange={handleChange}
      style={{ border: formSuccess['Gender'] ? '2px solid green' : formError['Gender'] ? '2px solid red' : ''}}
    >
      <option value=''>Select Gender</option>
      <option value='Male'>Male</option>
      <option value='Female'>Female</option>
      <option value='Others'>Others</option>
    </select>
    <div className='error' id='genderError'>{formError['Gender']}</div>
</div>

        <br />

        <div className='input-group'>
          <label htmlFor='department'>Department</label>
          <select
              id='department'
              className={`input-field ${formSuccess['Department'] && details['Department'] ? 'success' : ''}`}
              name='Department'
              value={details['Department']}
              onChange={handleChange}
              style={{ border: formSuccess['Department'] && details['Department'] ? '2px solid green' : formError['Department'] ? '2px solid red' : ''}}
            >

            <option value=''>Select Department</option>
            <option value='Operation'>Operation</option>
            <option value='Analytics'>Analytics</option>
            <option value='Marketing'>Marketing</option>
            <option value='Sales'>Sales</option>
          </select>
          <div className='error' id='deptError'>{formError['Department']}</div>
        </div>

        <br />

        <div className='input-group'>
  <label htmlFor='dateofJoin'>Date of Join</label>
  <input
    type='date'
    className={`input-field ${formSuccess['Date of Join'] ? 'success' : ''}`}
    id='dateofJoin'
    name='Date of Join'
    value={details['Date of Join']}
    onChange={handleChange}
    style={{ border: formSuccess['Date of Join'] ? '2px solid green' : formError['Date of Join'] ? '2px solid red' : ''}}
  />
  <div className='error' id='dateError'>{formError['Date of Join']}</div>
</div>


 <br />

  
<div className='input-group'>
  <label htmlFor='email'>Email</label>
  <input
    type='email'
    className={`input-field ${formSuccess['Email'] ? 'success' : ''}`}
    placeholder='example@gmail.com'
    id='email'
    name='Email'
    value={details['Email']}
    onChange={handleChange}
    style={{ border: formSuccess['Email'] ? '2px solid green' : formError['Email'] ? '2px solid red' : ''}}
  />
  {formSuccess['Email'] && <FaCheckCircle className='fa-fa-circle' />}
  <div className='error' id='emailError'>{formError['Email']}</div>
</div>

<br />

  <div>
    <button type='submit' className='submit-button'>Submit</button>
    <button type='reset' className='reset' onClick={() => setDetails(initialValues)}>Reset</button>
  </div>
</form>

<table
  id='table'
  className='table-container'
  style={{ display: data.length === 0 ? 'none' : 'table' }}
  {...getTableProps()}
>
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
            {column.render('Header')}
            <span>
              {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : <FaSort />}
            </span>
          </th>
        ))}
      </tr>
    ))}
  </thead>
  <tbody {...getTableBodyProps()}>
    {rows.map((row, rowIndex) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
          {row.cells.map((cell) => {
            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
          })}
        </tr>
      );
    })}
  </tbody>
</table>
</div>
  );
}

export default Form;
