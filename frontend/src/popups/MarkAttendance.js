import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const MarkAttendance = ({ open, onClose }) => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResult = async (result) => {
    if (result && !isProcessing) {
      setIsProcessing(true);
      try {
        console.log('QR Code Result:', result.text);
        const data = JSON.parse(result.text);

        console.log('Parsed QR Code Data:', data);

        const { studentID } = data;
        if (!studentID) {
          throw new Error('Invalid QR code data: missing studentID');
        }

        console.log(`Scanning successful: studentID=${studentID}`);

        const response = await axios.post('http://localhost:5000/manager-dashboard/mark-attendance', { studentID });
        setScanResult(response.data.message);

        // Automatically close the popup after a successful request
        setTimeout(() => handleClose(), 2000); // Close after 2 seconds for user feedback
      } catch (err) {
        console.error('Error marking attendance:', err);
        setError(`Error marking attendance: ${err.message}`);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleError = (err) => {
    console.error('QR code scan error:', err);
    setError('Error scanning QR code. Please try again.');
  };

  const handleClose = () => {
    setScanResult(null);
    setError(null);
    setIsScanning(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Mark Attendance</DialogTitle>
      <DialogContent>
        {isScanning ? (
          <QrReader
            delay={300}
            onResult={handleResult}
            onError={handleError}
            style={{ width: '100%' }}
          />
        ) : (
          <Typography>No QR code scanner active</Typography>
        )}
        {scanResult && <Typography color="primary">{scanResult}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsScanning(true)} color="primary" disabled={isProcessing}>
          {isScanning ? 'Scanning...' : 'Start Scanning'}
        </Button>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MarkAttendance;
