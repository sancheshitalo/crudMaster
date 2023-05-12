import { AppDataSource } from '../../data-source';
import { Cliente } from './cliente.entity';

export const ClienteRepository = AppDataSource.getRepository(Cliente)