import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from 'src/bases/entities/base.entity'
import { User } from 'src/users/entities/user.entity'

export class Customizations {
	primaryColor: string // Cor principal do veículo
	secondaryColor?: string // Cor secundária (opcional)
	wheels?: Wheels // Detalhes sobre as rodas
	accessories?: string[] // Lista de acessórios
	performance?: Performance // Modificações de desempenho
}

export class Wheels {
	model: string // Modelo das rodas
	size: number // Tamanho das rodas em polegadas
}

export class Performance {
	engine: string // Tipo de motor
	power: number // Potência em CV (cavalos-vapor)
	torque: number // Torque em Nm (Newton-metros)
}

@Entity()
export class Vehicle extends BaseEntity {
	@Column()
	model: string

	@Column()
	color: string

	@Column()
	plate: string

	@ManyToOne(() => User, (user) => user.vehicles)
	user: User

	@Column('json', { nullable: true })
	customizations?: Customizations
}
