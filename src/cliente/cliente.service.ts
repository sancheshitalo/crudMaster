import { Cliente } from './entity/cliente.entity';
import { ClienteRepository } from './entity/cliente.repository';

export const ClienteService = {
  salvar(data: Cliente): Promise<Cliente> {
    return ClienteRepository.save(data);
  },
};
