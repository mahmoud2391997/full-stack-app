import React, { useState } from 'react';
import { SupplyChainItem, Branch } from '../types';

interface SupplyChainItemsProps {
  items: SupplyChainItem[];
  branches: Branch[];
  onSave: (item: SupplyChainItem) => void;
}

const SupplyChainItems: React.FC<SupplyChainItemsProps> = ({ items, branches, onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.batchNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || item.currentStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ['In Transit', 'In Stock', 'Delivered', 'Damaged', 'Expired'];

  return (
    <div className="glass-pane">
      <div className="page-header">
        <h2>Supply Chain Items</h2>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search by product name, SKU, or batch number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Batch Number</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Manufacturer</th>
              <th>Origin Country</th>
              <th>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.sku || '-'}</td>
                <td>{item.batchNumber || '-'}</td>
                <td>{item.quantity} {item.unit || 'pcs'}</td>
                <td>
                  <span className={`status-badge ${item.currentStatus?.toLowerCase().replace(' ', '-')}`}>
                    {item.currentStatus || 'Unknown'}
                  </span>
                </td>
                <td>{item.manufacturer || '-'}</td>
                <td>{item.originCountry || '-'}</td>
                <td>{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplyChainItems;