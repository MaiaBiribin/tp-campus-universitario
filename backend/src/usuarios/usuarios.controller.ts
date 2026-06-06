import { Controller, Get, Post, Patch, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

//Guards para proteger roles
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('usuarios')
export class UsuariosController {

    // Lista todos los usuarios - solo Admin
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(['Admin'])
    @Get()
    getUsuarios() {
    return { mensaje: 'Lista de usuarios - solo Admin puede ver esto' };
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(['Profesor'])
    @Get('mis-eventos')
    getMisEventos() {
    return { mensaje: 'Solo Profesor puede ver esto' };
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(['Admin', 'Profesor'])
    @Get('aulas')
    getAulas() {
    return { mensaje: 'Admin y Profesor pueden ver esto' };
    }

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
