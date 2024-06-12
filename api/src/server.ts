import 'express-async-errors';
import cors from 'cors';
import express, { ErrorRequestHandler, NextFunction, Router } from 'express';
import { AppDataSource } from './appDataSource';
import { Customer } from './entities/customer.entity';
import { Address } from './entities/address.entity';

const route = Router();

route.get('/customers', async (req, res) => {

  const customers = await Customer.find();
  
  res.status(200);
  res.json(customers);
});

route.get('/customers/:id', async (req, res) => {

  const customer = await Customer.findOneBy({ id: parseInt(req.params.id) });

  if (!customer) {
    res.status(404);
    res.json({ error: 'Not found' });
    return;
  }
  
  res.status(200);
  res.json(customer);
});

route.post('/customers', async (req, res) => {

  const customer = await Customer.save({ 
    name: req.body.name,
    addresses: req.body.addresses.map((address: string) => ({
      address
    }))
  });

  res.status(201);
  res.json(customer);
});

route.patch('/customers/:id', async (req, res) => {
  
  const customer = await Customer.findOneBy({ id: parseInt(req.params.id) });

  if (!customer) {
    res.status(404);
    res.json({ error: 'Not found' });
    return;
  }

  await Customer.save({ id: customer.id, name: req.body.name })

  res.sendStatus(200);
});

route.delete('/customers/:id', async (req, res) => {
  
  const customer = await Customer.findOneBy({ id: parseInt(req.params.id) });

  if (!customer) {
    res.status(404);
    res.json({ error: 'Not found' });
    return;
  }

  await Address.delete({ customer });
  await Customer.remove(customer);

  res.sendStatus(200);
});

route.post('/customers/:id/addresses', async (req, res) => {

  const id = parseInt(req.params.id);
  const customer = await Customer.findOneBy({ id });

  if (!customer) {
    res.status(404);
    res.json({ error: 'Not found' });
    return;
  }

  const address = await Address.save({ 
    address: req.body.address, 
    customer: { id } 
  });

  res.status(201);
  res.json(address);
});

route.delete('/customers/:customerId/addresses/:addressId', async (req, res) => {

  const customerId = parseInt(req.params.customerId);
  const addressId = parseInt(req.params.addressId);

  const customer = await Customer.findOneBy({ id: customerId });
  const address = await Address.findOneBy({ id: addressId, customer: { id: customerId } });

  if (!customer || !address) {
    res.status(404);
    res.json({ error: 'Not found' });
    return;
  }

  await Address.remove(address);

  res.sendStatus(200);
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: 'Internal Server Error '});
};

(async () => {

  await AppDataSource.initialize();

  const app = express();

  app.use(cors())
  app.use(express.json());
  app.use(route);
  app.use(errorHandler);
  
  app.listen(parseInt(process.env.PORT!), process.env.HOST!, () => { 
    console.log(`http://${process.env.HOST}:${process.env.PORT}`);
  });
})();
