import React, { useState } from 'react';
import { SupplyMovement, SupplyChainItem, Branch, User } from '../types';

interface SupplyMovementsProps {
  movements: SupplyMovement[];
  items: SupplyChainItem[];
  branches: Branch[];
  users: User[];
}

const SupplyMovements: React.FC<SupplyMovementsProps> = ({ movements, items, branches, users }) => {
  const [selectedType, setSelectedType] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredMovements = movements.filter(movement => {
    const matchesType = !selectedType || movement.type === selectedType;
    const matchesDate = !dateFilter || movement.date.startsWith(dateFilter);
    return matchesType && matchesDate;
  });

  const getItemName = (supplyId: number) => {
    const item = items.find(i => i.id === supplyId);
    return item?.productName || 'Unknown Item';
  };

  const getBranchName = (branchId: number) => {
    const branch = branches.find(b => b.id === branchId);
    return branch?.name || 'Unknown Branch';
  };

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const typeOptions = ['IN', 'OUT', 'TRANSFER', 'ADJUSTMENT'];

  return (
    <div className="glass-pane">
      <div className="page-header">
        <h2>Supply Chain Movements</h2>
      </div>

      <div className="filters-section">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="filter-select"
        >
          <option value="">All Movement Types</option>
          {typeOptions.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input
          type="month"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="date-filter"
        />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Type</th>
              <th>From Branch</th>
              <th>To Branch</th>
              <th>Quantity</th>
              <th>Reference Type</th>
              <th>Created By</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovements.map(movement => (
              <tr key={movement.id}>
                <td>{new Date(movement.date).toLocaleDateString()}</td>
                <td>{getItemName(movement.supplyId)}</td>
                <td>
                  <span className={`movement-type ${movement.type.toLowerCase()}`}>
                    {movement.type}
                  </span>
                </td>
                <td>{getBranchName(movement.fromBranchId)}</td>
                <td>{getBranchName(movement.toBranchId)}</td>
                <td>{movement.quantity}</td>
                <td>{movement.referenceType || '-'}</td>
                <td>{getUserName(movement.createdBy)}</td>
                <td>{movement.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplyMovements;