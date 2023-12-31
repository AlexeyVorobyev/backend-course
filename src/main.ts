import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule,{
		cors:true
	})

	const config = new DocumentBuilder()
		.setTitle('Alex Graphs')
		.setDescription('The Alex Graphs API description')
		.setVersion('0.1')
		.addTag('graph')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	app.useGlobalPipes(new ValidationPipe({
		transform: true,
	}))

	await app.listen(4501)
}

bootstrap()
