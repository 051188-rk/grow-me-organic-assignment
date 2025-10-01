import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

export default function ArtTable() {
  const [data, setData] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedRows, setSelectedRows] = useState<{ [id: number]: boolean }>({});
  const [globalFilter, setGlobalFilter] = useState('');

  const fetchArtworks = async (pageNum: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${pageNum + 1}&limit=${pageSize}`
      );
      const result = await response.json();
      setData(result.data);
      setTotalRecords(result.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks(page, rows);
  }, [page, rows]);

  const handlePageChange = (e: { page?: number; rows?: number }) => {
    if (e.page !== undefined && e.rows !== undefined) {
      setPage(e.page);
      setRows(e.rows);
    }
  };

  const updateSelectedRows = (e: { value: Artwork[] }) => {
    const updatedSelections = { ...selectedRows };
    const newlySelected = e.value;

    data.forEach((row) => {
      if (!newlySelected.some(selected => selected.id === row.id)) {
        updatedSelections[row.id] = false;
      }
    });

    newlySelected.forEach((row) => {
      updatedSelections[row.id] = true;
    });

    setSelectedRows(updatedSelections);
  };

  const currentSelection = data.filter((row) => selectedRows[row.id]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Artworks</h2>
      </div>

      <DataTable
        value={data}
        paginator
        rows={rows}
        totalRecords={totalRecords}
        lazy
        first={page * rows}
        onPage={handlePageChange}
        loading={loading}
        selectionMode="checkbox"
        selection={currentSelection}
        onSelectionChange={updateSelectedRows}
        dataKey="id"
        className="shadow-md rounded-lg"
        stripedRows
        showGridlines
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
        <Column field="title" header="Title" sortable />
        <Column field="place_of_origin" header="Origin" sortable />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start" sortable />
        <Column field="date_end" header="End" sortable />
      </DataTable>
    </div>
  );
}
