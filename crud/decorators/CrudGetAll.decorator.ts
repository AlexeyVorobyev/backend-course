import { applyDecorators } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { PaginationSwaggerDTO } from '../dto/pagination.dto'
import { SortSwaggerDto } from '../dto/sort.dto'
import { TitleFilterSwaggerDTO } from '../dto/titleFilter.dto'

enum EOption {
	sort = 'sort',
	pagination = 'pagination',
	titleFilter = 'titleFilter'
}

type TOption = `${EOption}`

export function CrudGetAll(...options: TOption[]) {
	console.debug(options)

	const decorators = Array.from(new Set(options)).map((option) => {
		switch (option) {
			case EOption.sort:
				return ApiQuery({
					name: 'sort',
					required: false,
					type: SortSwaggerDto,
				})
			case EOption.pagination:
				return ApiQuery({
					name: 'pagination',
					required: false,
					type: PaginationSwaggerDTO,
				})
			case EOption.titleFilter:
				return ApiQuery({
					name: 'titleFilter',
					required: false,
					type: TitleFilterSwaggerDTO,
				})
		}
	})

	return applyDecorators(...decorators)
}