import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {CreateGraphDto} from './dto/create-graph.dto'
import {UpdateGraphDto} from './dto/update-graph.dto'
import {PrismaService} from '../prisma.service'
import {GetAllGraphDto} from './dto/getAll-graph.dto'

@Injectable()
export class GraphService {
	constructor(private prisma: PrismaService) {
	}

	create(createGraphDto: CreateGraphDto) {
		try {
			return this.prisma.graph.create({
				data: {
					name: createGraphDto.name,
					graphData: createGraphDto.graphData,
					creationDate: new Date(Date.now()),
					updateDate: new Date(Date.now()),
				},
			})
		} catch (error) {
			throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST)
		}
	}

	async findMany(params: GetAllGraphDto) {
		const resultData = await this.prisma.graph.findMany({
			skip: params.page * params.perPage,
			take: params.perPage,
			where: {
				name: {
					contains: params.titleFilter,
				},
			},
		})
		const totalElements = await this.prisma.graph.count()

		return {
			totalElements: totalElements,
			totalPages: Math.floor(totalElements ? totalElements / params.perPage + 1 : 0),
			data: resultData,
		}
	}

	async findUnique(id: string) {
		const resultData = await this.prisma.graph.findUnique({
			where: {
				id: id,
			},
		})
		if (!resultData) {
			throw new HttpException('Entity with this id not found', HttpStatus.NOT_FOUND)
		}
		return resultData
	}

	async update(id: string, updateGraphDto: UpdateGraphDto, patch: boolean) {
		try {
			return await this.prisma.graph.update({
				where: {
					id: id,
				},
				data: {
					...(patch && await this.findUnique(id)),
					...updateGraphDto,
					updateDate: new Date(Date.now()),
				},
			})
		} catch (error) {
			throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST)
		}
	}

	async remove(id: string) {
		try {
			return await this.prisma.graph.delete({
				where: {
					id: id,
				},
			})
		} catch (error) {
			throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST)
		}
	}
}
