import axios from 'axios';
import { Customer } from '../interfaces/customer';
import { Address } from '../interfaces/address';

class _Api {

  api = axios.create({ baseURL: import.meta.env.VITE_API });

  async getCustomers() {
    const res = await this.api.get<Customer[]>('/customers');
    return res.data;
  }

  async getCustomer(id: number) {
    const res = await this.api.get<Customer>(`/customers/${id}`);
    return res.data;
  }

  async addCustomer(name: string, addresses: string[]) {
    const res = await this.api.post<Customer>('/customers', { name, addresses });
    return res.data;
  }
 
  async updateCustomer(id: number, name: string) {
    const res = await this.api.patch<Customer>(`/customers/${id}`, { name });
    return res.data;
  }

  async deleteCustomer(id: number) {
    await this.api.delete(`/customers/${id}`);
  }

  async addAddress(customerId: number, address: string) {
    const res = await this.api.post<Address>(`/customers/${customerId}/addresses`, { address });
    return res.data;
  }

  async deleteAddress(customerId: number, addressId: number) {
    await this.api.delete(`/customers/${customerId}/addresses/${addressId}`);
  }
}

export const Api = new _Api();
