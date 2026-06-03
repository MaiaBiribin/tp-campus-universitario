import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; //Repository es la clase de TypeORM que tiene todos los métodos para hablar con la DB
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {

    constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>, //guardamos la tabla Usuarios en la variable
    ) {}

    // Busca un usuario por mail (lo usa el login)
    async findByMail(mail: string): Promise<Usuario | null> { //devuelve un Usuario si lo encuentra o null si no existe
    return this.usuariosRepository.findOne({ where: { mail } });

    }

    async create(mail: string, dni: string, contrasena: string): Promise<Usuario> {
      const usuario = this.usuariosRepository.create({
        mail,
        dni,
        contrasena,
        nombre: '',
        apellido: '',
        habilitado: false,
        rol: { id_rol: 3 }, // 3 = Alumno
      });
      return this.usuariosRepository.save(usuario);
}

}
