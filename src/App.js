import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import RecordForm from './components/RecordForm/RecordForm';
import RecordList from './components/RecordList/RecordList';
import SearchBar from './components/SearchBar/SearchBar';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editRecordId, setEditRecordId] = useState(null);

  return (
    <RecoilRoot>
      <div className="app container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 text-center mb-4">
            <h1 className="text-primary">Client Records Management</h1>
          </div>
        </div>

        <div className="row justify-content-center mb-4">
          <div className="col-md-6 col-sm-12">
            <RecordForm editRecordId={editRecordId} setEditRecordId={setEditRecordId} />
          </div>
        </div>

        <div className="row justify-content-center mb-4">
          <div className="col-md-6 col-sm-12">
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-10 col-sm-12">
            <RecordList searchQuery={searchQuery} setEditRecordId={setEditRecordId} />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
};

export default App;
