import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class ProjectService {
  // async findAllForUser(user: any): Promise<Project[]> {
  //   if (user.role === 'admin') {
  //     return this.projectRepository.find({ relations: ['client', 'client.user'] });
  //   }
  //   return this.projectRepository
  //     .createQueryBuilder('project')
  //     .leftJoinAndSelect('project.client', 'client')
  //     .where('client.userId = :userId', { userId: user.id })
  //     .getMany();
  // }

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}


  async create(createProjectDto: CreateProjectDto) {
    return await this.projectRepository.save(createProjectDto);
  }

  async findAll(status?:ProjectStatus) {
    if(status){
    return await this.projectRepository.find({where: {status} , relations: ['client']});
    }
    return await this.projectRepository.find({relations: ['client']})
  }

  async findOne(id: number) {
    return await this.projectRepository.findOne({where: {id}, relations: ['client']});
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.projectRepository.update(id, updateProjectDto);
  }

  async remove(id: number) {
    return await this.projectRepository.delete(id);
  }

  //Client Section
  async findByClient(clientId: number) {
  return await this.clientRepository.find({where: {id:clientId}, relations: ['projects']})
  }

  async createForClient(clientId: number, createProjectDto: CreateProjectDto) {
    const client = await this.clientRepository.findOne({ where: { id: clientId } });
    if (!client) {
      throw new NotFoundException('Client Not Found');
    }
    const project = this.projectRepository.create({ ...createProjectDto, client });
    return await this.projectRepository.save(project);
  }
  
}
