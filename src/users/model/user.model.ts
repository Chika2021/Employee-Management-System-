import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
        email: string

    @Column()
        password: string

    @Column()
        phoneNumber:string

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

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
        role: Role


}