import { Fragment, MouseEvent, useEffect, useState } from 'react';
import { CloseIcon } from '../../icons/closeIcon';
import style from './customer-modal.module.css';
import { Customer } from '../../interfaces/customer';
import { EditIcon } from '../../icons/editIcon';
import { Address } from '../../interfaces/address';
import { DeleteIcon } from '../../icons/deleteIcon';
import { AddIcon } from '../../icons/addIcon';

interface Props {
  open: boolean;
  customer: Customer;
  onClose: () => void;
  onUpdateName: (id: number, name: string) => void;
  onAddAddress: (id: number, address: string) => void;
  onDeleteAddress: (customerId: number, addressId: number) => void;
  onSave: (name: string, addresses: string[]) => void;
}

export function CustomerModal(props: Props) {

  const {
    open,
    customer,
    onUpdateName,
    onAddAddress,
    onDeleteAddress,
    onClose
  } = props;

  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [enableEditName, setEnableEditName] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);

  useEffect(() => {
    if (open) {
      setAddresses(customer.addresses);
    }
  }, [open, customer])

  function handleEditName() {
    setEnableEditName(true);
    setName(customer.name);
  }

  function handleSaveName() {
    onUpdateName(customer.id, name);
    setName('');
    setEnableEditName(false);
  }

  function handleShowAddAddress() {
    setShowAddAddress(state => !state);
  }

  function handleAddAddress() {
    onAddAddress(customer.id, address);
    setShowAddAddress(false);
    setAddress('');
  }

  function handleDeleteAddress(addressId: number) {
    onDeleteAddress(customer.id, addressId);
  }

  function handleClose(e: MouseEvent<SVGElement>) {
    e.stopPropagation();
    onClose();
    setName('');
    setAddress('');
    setAddresses([]);
    setEnableEditName(false);
  }

  if (!open) {
    return null;
  }

  return (
    <div className={style.overlay}>
      <div className={style.card}>
        <div className={style.toolbar}>
          <span className={style.title}>Cliente</span>
          <CloseIcon 
            className={style.icon}
            onClick={handleClose}/>
        </div>
        <div className={style.content}>
          <span className={style.label}>Nombre</span>
          <div className={style.nameContainer}>
            {!enableEditName &&
              <Fragment>
                <span className={style.name}>{customer.name}</span>
                <EditIcon 
                  className={style.icon}
                  onClick={handleEditName}/>
              </Fragment>
            }
            {enableEditName &&
              <Fragment>
                <input
                  className={style.input}
                  value={name} 
                  onChange={e => setName(e.target.value)}/>
                <button onClick={handleSaveName}>Guardar</button>
              </Fragment>
            }
          </div>
          <div className={style.addressToolbar}>
            <span className={style.label}>Direcciones</span>
            <AddIcon 
              className={style.icon}
              onClick={handleShowAddAddress}/>
          </div>
          {showAddAddress &&
            <div className={style.addressField}>
              <input
                className={style.input}
                value={address}
                onChange={e => setAddress(e.target.value)}/>
              <button 
                className={style.addButton}
                onClick={handleAddAddress}>
                Agregar
              </button>
            </div>
          }
          <div className={style.addresses}>
            {addresses.map(address => 
              <div key={address.id} className={style.addressItem}>
                <span className={style.addressItemTitle}>{address.address}</span>
                <DeleteIcon 
                  className={style.addressItemIcon}
                  onClick={() => handleDeleteAddress(address.id)}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
