import { Controller, Get, Post, Put, Patch, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('/')
export class AulasController {

    @ApiTags('Aulas')
    @Get('/aulas/:id')
    @ApiOperation({summary: 'Devuelve lo que contenga el aula'})
    getAulas(){

        return 'aqui se verán las aulas'
    }

    @ApiTags('Aulas')
    @Post('/aulas')
    @ApiOperation({summary: 'Crea una nueva aula'})
    createAulas(){
        return ''
    }

    @ApiTags('Aulas')
    @Patch('/aulas/:id')
    @ApiOperation({ summary: 'Modifica parcialmente los datos de un aula' })
    patchAulas() {
        return ''
    }

    @ApiTags('Aulas')
    @Put('/aulas/:id')
    @ApiOperation({ summary: 'Reemplaza completamente los datos de un aula' })
    putAulas() {
        return ''
    }

    @ApiTags('Aulas')
    @Delete('/aulas/:id')
    @ApiOperation({ summary: 'Elimina un aula' })
    deleteAulas() {
        return ''
    }
}
