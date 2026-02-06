import { UserRole } from 'src/shared/user.role';
import { 
    Entity, PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
 } from 'typeorm';


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 30})
    fullName: string;
    
    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;

    @Column({type: 'enum', enum: UserRole})
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}