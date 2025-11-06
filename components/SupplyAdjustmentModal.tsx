import React, { useState } from 'react';
import { SupplyInventory, SupplyChainItem, Branch, InventoryAdjustmentLog, AdjustmentReason, User } from '../types';

interface SupplyAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: SupplyInventory[];
  items: SupplyChainItem[];
  branches: Branch[];
  user: User;
  onSave: (adjustment: Omit<InventoryAdjustmentLog, 'id'>) => void;
}

const SupplyAdjustmentModal: React.FC<SupplyAdjustmentModalProps> = ({
  isOpen, onClose, inventory, items, branches, user, onSave
}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [reason, setReason] = useState<AdjustmentReason>('Stock Count Correction');
  const [notes, setNotes] = useState('');

  const reasons: AdjustmentReason[] = ['Damaged Goods', 'Stock Count Correction', 'Initial Stock', 'Return to Supplier', 'Other'];

  const selectedInventory = inventory.find(inv => 
    inv.supplyId.toString() === selectedItem && inv.branchId.toString() === selectedBranch
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInventory || !newQuantity) return;

    const adjustment: Omit<InventoryAdjustmentLog, 'id'> = {
      date: new Date().toISOString().split('T')[0],
      branchId: selectedInventory.branchId,
      productId: selectedInventory.supplyId,
      adjustedByUserId: user.id,
      oldQuantity: selectedInventory.currentStock,
      newQuantity: parseInt(newQuantity),
      reason,
      notes: notes || undefined
    };

    onSave(adjustment);
    onClose();
    setSelectedItem('');
    setSelectedBranch('');
    setNewQuantity('');
    setNotes('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>تعديل المخزون</h3>
          <button onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-grid-cols-2">
            <div>
              <label className="form-label required">الفرع</label>
              <select 
                value={selectedBranch} 
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="form-select"
                required
              >
                <option value="">اختر الفرع</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>{branch.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label required">المنتج</label>
              <select 
                value={selectedItem} 
                onChange={(e) => setSelectedItem(e.target.value)}
                className="form-select"
                required
              >
                <option value="">اختر المنتج</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>{item.productName}</option>
                ))}
              </select>
            </div>
          </div>
          
          {selectedInventory && (
            <div className="form-section">
              <div className="form-section-header">الكمية الحالية: {selectedInventory.currentStock}</div>
            </div>
          )}

          <div className="form-grid-cols-2">
            <div>
              <label className="form-label required">الكمية الجديدة</label>
              <input 
                type="number" 
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label required">السبب</label>
              <select 
                value={reason} 
                onChange={(e) => setReason(e.target.value as AdjustmentReason)}
                className="form-select"
                required
              >
                {reasons.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">ملاحظات</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-input"
              rows={3}
            />
          </div>
        </form>
        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-ghost">إلغاء</button>
          <button type="submit" onClick={handleSubmit} className="btn btn-primary">حفظ</button>
        </div>
      </div>
    </div>
  );
};

export default SupplyAdjustmentModal;