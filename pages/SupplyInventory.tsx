import React, { useState } from 'react';
import { SupplyInventory, SupplyChainItem, Branch, InventoryAdjustmentLog, User } from '../types';
import SupplyAdjustmentModal from '../components/SupplyAdjustmentModal';

interface SupplyInventoryProps {
  inventory: SupplyInventory[];
  items: SupplyChainItem[];
  branches: Branch[];
  adjustments: InventoryAdjustmentLog[];
  users: User[];
  user: User;
  onUpdate: (inventory: SupplyInventory) => void;
  onAdjust: (adjustment: Omit<InventoryAdjustmentLog, 'id'>) => void;
}

const SupplyInventoryPage: React.FC<SupplyInventoryProps> = ({ inventory, items, branches, adjustments, users, user, onUpdate, onAdjust }) => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);

  const filteredInventory = inventory.filter(inv => {
    const matchesBranch = !selectedBranch || inv.branchId.toString() === selectedBranch;
    const isLowStock = inv.minStock && inv.currentStock <= inv.minStock;
    const matchesLowStock = !lowStockOnly || isLowStock;
    return matchesBranch && matchesLowStock;
  });

  const getItemName = (supplyId: number) => {
    const item = items.find(i => i.id === supplyId);
    return item?.productName || 'Unknown Item';
  };

  const getBranchName = (branchId: number) => {
    const branch = branches.find(b => b.id === branchId);
    return branch?.name || 'Unknown Branch';
  };

  const getStockStatus = (inv: SupplyInventory) => {
    if (inv.minStock && inv.currentStock <= inv.minStock) return 'low';
    if (inv.maxStock && inv.currentStock >= inv.maxStock) return 'high';
    return 'normal';
  };

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  const filteredAdjustments = adjustments.filter(adj => {
    const matchesBranch = !selectedBranch || adj.branchId.toString() === selectedBranch;
    return matchesBranch;
  });

  return (
    <div className="glass-pane">
      <div className="page-header">
        <h2>Supply Chain Inventory</h2>
        <button 
          onClick={() => setIsAdjustmentModalOpen(true)}
          className="btn btn-primary"
        >
          تعديل المخزون
        </button>
      </div>

      <div className="tab-buttons-container">
        <button 
          className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          المخزون
        </button>
        <button 
          className={`tab-button ${activeTab === 'movements' ? 'active' : ''}`}
          onClick={() => setActiveTab('movements')}
        >
          الحركات
        </button>
      </div>

      {activeTab === 'inventory' && (
        <div className="filters-section">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="filter-select"
          >
            <option value="">All Branches</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={lowStockOnly}
              onChange={(e) => setLowStockOnly(e.target.checked)}
            />
            Show Low Stock Only
          </label>
        </div>
      )}

      {activeTab === 'movements' && (
        <div className="filters-section">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="filter-select"
          >
            <option value="">All Branches</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Branch</th>
                <th>Current Stock</th>
                <th>Min Stock</th>
                <th>Max Stock</th>
                <th>Price per Unit</th>
                <th>Total Value</th>
                <th>Status</th>
                <th>Location</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map(inv => {
                const stockStatus = getStockStatus(inv);
                const totalValue = inv.currentStock * inv.pricePerUnit;
                
                return (
                  <tr key={inv.id}>
                    <td>{getItemName(inv.supplyId)}</td>
                    <td>{getBranchName(inv.branchId)}</td>
                    <td>{inv.currentStock}</td>
                    <td>{inv.minStock || '-'}</td>
                    <td>{inv.maxStock || '-'}</td>
                    <td>${inv.pricePerUnit.toFixed(2)}</td>
                    <td>${totalValue.toFixed(2)}</td>
                    <td>
                      <span className={`stock-status ${stockStatus}`}>
                        {stockStatus === 'low' ? 'Low Stock' : 
                         stockStatus === 'high' ? 'Overstock' : 'Normal'}
                      </span>
                    </td>
                    <td>{inv.location || '-'}</td>
                    <td>{inv.lastUpdated ? new Date(inv.lastUpdated).toLocaleDateString() : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'movements' && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Branch</th>
                <th>Product</th>
                <th>Old Quantity</th>
                <th>New Quantity</th>
                <th>Change</th>
                <th>Reason</th>
                <th>Adjusted By</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdjustments.map(adj => {
                const change = adj.newQuantity - adj.oldQuantity;
                return (
                  <tr key={adj.id}>
                    <td>{new Date(adj.date).toLocaleDateString()}</td>
                    <td>{getBranchName(adj.branchId)}</td>
                    <td>{getItemName(adj.productId)}</td>
                    <td>{adj.oldQuantity}</td>
                    <td>{adj.newQuantity}</td>
                    <td>
                      <span style={{color: change >= 0 ? '#10b981' : '#ef4444'}}>
                        {change >= 0 ? '+' : ''}{change}
                      </span>
                    </td>
                    <td>{adj.reason}</td>
                    <td>{getUserName(adj.adjustedByUserId)}</td>
                    <td>{adj.notes || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <SupplyAdjustmentModal
        isOpen={isAdjustmentModalOpen}
        onClose={() => setIsAdjustmentModalOpen(false)}
        inventory={inventory}
        items={items}
        branches={branches}
        user={user}
        onSave={onAdjust}
      />
    </div>
  );
};

export default SupplyInventoryPage;