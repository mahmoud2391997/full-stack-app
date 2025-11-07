
import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import Dashboard from './pages/Dashboard';
import PurchaseInvoices from './pages/PurchaseInvoices';
import SalesInvoices from './pages/Sales';
import Employees from './pages/Employees';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import UsersPage from './pages/UsersPage';
import Licenses from './pages/Licenses';
import Branches from './pages/Branches';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginScreen from './pages/LoginScreen';
import Attendance from './pages/Attendance';
import LeaveRequests from './pages/LeaveRequests';
import Salaries from './pages/Salaries';
import Customers from './pages/Customers';
import Expenses from './pages/Expenses';
import FinancialAccounts from './pages/FinancialAccounts';
import POS from './pages/POS';
import POSSessions from './pages/POSSessions';
import ManufacturingOrderPage from './pages/ManufacturingOrderPage';
import ProductionTasks from './pages/ProductionTasks';
import ChartOfAccountsPage from './pages/ChartOfAccountsPage';
import IntegrationsPage from './pages/IntegrationsPage';
import AIChatbot from './components/AIChatbot';
import EmployeePortal from './pages/EmployeePortal';
import AdvanceRequestsPage from './pages/AdvanceRequestsPage';
import GeneralRequestsPage from './pages/GeneralRequestsPage';
import ProductModal from './components/ProductModal';
import PermissionsViewModal from './components/PermissionsViewModal';
import Suppliers from './pages/Suppliers';
import PurchaseRequests from './pages/PurchaseRequests';
import RequestForQuotations from './pages/RequestForQuotations';
import PurchaseQuotations from './pages/PurchaseQuotations';
import PurchaseOrders from './pages/PurchaseOrders';
import PurchaseReturns from './pages/PurchaseReturns';
import DebitNotes from './pages/DebitNotes';
import SupplierPayments from './pages/SupplierPayments';
import SettingsPurchases from './pages/SettingsPurchases';
import SettingsSuppliers from './pages/SettingsSuppliers';
import SalesQuotations from './pages/SalesQuotations';
import SalesReturns from './pages/SalesReturns';
import CreditNotes from './pages/CreditNotes';
import RecurringInvoices from './pages/RecurringInvoices';
import CustomerPayments from './pages/CustomerPayments';
import SettingsSales from './pages/SettingsSales';
import { User, Role, PurchaseInvoice, Sale, EmployeeData, RenewableItem, Branch, Product, InventoryItem, LeaveRequest, AttendanceRecord, SalaryPayment, RequestStatus, Customer, Expense, FinancialAccount, POSSession, ManufacturingOrder, ChatbotDataContext, InventoryAdjustmentLog, AdjustmentReason, ProductionTask, Account, IntegrationSettings, AdvanceRequest, GeneralRequest, Supplier, PurchaseRequest, PurchaseOrder, PurchaseReturn, SupplierPayment, DebitNote, RequestForQuotation, PurchaseQuotation, SalesQuotation, SalesReturn, CreditNote, RecurringInvoice, CustomerPayment } from './types';
import { ToastProvider, useToasts } from './components/Toast';
import { DataProvider, useData } from './contexts/DataContext';

export const AuthContext = React.createContext<{ user: User | null; login: (role: Role) => void; logout: () => void; }>({
    user: null,
    login: () => {},
    logout: () => {},
});

type Theme = 'light' | 'dark';

