import { Prisma } from '@prisma/client'
import { IsString } from 'class-validator'
import IsJsonObject from '../../../crud/decorators/IsJsonObject.decorator'

export class CreateGraphDto {
	@IsString()
	name: string
	@IsJsonObject()
	graphData: Prisma.InputJsonObject
}
