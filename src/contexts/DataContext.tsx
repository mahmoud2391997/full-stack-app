
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of your context data
interface DataContextType {
    // Replace 'any' with your actual data types
    users: any[];
    branches: any[];
    suppliers: any[];
    products: any[];
    customers: any[];
    sales: any[];
    employees: any[];
    inventoryItems: any[];
    expenses: any[];
    financialAccounts: any[];
    supplyChainItems: any[];
    supplyMovements: any[];
    supplyInventory: any[];
    loading: boolean;
    fetchData: (endpoint: string) => Promise<any>;
    // Add functions to add, update, delete data
}

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a custom hook to use the data context
export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

// Create the provider component
export const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [branches, setBranches] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [sales, setSales] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [financialAccounts, setFinancialAccounts] = useState([]);
    const [supplyChainItems, setSupplyChainItems] = useState([]);
    const [supplyMovements, setSupplyMovements] = useState([]);
    const [supplyInventory, setSupplyInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api';

    const fetchData = async (endpoint: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/${endpoint}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            const [ 
                usersData, 
                branchesData, 
                suppliersData, 
                productsData, 
                customersData, 
                salesData, 
                employeesData, 
                inventoryData, 
                expensesData, 
                financialsData,
                supplyChainItemsData,
                supplyMovementsData,
                supplyInventoryData
            ] = await Promise.all([
                fetchData('users'),
                fetchData('branches'),
                fetchData('suppliers'),
                fetchData('products'),
                fetchData('customers'),
                fetchData('sales'),
                fetchData('employees'),
                fetchData('inventory-items'),
                fetchData('expenses'),
                fetchData('financial-accounts'),
                fetchData('supply-chain-items'),
                fetchData('supply-movements'),
                fetchData('supply-inventory'),
            ]);
            setUsers(usersData);
            setBranches(branchesData);
            setSuppliers(suppliersData);
            setProducts(productsData);
            setCustomers(customersData);
            setSales(salesData);
            setEmployees(employeesData);
            setInventoryItems(inventoryData);
            setExpenses(expensesData);
            setFinancialAccounts(financialsData);
            setSupplyChainItems(supplyChainItemsData);
            setSupplyMovements(supplyMovementsData);
            setSupplyInventory(supplyInventoryData);
        };
        fetchAllData();
    }, []);

    const value = {
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
        loading,
        fetchData,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