const AppContent: React.FC = () => {
    const { addToast } = useToasts();
    const [user, setUser] = useState<User | null>(null);
    const [activeView, setActiveView] = useState('Dashboard');
    const [theme, setTheme] = useState<Theme>('dark');
    
    const {
        users,
        branches,
        suppliers,
        products,
        customers,
        sales,
        employees,
        inventoryItems,
        expenses,
        financialAccounts,
        supplyChainItems,
        supplyMovements,
        supplyInventory,
        loading
    } = useData();

    // TODO: The following states should be moved to the DataContext and fetched from the server
    const [renewables, setRenewables] = useState<RenewableItem[]>([]);
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    const [salaryPayments, setSalaryPayments] = useState<SalaryPayment[]>([]);
    const [chartOfAccounts, setChartOfAccounts] = useState<Account[]>([]);
    const [settings, setSettings] = useState({ 
        salesTarget: 50000,
        renewalReminders: { days: [30, 15, 7, 3] } 
    });
    const [posSessions, setPosSessions] = useState<POSSession[]>([]);
    const [productionOrders, setProductionOrders] = useState<ManufacturingOrder[]>([]);
    const [inventoryAdjustmentLogs, setInventoryAdjustmentLogs] = useState<InventoryAdjustmentLog[]>([]);
    const [productionTasks, setProductionTasks] = useState<ProductionTask[]>([]);
    const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>({ whatsapp: { enabled: false, apiKey: '' } });
    const [advanceRequests, setAdvanceRequests] = useState<AdvanceRequest[]>([]);
    const [generalRequests, setGeneralRequests] = useState<GeneralRequest[]>([]);
    const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
    const [viewingPermissionsFor, setViewingPermissionsFor] = useState<User | null>(null);
    const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([]);
    const [rfqs, setRfqs] = useState<RequestForQuotation[]>([]);
    const [purchaseQuotations, setPurchaseQuotations] = useState<PurchaseQuotation[]>([]);
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
    const [purchaseReturns, setPurchaseReturns] = useState<PurchaseReturn[]>([]);
    const [debitNotes, setDebitNotes] = useState<DebitNote[]>([]);
    const [supplierPayments, setSupplierPayments] = useState<SupplierPayment[]>([]);
    const [salesQuotations, setSalesQuotations] = useState<SalesQuotation[]>([]);
    const [salesReturns, setSalesReturns] = useState<SalesReturn[]>([]);
    const [creditNotes, setCreditNotes] = useState<CreditNote[]>([]);
    const [recurringInvoices, setRecurringInvoices] = useState<RecurringInvoice[]>([]);
    const [customerPayments, setCustomerPayments] = useState<CustomerPayment[]>([]);
    const [purchaseInvoices, setPurchaseInvoices] = useState<PurchaseInvoice[]>([]);


    const activeSession = useMemo(() => posSessions.find(s => s.status === 'Open' && s.branchId === user?.branchId), [posSessions, user]);
    
     useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    const authContextValue = useMemo(() => ({
        user,
        login: (role: Role) => {
            const loggedInUser = users.find(u => u.role === role);
            if (loggedInUser) {
                setUser(loggedInUser);
                switch (role) {
                    case Role.ShopAssistant:
                        setActiveView('POS/Start');
                        break;
                    case Role.Perfumer:
                        setActiveView('Manufacturing/Orders');
                        break;
                    case Role.Employee:
                        setActiveView('MyProfile');
                        break;
                    default:
                        setActiveView('Dashboard');
                        break;
                }
            }
        },
        logout: () => {
            setUser(null);
        }
    }), [user, users]);
    
    // TODO: This logic needs to be moved to the backend
    const checkAndSendRenewalReminders = (): boolean => {
        return false;
    };


    // TODO: All CRUD handlers need to be updated to make API calls to the backend
    const handleSaveUser = (userToSave: User) => {};
    const handleOpenProductModal = (product: Partial<Product>) => {};
    const handleCloseProductModal = () => {};
    const handleSaveProduct = (productToSave: Product) => {};
    const handleSaveAndCloseProductModal = (productToSave: Product) => {};
    const handleSavePurchaseInvoice = (invoice: PurchaseInvoice) => {};
    const handleSaveSale = (sale: Sale) => {};
    const handleSaveSalesQuotation = (quotation: SalesQuotation) => {};
    const handleConvertQuoteToInvoice = (quotation: SalesQuotation) => {};
    const handleSaveEmployee = (employee: EmployeeData) => {};
    const handleDeleteEmployee = (employeeId: number) => {};
    const handleSaveBranch = (branch: Branch) => {};
    const handleSaveSupplier = (supplier: Supplier) => {};
    const handleUpdateInventoryItem = (updatedItem: InventoryItem) => {};
    const handleTransferInventory = (data: { sourceBranchId: number; destinationBranchId: number; productId: number; quantity: number; }) => {};
    const handleAdjustInventory = (data: { branchId: number; productId: number; newQuantity: number; reason: AdjustmentReason; notes?: string; }) => {};
    const handleRecordAttendance = (records: AttendanceRecord[]) => {};
    const handleSaveLeaveRequest = (request: LeaveRequest, newStatus?: RequestStatus) => {};
    const handleSaveAdvanceRequest = (request: AdvanceRequest, newStatus?: RequestStatus) => {};
    const handleSaveGeneralRequest = (request: GeneralRequest, newStatus?: RequestStatus) => {};
    const handleRunPayroll = (year: number, month: number) => {};
    const handleSaveCustomer = (customer: Customer): Customer => { return customer; };
    const handleSaveExpense = (expense: Expense) => {};
    const handleStartSession = (openingBalance: number) => {};
    const handleCloseSession = (closingBalance: number) => {};
    const handleSaveProductionOrder = (order: ManufacturingOrder) => {};
    const handleSaveProductionTask = (task: ProductionTask) => {};
    const handleSaveIntegrations = (newSettings: IntegrationSettings) => {};

    const chatbotDataContext: ChatbotDataContext = useMemo(() => ({
        sales,
        purchases: purchaseInvoices,
        products,
        inventory: inventoryItems,
        customers,
        employees,
        branches,
        expenses,
        suppliers,
    }), [sales, purchaseInvoices, products, inventoryItems, customers, employees, branches, expenses, suppliers]);

    const lowStockItemsCount = useMemo(() => inventoryItems.filter(i => i.quantity <= i.minStock && i.minStock > 0).length, [inventoryItems]);
    const pendingLeaveRequestsCount = useMemo(() => leaveRequests.filter(r => r.status === 'Pending').length, [leaveRequests]);
    const pendingAdvanceRequestsCount = useMemo(() => advanceRequests.filter(r => r.status === 'Pending').length, [advanceRequests]);
    const pendingGeneralRequestsCount = useMemo(() => generalRequests.filter(r => r.status === 'Pending').length, [generalRequests]);
    const totalPendingHRRequests = pendingLeaveRequestsCount + pendingAdvanceRequestsCount + pendingGeneralRequestsCount;


    const sessionsForView = (user?.role === Role.BranchManager || user?.role === Role.ShopAssistant)
    ? posSessions.filter(s => s.branchId === user.branchId)
    : posSessions;

    // --- Role-based Data Filtering ---
    const isBranchScopedUser = useMemo(() =>
        user?.role === Role.BranchManager || user?.role === Role.ShopAssistant,
        [user]
    );

    const salesForView = useMemo(() => isBranchScopedUser ? sales.filter(s => s.branchId === user!.branchId) : sales, [sales, user, isBranchScopedUser]);
    const purchaseInvoicesForView = useMemo(() => isBranchScopedUser ? purchaseInvoices.filter(p => p.branchId === user!.branchId) : purchaseInvoices, [purchaseInvoices, user, isBranchScopedUser]);
    const inventoryForView = useMemo(() => isBranchScopedUser ? inventoryItems.filter(i => i.branchId === user!.branchId) : inventoryItems, [inventoryItems, user, isBranchScopedUser]);
    const employeesForView = useMemo(() => isBranchScopedUser ? employees.filter(e => e.branchId === user!.branchId) : employees, [employees, user, isBranchScopedUser]);
    const expensesForView = useMemo(() => isBranchScopedUser ? expenses.filter(e => e.branchId === user!.branchId) : expenses, [expenses, user, isBranchScopedUser]);


    if (!user) {
        return (
            <AuthContext.Provider value={authContextValue}>
                <LoginScreen />
            </AuthContext.Provider>
        );
    }
    
    if (loading) {
        return <div>Loading...</div>
    }

    const renderView = () => {
        if (activeView.startsWith('MyProfile')) return <EmployeePortal user={user} employees={employees} leaveRequests={leaveRequests} advanceRequests={advanceRequests} generalRequests={generalRequests} attendance={attendance} salaryPayments={salaryPayments} onSaveLeaveRequest={handleSaveLeaveRequest} onSaveAdvanceRequest={handleSaveAdvanceRequest} onSaveGeneralRequest={handleSaveGeneralRequest} />;
        if (activeView.startsWith('Dashboard')) return <Dashboard sales={salesForView} purchases={purchaseInvoicesForView} employees={employeesForView} inventory={inventoryForView} products={products} branches={branches} settings={settings} accounts={chartOfAccounts} expenses={expensesForView} renewables={renewables} leaveRequests={leaveRequests} advanceRequests={advanceRequests} generalRequests={generalRequests} suppliers={suppliers} />;
        
        // Sales Module
        if (activeView.startsWith('Sales/Invoices') || activeView === 'Sales') return <SalesInvoices sales={salesForView} onSave={handleSaveSale} branches={branches} products={products} inventory={inventoryForView} customers={customers} />;
        if (activeView.startsWith('Sales/Quotations')) return <SalesQuotations quotations={salesQuotations} onSave={handleSaveSalesQuotation} onConvertToInvoice={handleConvertQuoteToInvoice} customers={customers} products={products} />;
        if (activeView.startsWith('Sales/Returns')) return <SalesReturns returns={salesReturns} sales={sales} customers={customers} />;
        if (activeView.startsWith('Sales/CreditNotes')) return <CreditNotes notes={creditNotes} customers={customers} />;
        if (activeView.startsWith('Sales/Recurring')) return <RecurringInvoices invoices={recurringInvoices} customers={customers} />;
        if (activeView.startsWith('Sales/Payments')) return <CustomerPayments payments={customerPayments} customers={customers} />;

        // Purchases Module
        if (activeView.startsWith('Purchases/Invoices')) return <PurchaseInvoices invoices={purchaseInvoicesForView} onSave={handleSavePurchaseInvoice} branches={branches} products={products} sales={salesForView} inventory={inventoryForView} suppliers={suppliers} />;
        if (activeView.startsWith('Purchases/Suppliers')) return <Suppliers suppliers={suppliers} onSave={handleSaveSupplier} />;
        if (activeView.startsWith('Purchases/Requests')) return <PurchaseRequests requests={purchaseRequests} employees={employees} branches={branches} products={products} />;
        if (activeView.startsWith('Purchases/RFQs')) return <RequestForQuotations rfqs={rfqs} suppliers={suppliers} products={products} />;
        if (activeView.startsWith('Purchases/Quotations')) return <PurchaseQuotations quotations={purchaseQuotations} suppliers={suppliers} />;
        if (activeView.startsWith('Purchases/Orders')) return <PurchaseOrders orders={purchaseOrders} suppliers={suppliers} products={products} />;
        if (activeView.startsWith('Purchases/Returns')) return <PurchaseReturns returns={purchaseReturns} suppliers={suppliers} products={products} />;
        if (activeView.startsWith('Purchases/DebitNotes')) return <DebitNotes notes={debitNotes} suppliers={suppliers} />;
        if (activeView.startsWith('Purchases/Payments')) return <SupplierPayments payments={supplierPayments} suppliers={suppliers} />;
        
        // Inventory Module
        if (activeView.startsWith('Inventory/Products/')) {
            const productId = parseInt(activeView.split('/')[2], 10);
            const product = products.find(p => p.id === productId);
            if (product) {
                return <ProductDetailPage
                    key={productId}
                    product={product}
                    inventory={inventoryItems}
                    sales={sales}
                    purchaseInvoices={purchaseInvoices}
                    users={users}
                    branches={branches}
                    products={products}
                    inventoryAdjustmentLogs={inventoryAdjustmentLogs}
                    onBack={() => setActiveView('Inventory/Products')}
                    onEditProduct={handleOpenProductModal}
                    onTransferInventory={handleTransferInventory}
                    onAdjustInventory={handleAdjustInventory}
                />;
            }
        }
        if (activeView === 'Inventory/Products') {
            return <ProductsPage 
                products={products}
                onProductSelect={(product) => setActiveView(`Inventory/Products/${product.id}`)}
                onAddNew={() => handleOpenProductModal({})}
            />;
        }
        if (['Inventory/Stocktakes', 'Inventory/Transfers'].includes(activeView)) {
             return <div className="glass-pane" style={{padding: '2rem', textAlign: 'center'}}>Coming Soon: {activeView.split('/')[1]}</div>
        }
        
        // Other Modules
        if (activeView.startsWith('POS/Start')) return <POS products={products} inventory={inventoryItems} customers={customers} onSaveCustomer={handleSaveCustomer} onSave={handleSaveSale} integrationSettings={integrationSettings} branches={branches} />;
        if (activeView.startsWith('POS/Sessions')) return <POSSessions sessions={sessionsForView} activeSession={activeSession} sales={sales} branches={branches} employees={employees} onStartSession={handleStartSession} onCloseSession={handleCloseSession} setActiveView={setActiveView} />;
        if (activeView.startsWith('Customers')) return <Customers customers={customers} onSave={handleSaveCustomer} whatsappSettings={integrationSettings.whatsapp} branches={branches} />;
        if (activeView.startsWith('Manufacturing/Orders')) return <ManufacturingOrderPage order={productionOrders[0]} branches={branches} products={products} inventory={inventoryForView} employees={employeesForView} onSave={handleSaveProductionOrder} />;
        if (activeView.startsWith('Manufacturing/Tasks')) return <ProductionTasks tasks={productionTasks} orders={productionOrders} employees={employeesForView} onSave={handleSaveProductionTask} />;
        if (activeView.startsWith('Finance/Expenses')) return <Expenses expenses={expensesForView} onSave={handleSaveExpense} branches={branches} financialAccounts={financialAccounts} />;
        if (activeView.startsWith('Finance/Accounts')) return <FinancialAccounts financialAccounts={financialAccounts} branches={branches} />;
        if (activeView.startsWith('Ledger/ChartOfAccounts')) return <ChartOfAccountsPage accounts={chartOfAccounts} onSave={() => {}} />;
        if (activeView.startsWith('HR/Employees')) return <Employees employees={employeesForView} onSave={handleSaveEmployee} onDelete={handleDeleteEmployee} branches={branches} />;
        if (activeView.startsWith('HR/Attendance')) return <Attendance employees={employeesForView} attendanceRecords={attendance} onRecordAttendance={handleRecordAttendance} />;
        if (activeView.startsWith('HR/LeaveRequests')) return <LeaveRequests employees={employees} leaveRequests={leaveRequests} onSaveRequest={handleSaveLeaveRequest} />;
        if (activeView.startsWith('HR/AdvanceRequests')) return <AdvanceRequestsPage requests={advanceRequests} employees={employees} onSaveRequest={handleSaveAdvanceRequest} />;
        if (activeView.startsWith('HR/GeneralRequests')) return <GeneralRequestsPage requests={generalRequests} employees={employees} onSaveRequest={handleSaveGeneralRequest} />;
        if (activeView.startsWith('HR/Salaries')) return <Salaries employees={employeesForView} payments={salaryPayments} onRunPayroll={handleRunPayroll} />;
        if (activeView.startsWith('Branches')) return <Branches branches={branches} onSave={handleSaveBranch} />;
        if (activeView.startsWith('Renewals')) return <Licenses renewables={renewables} setRenewables={setRenewables} onCheckReminders={checkAndSendRenewalReminders} />;
        if (activeView.startsWith('Reports')) return <Reports sales={salesForView} purchases={purchaseInvoicesForView} products={products} branches={branches} expenses={expensesForView} customers={customers} financialAccounts={financialAccounts} activeReport={activeView} suppliers={suppliers} />;
        
        // Settings
        if (activeView.startsWith('Settings/General')) return <Settings settings={settings} setSettings={setSettings} />;
        if (activeView.startsWith('Settings/Sales')) return <SettingsSales />;
        if (activeView.startsWith('Settings/Purchases')) return <SettingsPurchases />;
        if (activeView.startsWith('Settings/Suppliers')) return <SettingsSuppliers />;
        if (activeView.startsWith('Settings/Integrations')) return <IntegrationsPage settings={integrationSettings} onSave={handleSaveIntegrations} />;
        if (activeView.startsWith('Users')) return <UsersPage users={users} branches={branches} onSave={handleSaveUser} onViewPermissions={setViewingPermissionsFor} />;
        
        return <Dashboard sales={salesForView} purchases={purchaseInvoicesForView} employees={employeesForView} inventory={inventoryForView} products={products} branches={branches} settings={settings} accounts={chartOfAccounts} expenses={expensesForView} renewables={renewables} leaveRequests={leaveRequests} advanceRequests={advanceRequests} generalRequests={generalRequests} suppliers={suppliers} />;
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            <div className={`app-layout theme-${theme}`}>
                <Sidebar 
                    activeView={activeView} 
                    setActiveView={setActiveView} 
                    lowStockCount={lowStockItemsCount} 
                    pendingLeavesCount={totalPendingHRRequests}
                />
                <div className="main-content-wrapper">
                    <Header 
                        viewTitle={activeView} 
                        theme={theme} 
                        toggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} 
                        products={products}
                        onProductSelect={(product) => setActiveView(`Inventory/Products/${product.id}`)}
                        onViewMyPermissions={() => setViewingPermissionsFor(user)}
                    />
                    <main className="main-content">
                        {renderView()}
                    </main>
                </div>
                <AIChatbot dataContext={chatbotDataContext} />
                {editingProduct && (
                    <ProductModal
                        product={editingProduct}
                        allProducts={products}
                        onClose={handleCloseProductModal}
                        onSave={handleSaveAndCloseProductModal}
                    />
                )}
                {viewingPermissionsFor && (
                    <PermissionsViewModal
                        user={viewingPermissionsFor}
                        onClose={() => setViewingPermissionsFor(null)}
                    />
                )}
            </div>
        </AuthContext.Provider>
    );
};

const App: React.FC = () => {
    return (
        <ToastProvider>
            <DataProvider>
                <AppContent />
            </DataProvider>
        </ToastProvider>
    );
}

export default App;
