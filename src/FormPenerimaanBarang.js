import React, { useState, useEffect } from "react";
import "./App.css";

const FormPenerimaanBarang = () => {
  const [penerimaanData, setPenerimaanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/penerimaan-barang");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPenerimaanData(data.samb.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h3>Laporan Penerimaan Barang</h3>

      {/* Table to display data */}
      <form>
      <table border={1} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#005eff', color: 'white' }}>Trx In No</th>
            <th style={{ backgroundColor: '#005eff', color: 'white' }}>Trx In Date</th>
            <th style={{ backgroundColor: '#005eff', color: 'white' }}>Whs ID</th>
            <th style={{ backgroundColor: '#005eff', color: 'white' }}>Warehouse Name</th>
            <th style={{ backgroundColor: '#005eff', color: 'white' }}>Supplier Name</th>
            <th style={{ backgroundColor: '#005eff', color: 'white' }}>Notes</th>
            <th style={{ backgroundColor: '#005eff', color: 'white' }}>Product Name</th>
            <th style={{ backgroundColor: '#005eff', color: 'white' }}>Qty (Dus)</th>
            <th style={{ backgroundColor: '#005eff', color: 'white' }}>Qty (Pcs)</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through penerimaanData */}
          {penerimaanData.map((trx) => {
            // Check if penerimaan_detail exists for the current transaction
            if (trx.penerimaan_detail && trx.penerimaan_detail.length > 0) {
              return trx.penerimaan_detail.map((detail) => (
                <tr key={detail.trx_in_dpk}>
                  <td>{trx.trx_in_no}</td>
                  <td>{trx.trx_in_date}</td>
                  <td>{trx.whs_idf}</td>
                  <td>{trx.warehouse_name}</td>
                  <td>{trx.supplier_name}</td>
                  <td>{trx.trx_in_notes}</td>
                  <td>{detail.product_name}</td>
                  <td>{detail.trx_in_d_qty_dus}</td>
                  <td>{detail.trx_in_d_qty_pcs}</td>
                </tr>
              ));
            }
            // If no penerimaan_detail, show a single row with a message
            return (
              <></>
            );
          })}
        </tbody>
      </table>
      </form>
    </div>
  );
};

export default FormPenerimaanBarang;
