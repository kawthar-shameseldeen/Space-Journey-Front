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
    
       
      };
    
     
  
  };
  
  export default FileUploadPopup;
  