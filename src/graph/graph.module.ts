import { Module } from '@nestjs/common'
import { GraphService } from './graph.service'
import { GraphController } from './graph.controller'
import { PrismaService } from '../prisma.service'

@Module({
	controllers: [GraphController],
	providers: [GraphService, PrismaService],
})
export class GraphModule {
}
