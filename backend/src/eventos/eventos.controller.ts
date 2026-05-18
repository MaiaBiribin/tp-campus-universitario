import { Controller, Get, Post, Put, Patch, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/')
export class EventosController {

    @ApiTags('Eventos')
    @Get('/eventos/:id')
    @ApiOperation({summary: 'Devuelve el evento, ya sea de tipo clase, parcial, o informativo'})
    getEventos(){
        return ''
    }

    @ApiTags('Eventos')
    @Post('/eventos')
    @ApiOperation({summary: 'Crea un nuevo evento, ya sea de tipo clase, parcial, o informativo'})
    postEventos(){
        return ''
    }

    @ApiTags('Eventos')
    @Patch('/eventos/:id')
    @ApiOperation({ summary: 'Modifica parcialmente un evento, ya sea de tipo clase, parcial, o informativo' })
    patchEventos() {
        return ''
    }

    @ApiTags('Eventos')
    @Put('/eventos/:id')
    @ApiOperation({ summary: 'Reemplaza completamente un evento, ya sea de tipo clase, parcial, o informativo' })
    putEventos() {
        return ''
}

    @ApiTags('Eventos')
    @Delete('/eventos/:id')
    @ApiOperation({ summary: 'Elimina un evento, ya sea de tipo clase, parcial, o informativo' })
    deleteEventos() {
        return ''
    }
}
