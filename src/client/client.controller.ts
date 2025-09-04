import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ProjectService } from '../project/project.service';
import { AuthGuard } from '@nestjs/passport';
import { Project } from 'src/project/entities/project.entity';



@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService,
    private readonly projectsService: ProjectService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createClientDto: CreateClientDto, @Request() req) {
    const user = req.user.id
    return this.clientService.create(createClientDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findClient(@Request() req) {
    const user = req.user
    console.log(user)
    return this.clientService.findAllClient(user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto, @Request() req ) {
    const user = req.user.id
    const role = req.user.role
    return this.clientService.update(+id, updateClientDto, user, role);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }

//THIS ROUTE ENABLES THE CLIENT TO GET ALL PROJECTS ASSOCIATED WITH THEM
  @UseGuards(AuthGuard('jwt'))
  @Get(':id/projects')
  async getProjectsForClient(@Param('id') clientId: number) {
    return this.projectsService.findByClient(Number(clientId));
  }

  //THIS ROUTE ENABLES THE CLIENT TO CREATE A NEW PROJECT
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/projects/create')
  async createClientProject(@Param('id') id:string , @Body() project: Project) {
    return this.projectsService.createForClient(Number(id), project)
  }

}
