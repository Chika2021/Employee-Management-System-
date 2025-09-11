import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async getSummary() {
    const totalClients = await this.clientRepository.count();
    const totalProjects = await this.projectRepository.count();
    // Assuming Project entity has an 'amount' field
    const { sum } = await this.projectRepository
      .createQueryBuilder('project')
      .select('SUM(project.amount)', 'sum')
      .getRawOne();
    return {
      totalClients,
      totalProjects,
      totalAmount: Number(sum) || 0,
    };
  }
}
