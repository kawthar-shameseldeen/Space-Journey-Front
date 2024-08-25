import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const FileUploadPopup = ({ onFileImport }) => {
    const [file, setFile] = useState(null);
    const [parsedData, setParsedData] = useState([]);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (!selectedFile) {
          toast.error("Please select a file to import");
          return;
        }
    
        const fileReader = new FileReader();
        const fileType = selectedFile.name.split('.').pop().toLowerCase();
    
        fileReader.onload = (e) => {
          if (fileType === 'csv') {
            Papa.parse(selectedFile, {
              header: true,
              skipEmptyLines: true,
              complete: (results) => {
                console.log("Parsed CSV Data:", results.data);
                setParsedData(results.data);
              },
              error: (error) => {
                toast.error("Error parsing CSV file");
                console.error("Error parsing CSV file:", error);
              }
            });
          } else if (fileType === 'xlsx') {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
            console.log("Parsed XLSX Data:", data);
            setParsedData(data);
          } else {
            toast.error("Unsupported file type");
          }
        };
    
      
      };
    
     
  
  };
  
  export default FileUploadPopup;
  