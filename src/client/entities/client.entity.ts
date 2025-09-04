import { Project } from "src/project/entities/project.entity";
import { User } from "src/users/model/user.model";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Client {

    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        clientFirstname: string;

    @Column()
        clientSurname: string;

    @Column()
        clientPhoneNumber: string;

    @Column()
        clientAccountName: string;

    @Column()
        clientAccountNumber: string;

    @OneToMany(() => Project, project => project.client)
    projects: Project[];

    @ManyToOne(() => User, user => user.clients)
    user: User;
}
