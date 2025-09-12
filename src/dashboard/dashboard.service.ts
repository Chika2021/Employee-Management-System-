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

  async getSummary(userId: number) {
    // Count clients belonging to the user
    const totalClients = await this.clientRepository.count({ where: { user: { id: userId } } });
    // Get all client IDs for this user
    const userClients = await this.clientRepository.find({ where: { user: { id: userId } } });
    const clientIds = userClients.map(c => c.id);
    // Count projects for these clients
    let totalProjects = 0;
    let totalAmount = 0;
    if (clientIds.length > 0) {
      if (clientIds.length === 1) {
        totalProjects = await this.projectRepository.count({ where: { client: { id: clientIds[0] } } });
      } else {
        totalProjects = await this.projectRepository.count({ where: clientIds.map(id => ({ client: { id } })) });
      }
      // Sum amount for these projects
      const { sum } = await this.projectRepository
        .createQueryBuilder('project')
        .select('SUM(project.amount)', 'sum')
        .where('project.clientId IN (:...clientIds)', { clientIds })
        .getRawOne();
      totalAmount = Number(sum) || 0;
    }
    return {
      totalClients,
      totalProjects,
      totalAmount,
    };
  }
}
