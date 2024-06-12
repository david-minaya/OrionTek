import { Header } from './components/header/header.component'
import { CustomerItem } from './components/customer-item/customer-item.component';
import { useEffect, useState } from 'react';
import { Customer } from './interfaces/customer';
import { Api } from './api/api';
import { AddCustomerModal } from './components/add-customer-modal/add-customer-modal.component';
import style from './App.module.css';

export function App() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  async function handleDelete(id: number) {
    await Api.deleteCustomer(id);
    setCustomers(customers => customers.filter(customer => customer.id !== id));
  }

  async function handleAddCustomer(name: string, addresses: string[]) {
    const customer = await Api.addCustomer(name, addresses);
    setCustomers(customers => [...customers, customer]);
  }

  async function handleUpdateName(id: number, name: string) {
    await Api.updateCustomer(id, name);
    setCustomers(customers => customers.map(customer => ({
      ...customer,
      name: customer.id === id ? name : customer.name
    })));
  }

  async function handleAddAddress(id: number, address: string) {
    const result = await Api.addAddress(id, address);
    setCustomers(customers => customers.map(customer => ({
      ...customer,
      addresses: customer.id === id 
        ? [...customer.addresses, result] 
        : customer.addresses
    })));
  }

  async function handleDeleteAddress(customerId: number, addressId: number) {
    await Api.deleteAddress(customerId, addressId);
    setCustomers(customers => customers.map(customer => ({
      ...customer,
      addresses: customer.id === customerId
        ? customer.addresses.filter(address => address.id !== addressId)
        : customer.addresses
    })));
  }

  async function fetch() {
    setCustomers(await Api.getCustomers());
  }

  return (
    <div>
      <Header/>
      <div className={style.content}>
        <div className={style.toolbar}>
          <h2 className={style.title}>Clientes</h2>
          <button onClick={() => setOpen(true)}>Agregar</button>
        </div>
        <div className={style.customers}>
          {customers.map(customer =>
            <CustomerItem 
              key={customer.id} 
              customer={customer}
              onUpdateName={handleUpdateName}
              onAddAddress={handleAddAddress}
              onDeleteAddress={handleDeleteAddress}
              onDelete={handleDelete}/>
          )}
        </div>
      </div>
      <AddCustomerModal
        open={open}
        onSave={handleAddCustomer}
        onClose={() => setOpen(false)}/>
    </div>
  );
}

