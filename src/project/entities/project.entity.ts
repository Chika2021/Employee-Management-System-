import { Client } from "src/client/entities/client.entity";
import { User } from "src/users/model/user.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ProjectStatus {
    NOT_STARTED = "not_started",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
}

@Entity()

export class Project {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        projectName: string;

    @Column()
        projectDescription: string;
    @Column()
        price: number

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.NOT_STARTED
    })
    status: ProjectStatus;

    @Column()
    amount: number;

    @ManyToOne(() => Client, client => client.projects)
        client: Client;

    @ManyToOne(() => User, user => user.projects)
    user: User;



}

