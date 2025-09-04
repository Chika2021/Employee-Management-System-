import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { ChildProcessWithoutNullStreams } from 'child_process';
import { Role, User } from 'src/users/model/user.model';


@Injectable()
export class ClientService {
 

  constructor(@InjectRepository(Client) private readonly clientRepository:Repository<Client> ,
              @InjectRepository(User) private readonly userRepository: Repository<User>
){}


  async create(createClientDto: CreateClientDto, userId: number):Promise<Client> {
    const user = await this.userRepository.findOne({where: {id: userId}})
    if(!user) {
      throw new NotFoundException('User Not Found')
    }
    const client =  this.clientRepository.create({...createClientDto, user})
    return await this.clientRepository.save(client)
  }

  async findAllClient(user: User): Promise<Client[]> {
    const users = await this.userRepository.findOne({where: {id: user.id}})

    console.log(user)
    if(!users) {
      throw new NotFoundException('User Not Found')
    }
    return await this.clientRepository.find({ where: { user: { id: user.id } } });
  }

  async findAllForUser(user: any): Promise<Client[]> {
    if (user.role === 'admin') {
      return this.clientRepository.find({ relations: ['projects', 'user'] });
    }
    return this.clientRepository.find({ where: { user: { id: user.id } }, relations: ['projects', 'user'] });
  }

  async findOne(id: number):Promise<Client | null> {
    return await this.clientRepository.findOne({where: {id}, relations: ['projects', 'user']});
  }

  async update(id: number, updateClientDto: UpdateClientDto, user: User, role: Role): Promise<Client | null> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException('Client Not Found');
    }
    // 🔒 Enforce ownership
    if (role !== 'admin' && client.user.id !== user.id) {
      throw new ForbiddenException('You do not have permission to update this client');
    }
    Object.assign(client, updateClientDto, client);

     return await this.clientRepository.save(client);
  }

  async remove(id: number) {
    return await this.clientRepository.delete(id);
  }

}
