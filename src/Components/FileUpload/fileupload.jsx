import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Title from '@mui/material/DialogTitle';
import {
  Paper, Grid, Button, Box,
} from '@mui/material';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { acceptableFileName } from '../../Config/constant';

const FileUpload = (props) => {
  const { setTableData, tableData, setButtonDisable } = props;

  const [sheet, setSheet] = useState([]);
  const [fileValidation, setFileVAlidation] = useState('');

  const readExcel = (file) => new Promise((resolve, reject) => {
    try {
      const checkFileName = (name) => acceptableFileName.includes(name.split('.').pop().toLowerCase());

      const fileReader = new FileReader();
      if (!checkFileName(file.name)) {
        setFileVAlidation('File should be in xlsx / xls / csv format');
        setButtonDisable(true);
        return;
      }
      setFileVAlidation('');
      setButtonDisable(false);

      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (event) => {
        const bufferArray = event.target.result;
        const workbook = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];
        setTableData(XLSX.utils.sheet_to_json(ws));
        resolve(tableData);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    } catch (error) {
      console.log('CATCH BLOCK in fileUpload readExcel => ', error);
    }
  });

  const saveFile = () => {
    saveAs(
      'https://docs.google.com/spreadsheets/d/1I-pqMm1odhkygJkoC1Hn-c-zrWrgGg304bY1ylYDScY/edit?usp=sharing',
      'addBulkUsers.xlsx',
    );
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          border: 'groove 1px #808080',
          margin: 'auto',
          maxWidth: 500,
          flexGrow: 1,
        }}
      >
        <Grid item xs container direction="column" spacing={2}>
          <Title sx={{ textAlign: 'center' }}>Upload Sheet</Title>
          <Typography sx={{ textAlign: 'center' }}>
            <input
              type="file"
              accept="xlsx,xls,csv"
              data={sheet}
              onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file)
                  .then((data) => {
                    setSheet(data);
                  })
                  .catch((error) => {
                    console.log(
                      'CATCH BLOCK in fileUpload input onChange => ',
                      error,
                    );
                  });
              }}
              sx={{ textAlign: 'center' }}
            />
            {fileValidation && <p style={{ color: 'red' }}>{fileValidation}</p>}
          </Typography>
        </Grid>
      </Paper>
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
    </>
  );
};

FileUpload.propTypes = {
  setTableData: PropTypes.string.isRequired,
  tableData: PropTypes.string.isRequired,
  setButtonDisable: PropTypes.string.isRequired,
};

export default React.memo(FileUpload);
