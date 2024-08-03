import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Vehicle } from './entities/vehicle.entity'
import { Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class VehicleService {
	constructor(
		@InjectRepository(Vehicle)
		private readonly vehicleRepository: Repository<Vehicle>,
		private readonly userService: UsersService
	) {}
	async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
		const vehicle = new Vehicle()

		vehicle.model = createVehicleDto.model
		vehicle.color = createVehicleDto.color
		vehicle.plate = createVehicleDto.plate
		vehicle.user = await this.getUser(createVehicleDto.userId)

		vehicle.customizations = {
			primaryColor: createVehicleDto.primaryColor,
			secondaryColor: createVehicleDto.secondaryColor,
			wheels: createVehicleDto.wheels,
			accessories: createVehicleDto.accessories,
			performance: createVehicleDto.performance
		}
		return await this.vehicleRepository.save(vehicle)
	}

	async findAll(): Promise<Vehicle[]> {
		return await this.vehicleRepository.find({
			select: ['id', 'model', 'plate', 'color', 'customizations', 'user'],
			relations: {
				user: true
			}
		})
	}

	async findOne(id: number): Promise<Vehicle> {
		const vehicle = await this.vehicleRepository.findOne({
			select: ['id', 'model', 'plate', 'color', 'customizations', 'user'],
			where: { id },
			relations: {
				user: true
			}
		})

		if (!vehicle) {
			throw new NotFoundException(`Não achei um Vehicle com o id ${id}`)
		}
		return vehicle
	}

	async findByUserId(userId: number): Promise<Vehicle[]> {
		return await this.vehicleRepository.find({
			where: { user: { id: userId } },
			relations: {
				user: true
			}
		})
	}

	async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<void> {
		const vehicleSearch = await this.findOne(id)

		if (vehicleSearch) {
			const vehicle = new Vehicle()

			vehicle.id = id
			vehicle.model = updateVehicleDto.model
			vehicle.color = updateVehicleDto.color
			vehicle.plate = updateVehicleDto.plate

			vehicle.customizations = {
				primaryColor: updateVehicleDto.primaryColor,
				secondaryColor: updateVehicleDto.secondaryColor,
				wheels: updateVehicleDto.wheels,
				accessories: updateVehicleDto.accessories,
				performance: updateVehicleDto.performance
			}

			await this.vehicleRepository.save(vehicle)
		}
	}

	async remove(id: number): Promise<void> {
		await this.findOne(id)

		this.vehicleRepository.softDelete({ id })
	}

	private async getUser(userId: number): Promise<User> {
		return await this.userService.findOne(userId)
	}
}
