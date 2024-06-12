import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, Column } from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class Customer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Address, address => address.customer, { eager: true, cascade: ['insert', 'remove'] })
  addresses!: Address[];
}
