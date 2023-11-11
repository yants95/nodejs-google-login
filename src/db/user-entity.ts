import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryColumn({ type: "varchar" })
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  email!: string;

  @Column({ type: "varchar", nullable: true })
  password!: string;

  @Column({ name: "google_id", type: "varchar", nullable: true })
  googleId!: string;
}
