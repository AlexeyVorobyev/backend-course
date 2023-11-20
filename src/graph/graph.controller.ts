import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { GraphService } from './graph.service'
import { CreateGraphDto } from './dto/create-graph.dto'
import { UpdateGraphDto } from './dto/update-graph.dto'
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { CrudGetAll } from '../../crud/decorators/CrudGetAll.decorator'
import { GetAllGraphDto } from './dto/getAll-graph.dto'
import { GetEditDeleteOneGraphDto } from './dto/getOne-graph.dto'

@Controller('graph')
@ApiTags('graph')
export class GraphController {
	constructor(private readonly graphService: GraphService) {
	}

	@Post()
	@ApiBody({ required: true, type: CreateGraphDto })
	post(@Body() createGraphDto: CreateGraphDto) {
		return this.graphService.create(createGraphDto)
	}

	@Get()
	@CrudGetAll('titleFilter', 'pagination', 'sort')
	getMany(@Query() params: GetAllGraphDto) {
		return this.graphService.findMany(params)
	}

	@Get(':id')
	getUnique(@Param() params: GetEditDeleteOneGraphDto) {
		return this.graphService.findUnique(params.id)
	}

	@Patch(':id')
	patch(
		@Param() params: GetEditDeleteOneGraphDto,
		@Body() updateGraphDto: UpdateGraphDto,
	) {
		return this.graphService.update(params.id, updateGraphDto, true)
	}

	@Put(':id')
	put(
		@Param() params: GetEditDeleteOneGraphDto,
		@Body() updateGraphDto: UpdateGraphDto,
	) {
		return this.graphService.update(params.id, updateGraphDto, false)
	}

	@Delete(':id')
	delete(@Param() params: GetEditDeleteOneGraphDto) {
		return this.graphService.remove(params.id)
	}
}
