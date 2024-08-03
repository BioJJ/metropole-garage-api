import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { ApiTags, ApiBody } from '@nestjs/swagger'
import { Vehicle } from './entities/vehicle.entity'

@Controller('vehicle')
@ApiTags('users')
export class VehicleController {
	constructor(private readonly vehicleService: VehicleService) {}

	@Post()
	async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
		return await this.vehicleService.create(createVehicleDto)
	}

	@Get()
	async findAll(): Promise<Vehicle[]> {
		return await this.vehicleService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Vehicle> {
		return await this.vehicleService.findOne(+id)
	}

	@Get('user/:userId')
	async findByUserId(@Param('userId') userId: number): Promise<Vehicle[]> {
		return this.vehicleService.findByUserId(userId)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateVehicleDto: UpdateVehicleDto
	): Promise<void> {
		return await this.vehicleService.update(+id, updateVehicleDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return await this.vehicleService.remove(+id)
	}
}
