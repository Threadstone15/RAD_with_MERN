import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, TextField } from '@mui/material';

const MarkAttendance = ({ open, onClose }) => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [classId, setClassId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScanComplete, setIsScanComplete] = useState(false);

  const handleResult = async (result) => {
    if (result && !isProcessing && !isScanComplete) {
      setIsProcessing(true);
      try {
        console.log('QR Code Result:', result.text);
        const data = JSON.parse(result.text);

        console.log('Parsed QR Code Data:', data);

        const { studentID } = data;
        if (!studentID) {
          throw new Error('Invalid QR code data: missing studentID');
        }

        if (!classId) {
          throw new Error('Class ID is required.');
        }

        console.log(`Scanning successful: studentID=${studentID}, classID=${classId}`);

        const response = await axios.post('http://localhost:5000/manager-dashboard/mark-attendance', { studentID, classId });
        setScanResult(response.data.message);

        setIsScanComplete(true); // Mark the scan as complete
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

  const handleNextScan = () => {
    setScanResult(null);
    setError(null);
    setIsScanComplete(false);
    setIsScanning(true); // Enable scanning for the next scan
  };

  const handleClose = () => {
    setScanResult(null);
    setError(null);
    setClassId('');
    setIsScanning(false);
    setIsProcessing(false);
    setIsScanComplete(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Mark Attendance</DialogTitle>
      <DialogContent>
        {isScanning && !isScanComplete ? (
          <>
            <QrReader
              delay={300}
              onResult={handleResult}
              onError={handleError}
              style={{ width: '100%' }}
            />
            <TextField
              label="Enter Class ID"
              variant="outlined"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              fullWidth
              margin="normal"
              disabled={isProcessing}
            />
          </>
        ) : (
          <Typography>{isScanComplete ? 'Scan complete. Press "Next" to continue.' : 'No QR code scanner active'}</Typography>
        )}
        {scanResult && <Typography color="primary">{scanResult}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        {!isScanComplete && (
          <Button onClick={() => setIsScanning(true)} color="primary" disabled={isProcessing || isScanning}>
            {isScanning ? 'Scanning...' : 'Start Scanning'}
          </Button>
        )}
        {isScanComplete && (
          <Button onClick={handleNextScan} color="primary">
            Next
          </Button>
        )}
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MarkAttendance;
