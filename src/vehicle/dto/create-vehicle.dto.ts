import {
	IsString,
	IsOptional,
	IsObject,
	IsArray,
	IsNotEmpty,
	IsNumber
} from 'class-validator'
import { User } from 'src/users/entities/user.entity'

export class WheelsDto {
	@IsString()
	model: string // Modelo das rodas

	@IsNotEmpty()
	size: number // Tamanho das rodas em polegadas
}

export class PerformanceDto {
	@IsString()
	engine: string // Tipo de motor

	@IsNotEmpty()
	power: number // Potência em CV (cavalos-vapor)

	@IsNotEmpty()
	torque: number // Torque em Nm (Newton-metros)
}

export class CreateVehicleDto {
	@IsNotEmpty()
	userId: number // ID do usuário associado

	@IsString()
	model: string // Modelo do veículo

	@IsString()
	color: string // Cor do veículo

	@IsString()
	plate: string // Placa do veículo

	@IsString()
	primaryColor: string // Cor principal do veículo

	@IsString()
	@IsOptional()
	secondaryColor?: string // Cor secundária (opcional)

	@IsObject()
	@IsOptional()
	wheels?: WheelsDto // Detalhes sobre as rodas

	@IsArray()
	@IsOptional()
	accessories?: string[] // Lista de acessórios

	@IsObject()
	@IsOptional()
	performance?: PerformanceDto // Modificações de desempenho
}
