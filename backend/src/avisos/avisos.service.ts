import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aviso } from './aviso.entity';
import { Inscripcion } from '../inscripciones/inscripcion.entity';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { Evento } from '../eventos/evento.entity';


@Injectable()
export class AvisosService {

  constructor(
    @InjectRepository(Aviso)
    private avisosRepository: Repository<Aviso>,

    @InjectRepository(Inscripcion)
    private inscripcionRepository: Repository<Inscripcion>,

    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,

    private notificacionesService: NotificacionesService,
  ) {}

  async create(mensaje: string, idUsuarioCreador: number, idEvento: number): Promise<Aviso> {

    // 1. Crea el aviso
    const aviso = this.avisosRepository.create({
      mensaje,
      usuarioCreador: { id_usuario: idUsuarioCreador },
      evento: { id_evento: idEvento },
    });

    const avisoGuardado = await this.avisosRepository.save(aviso);

    // 2. Busca el evento para obtener la materia
    const evento = await this.eventoRepository.findOne({
        where: { id_evento: idEvento },
    });

    if (!evento) {
        throw new BadRequestException('El evento no existe');
    }

    //Busca los ususarios inscriptos a la materia 
    const inscriptos = await this.inscripcionRepository.find({
        where: { materia: { id_materia: evento.materia.id_materia } },
        relations: { usuario: true },
        select: { usuario: { id_usuario: true } },
    });

    // 3. Crea una notificación por cada inscripto
    if (inscriptos.length > 0) {
      await this.notificacionesService.crearNotificaciones(
        idEvento,
        `Nuevo aviso: ${mensaje}`,
        inscriptos.map(i => ({ id_usuario: i.usuario.id_usuario })),
      );
    }

    return avisoGuardado;
  }

  async findByEvento(idEvento: number): Promise<Aviso[]> {
    return this.avisosRepository.find({
      where: { evento: { id_evento: idEvento } },
      order: { fecha_creacion: 'DESC' },
    });
  }
    async findAll(): Promise<Aviso[]> {
    return this.avisosRepository.find({
      relations:{
        evento:true,
        usuarioCreador:true,
      },
      order:{
        fecha_creacion:"DESC"
      }

    });
  }
  async remove(
  idAviso:number,
  idUsuario:number
){

  const aviso =
    await this.avisosRepository.findOne({
      where:{
        id_aviso:idAviso
      },
      relations:{
        usuarioCreador:true
      }
    });

  if(!aviso){
    throw new BadRequestException("El aviso no existe");
  }

  if(
    aviso.usuarioCreador.id_usuario !== idUsuario
  ){
    throw new BadRequestException("No podés eliminar un aviso que no creaste");
  }

  await this.avisosRepository.delete(idAviso);
  return {
    message:"Aviso eliminado correctamente"
  };
}
}



