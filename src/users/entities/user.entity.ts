import { Column, Entity, BeforeInsert, OneToMany } from 'typeorm'
import { hashSync } from 'bcrypt'
import { BaseEntity } from 'src/bases/entities/base.entity'
import { Vehicle } from 'src/vehicle/entities/vehicle.entity'

@Entity()
export class User extends BaseEntity {
	@Column()
	name: string

	@Column()
	email: string

	@Column()
	password: string

	@Column({ default: true })
	status: boolean

	@OneToMany(() => Vehicle, (vehicle) => vehicle.user)
	vehicles: Vehicle[]

	@BeforeInsert()
	hashPassword() {
		this.password = hashSync(this.password, 10)
	}
}
