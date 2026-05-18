import { Controller, Get, Post, Patch, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/')
export class UsuariosController {

    @ApiTags('Usuarios')
    @Get('/usuarios/:id')
    @ApiOperation({summary: 'Devuelve los datos de un usuario'})
    getEventos(){
        return ''
    }

    @ApiTags('Usuarios')
    @Post('/usuarios')
    @ApiOperation({summary: 'Crea un nuevo usuario'})
    postEventos(){
        return ''
    }

    @ApiTags('Usuarios')
    @Patch('/usuarios/:id')
    @ApiOperation({ summary: 'Modifica parcialmente un usuario' })
    patchUsuarios() {
        return ''
    }

    @ApiTags('Usuarios')
    @Put('/usuarios/:id')
    @ApiOperation({ summary: 'Reemplaza completamente un usuario' })
    putUsuarios() {
        return ''
}

    @ApiTags('Usuarios')
    @Delete('/usuarios/:id')
    @ApiOperation({ summary: 'Elimina un usuario' })
    deleteUsuarios() {
        return ''
    }
}
