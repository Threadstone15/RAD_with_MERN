import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchClasses } from '../services/api';
import debounce from 'lodash/debounce';

const MarkAttendance = ({ open, onClose }) => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [classId, setClassId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScanComplete, setIsScanComplete] = useState(false);
  const [classes, setClasses] = useState([]);
  const [step, setStep] = useState(1); // Step 1: Class selection, Step 2: Scanning
  const [scannerEnabled, setScannerEnabled] = useState(true); // New state variable

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await fetchClasses();
        setClasses(response.data);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    getClasses();
  }, []);

  // Debounce the handleResult function to avoid multiple rapid calls
  const handleResult = debounce(async (result) => {
    if (result && !isProcessing && !isScanComplete && classId && scannerEnabled) {
      setIsProcessing(true);
      setScannerEnabled(false); // Disable the scanner immediately

      try {
        const studentID = result.text;
        if (!studentID) throw new Error('Invalid QR code data: missing studentID');

        const response = await axios.post('http://localhost:5000/manager-dashboard/mark-attendance', { studentID, classId: String(classId) });
        setScanResult(response.data.message);
        setIsScanComplete(true);
      } catch (err) {
        console.error('QR code scan error:', err);
      } finally {
        setIsProcessing(false);
        setScannerEnabled(true); // Re-enable scanner after processing
      }
    } else if (!classId) {
      setError('Please select a class before scanning.');
    }
  }, 1000); // Debounce time of 1 second

  const handleError = (err) => {
    console.error('QR code scan error:', err);
  };

  const handleClassChange = (event) => {
    const selectedClassId = event.target.value;
    setClassId(selectedClassId);
  };

  const handleNextStep = () => {
    if (classId) {
      setStep(2); // Move to scanning step
    } else {
      setError('Please select a class.');
    }
  };

  const handleNextScan = () => {
    setScanResult(null);
    setError(null);
    setIsScanComplete(false);
    setScannerEnabled(true); // Re-enable the scanner
  };

  const handleClose = () => {
    setScanResult(null);
    setError(null);
    setClassId('');
    setStep(1); // Reset to class selection step
    setScannerEnabled(true); // Ensure scanner is enabled on close
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Mark Attendance</DialogTitle>
      <DialogContent>
        {step === 1 && (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel>Classes</InputLabel>
              <Select
                value={classId}
                onChange={handleClassChange}
                renderValue={(selected) => {
                  const selectedClass = classes.find(cls => cls._id === selected);
                  return selectedClass ? selectedClass.className : '';
                }}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.className}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={handleNextStep} color="primary">
              Next
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </>
        )}
        {step === 2 && (
          <>
            <QrReader
              delay={300}
              onResult={(result, error) => {
                if (result) {
                  handleResult(result);
                }
                if (error) {
                  handleError(error);
                }
              }}
              style={{ width: '100%' }}
              disable={!scannerEnabled} // Disable scanner based on state
            />
            <Typography>{isScanComplete ? 'Scan complete. Press "Next" to continue.' : 'No QR code scanner active'}</Typography>
            {scanResult && <Typography color="primary">{scanResult}</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            {isScanComplete && (
              <Button onClick={handleNextScan} color="primary">
                Next
              </Button>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        {step === 2 && (
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MarkAttendance;
