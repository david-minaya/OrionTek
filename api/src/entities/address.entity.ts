import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Address extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  address!: string;

  @ManyToOne(() => Customer, customer => customer.addresses)
  customer!: Customer;
}
