import { AppDataSource } from '../../data-source';
import { Endereco } from './endereco.entity';

export const EnderecoRepository = AppDataSource.getRepository(Endereco);
