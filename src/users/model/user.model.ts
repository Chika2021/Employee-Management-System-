import { Client } from "src/client/entities/client.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    ADMIN = "admin",
    USER = "user",
}

@Entity()

export class User {

    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string

    @Column({ unique: true })
    email: string

    @Column()
        password: string

    @Column({ unique: true })
    phoneNumber: string

    @Column()
        address:string

    @Column()
        city:string

    @Column()
        country:string

    @Column()
        accountName:string

    @Column()
        accountNumber:string

    @Column()
        bankName: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
        role: Role

    @OneToMany(() => Client, client => client.user)
    clients: Client[];



}