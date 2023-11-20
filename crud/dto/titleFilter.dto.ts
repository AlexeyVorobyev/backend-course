import { ApiProperty } from '@nestjs/swagger'

export class TitleFilterSwaggerDTO {
	@ApiProperty({
		default: '',
		required: false,
		type: 'string',
	})
	titleFilter: string
}