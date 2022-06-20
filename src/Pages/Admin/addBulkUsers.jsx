import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import {
  Dialog, Button, Input, Box,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { acceptableFileName } from '../../Config/constant';
import { ADD_BULK_USERS } from '../../ApolloClient/mutation';

const AddBulkUsers = (props) => {
  const { open, onClose, onSubmit } = props;

  const [addBulkUsers] = useMutation(ADD_BULK_USERS);

  const [data, setData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [fileValidation, setFileVAlidation] = useState('');

  const readExcel = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    const checkFileName = (name) => acceptableFileName.includes(name.split('.').pop().toLowerCase());

    if (!checkFileName(file.name)) {
      setFileVAlidation('File should be in xlsx / xls / csv format');
      return;
    }
    setFileVAlidation('');
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const ws1 = XLSX.read(bufferArray, { type: 'file' }).Sheets.Sheet1;
      const sheetData = XLSX.utils.sheet_to_json(ws1);
      setIsDisabled(false);
      resolve(sheetData);
    };
    fileReader.onerror = (error) => {
      setIsDisabled(true);
      reject(error);
    };
  });

  const saveFile = () => {
    saveAs(
      'https://docs.google.com/spreadsheets/d/1I-pqMm1odhkygJkoC1Hn-c-zrWrgGg304bY1ylYDScY/edit#gid=0',
      'addBulkUsers.xlsx',
    );
  };

  const handleOnSubmit = async () => {
    const addBulkUsersOutput = await addBulkUsers({
      variables: {
        input: {
          usersArray: data,
        },
      },
    });
    if (addBulkUsersOutput.data.addBulkUsers.status === 200) {
      onSubmit();
    } else {
      onSubmit();
    }
  };

  return (
    <Dialog open={open} sx={{ '& .MuiDialog-paper': { width: '70%', height: '65%' } }}>
      <center>
        <h2>Add Bulk Users</h2>
        <Input
          accept=".csv, .xlsx, xls"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file)
              .then((excelData) => {
                setData(excelData);
              })
              .catch((error) => console.log('CATCH BLOCK in AddBulkUsers => ', error));
          }}
        />
        {fileValidation && <p style={{ color: 'red' }}>{fileValidation}</p>}
      </center>
      <Box style={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
      }}
      >
        <ul>
          <b>Note</b>
          <li>File Should be in excel format only </li>
          <li>Other file extensions are not supported eg.(png, pdf, ppt) </li>
          <li>No blank ROWs are allowed in file </li>
          <li>
            Update the data in the sheet
            {' '}
            <Button onClick={saveFile}>VIEW SHEET</Button>
            {' '}
          </li>
        </ul>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: 'black',
            borderColor: '#0063cc',
            '&:hover': {
              color: 'white',
              backgroundColor: 'black',
              borderColor: 'black',
            },
          }}
        >
          Cancel

        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          onClick={() => handleOnSubmit()}
          disabled={isDisabled}
          sx={{
            backgroundColor: 'black',
            borderColor: '#0063cc',
            '&:hover': {
              color: 'white',
              backgroundColor: 'black',
              borderColor: 'black',
            },
          }}
        >
          Submit
        </Button>
      </div>
      <center>
        <br />
      </center>
    </Dialog>
  );
};

AddBulkUsers.propTypes = {
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default React.memo(AddBulkUsers);
