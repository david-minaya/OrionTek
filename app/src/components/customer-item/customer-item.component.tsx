import { MouseEvent, useState } from 'react';
import { DeleteIcon } from '../../icons/deleteIcon';
import { Customer } from '../../interfaces/customer';
import { CustomerModal } from '../customer-modal/customer-modal.component';
import style from './customer-item.module.css';

interface Props {
  customer: Customer;
  onUpdateName: (id: number, name: string) => void;
  onAddAddress: (id: number, address: string) => void;
  onDeleteAddress: (customerId: number, addressId: number) => void;
  onDelete: (id: number) => void;
}

export function CustomerItem(props: Props) {

  const { 
    customer,
    onUpdateName,
    onAddAddress,
    onDeleteAddress,
    onDelete 
  } = props;

  const [open, setOpen] = useState(false);

  function handleDelete(event: MouseEvent<SVGElement>) {
    onDelete(customer.id);
    event.stopPropagation();
  }

  return (
    <div 
      className={style.item}
      onClick={() => setOpen(true)}>
      <span className={style.title}>{customer.name}</span>
      <DeleteIcon 
        className={style.icon}
        onClick={handleDelete}/>
      <CustomerModal
        open={open}
        customer={customer}
        onUpdateName={onUpdateName}
        onAddAddress={onAddAddress}
        onDeleteAddress={onDeleteAddress}
        onSave={() => {}}
        onClose={() => setOpen(false)}/>
    </div>
  )
}
