import { useState } from 'react';
import { CloseIcon } from '../../icons/closeIcon';
import style from './add-customer-modal.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, addresses: string[]) => void;
}

export function AddCustomerModal(props: Props) {

  const {
    open,
    onClose,
    onSave
  } = props;

  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [addresses, setAddresses] = useState<string[]>([]);

  function handleAddAddress() {
    setAddresses(addresses => [...addresses, address]);
    setAddress('');
  }

  function handleRemoveAddress(index: number) {
    setAddresses(addresses => addresses.filter((_, i) => i !== index));
  }

  function handleClose() {
    onClose();
    setName('');
    setAddress('');
    setAddresses([]);
  }

  function handleSave() {
    onSave(name, addresses);
    handleClose();
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
          <input
            className={style.input}
            value={name} 
            onChange={e => setName(e.target.value)}/>
          <span className={style.label}>Direcciones</span>
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
          <div className={style.addresses}>
            {addresses.map((address, index) => 
              <div key={address+index} className={style.addressItem}>
                <span className={style.addressItemTitle}>{address}</span>
                <CloseIcon 
                  className={style.addressItemIcon}
                  onClick={() => handleRemoveAddress(index)}/>
              </div>
            )}
          </div>
        </div>
        <div className={style.actions}>
          <button onClick={handleClose}>Cancelar</button>
          <button onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  )
}
