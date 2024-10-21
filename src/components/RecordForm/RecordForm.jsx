import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecordForm.css'; 
import { recordsState } from '../../recoil/atom';

const RecordForm = ({ editRecordId, setEditRecordId }) => {
  const [records, setRecords] = useRecoilState(recordsState);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);
      const existingEmails = new Set(records.map(record => record.email));
      const mergedRecords = [...records];

      jsonData.forEach(record => {
        if (!existingEmails.has(record.email)) {
          mergedRecords.push(record);
          existingEmails.add(record.email);
        }
      });

      setRecords(mergedRecords);
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const handleUpdateRecord = () => {
    const emailExists = records.some(record => record.email === email && record.id !== editRecordId);
    if (emailExists) {
      alert("Email must be unique!");
      return;
    }
    setRecords(records.map(record => record.id === editRecordId ? { ...record, email, name } : record));
    resetForm(); 
  };

  const resetForm = () => {
    setEditRecordId(null);
    setEmail('');
    setName('');
  };

  useEffect(() => {
    if (editRecordId) {
      const recordToEdit = records.find(record => record.id === editRecordId);
      if (recordToEdit) {
        setName(recordToEdit.name);
        setEmail(recordToEdit.email);
      }
    }
  }, [editRecordId, records]);

  return (
    <div className="mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Update Record</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Upload JSON File</label>
            <input 
              type="file" 
              accept=".json" 
              onChange={handleFileUpload} 
              className="form-control" 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              placeholder="Enter Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="form-control" 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              placeholder="Enter Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control" 
            />
          </div>

          <div className="d-flex justify-content-end">
            <button 
              className="btn btn-primary" 
              onClick={handleUpdateRecord}>
              Update Record
            </button>
            <button 
              className="btn btn-secondary ms-2" 
              onClick={resetForm}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordForm;
