import { ProjectStatus } from '../entities/project.entity';

export class CreateProjectDto {
	projectName: string;
	projectDescription: string;
	price: number;
	amount: number;
	status?: ProjectStatus;
	clientId?: number;
	userId?: number;
}
