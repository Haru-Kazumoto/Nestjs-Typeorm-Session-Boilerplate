import { Timestamps } from "src/utils/base.timestamps.utils";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../post/post.entity";
import { Exclude, instanceToPlain } from "class-transformer";

@Entity({name: "users"})
export class User extends Timestamps{

    @PrimaryGeneratedColumn("increment")
    public id: number;

    @Column()
    public username: string;

    @Column()
    @Exclude({toPlainOnly: true})
    public password: string;

    @Column({unique: true})
    public email: string;
 
    @OneToMany(() => Post, post => post.user)
    public posts: Post[];

    toJSON(){
        return instanceToPlain(this)
    }
}