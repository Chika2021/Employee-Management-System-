import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Role } from './model/user.model';
import { RolesGuard } from './role.guard';
import { Roles } from './role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() user: User): Promise<User | { user: User; token: string }> {
        return await this.usersService.register(user);
    }

    @Post('login')
    async login(@Body() user: User): Promise<User | { user: User; token: string }> {
        return await this.usersService.login(user);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    // Admin: all users with all their projects (for payment)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @Get('with-projects')
    async getUsersWithProjects() {
        return await this.usersService.getUsersWithProjects();
    }


    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: number) {
    return await this.usersService.remove(id);
}
}
