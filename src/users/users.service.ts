import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, Role } from './model/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()


export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly jwtService: JwtService) { }

    async seedAdmin() {

        const existingAdmin = await this.userRepository.findOne({
            where: { email: 'testing@admin.com' },
        });

        if (existingAdmin) {
            return { message: 'Admin already exists' };
        }

        const admin = this.userRepository.create({
            name: 'Admin',
            email: 'testing@admin.com',
            password: await bcrypt.hash('Admin123', 10),
            role: Role.ADMIN
        });
        await this.userRepository.save(admin);
        const token = await this.jwtService.signAsync({ id: admin.id });
        return { admin, token };
    }


    async register(user: User): Promise<User | { user: User; token: string }> {
        const { name, email, password, phoneNumber, address, city, country, accountName, accountNumber, role } = user;

        const hashedPassword = await bcrypt.hash(password, 10);

        user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            address,
            city,
            country,
            accountName,
            accountNumber,
            role: role ?? Role.USER
        });

        const users = await this.userRepository.save(user);
        const token = await this.jwtService.signAsync({ id: users.id });
        return { ...users, token };
    }


    async login (user: User): Promise<User | { user: User; token: string }> {
        const { name, email, password } = user;
        const foundUser = await this.userRepository.findOne({ where: { email } });
        if (!foundUser) {
            throw new Error('User not found');
        }

        if(!name || !email || !password) {
            throw new Error('All fields are required');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = await this.jwtService.signAsync({ id: user.id });
        return { ...user, token };
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

}
