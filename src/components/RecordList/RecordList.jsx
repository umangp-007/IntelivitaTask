import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { recordsState } from '../../recoil/atom';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecordList.css'; 

const RecordList = ({ searchQuery, setEditRecordId }) => {
  const [records, setRecords] = useRecoilState(recordsState);
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 5;

  const filteredRecords = records.filter(record =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.id.toString().includes(searchQuery)
  );

  const pageCount = Math.ceil(filteredRecords.length / recordsPerPage);
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const currentRecords = filteredRecords.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );

  const handleDelete = (id) => {
    setRecords(prevRecords => prevRecords.filter(record => record.id !== id));
  };

  const handleEdit = (id) => {
    setEditRecordId(id);
  };

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex">
          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(row.id)}>
            <i className="bi bi-pencil"></i> Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Record List</h5>
        </div>
        <div className="card-body">
          <DataTable
            columns={columns}
            data={currentRecords}
            pagination={false}
            highlightOnHover
            striped
            persistTableHead
            noHeader
            className="table table-hover table-bordered"
          />
          <div className="d-flex justify-content-center mt-4">
            <ReactPaginate
              previousLabel={'« Previous'}
              nextLabel={'Next »'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              previousClassName={'page-item'}
              nextClassName={'page-item'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              breakLinkClassName={'page-link'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordList;

