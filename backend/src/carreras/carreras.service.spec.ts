import { Test, TestingModule } from '@nestjs/testing';
import { CarrerasService } from './carreras.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Carrera } from './carrera.entity';

const mockCarrerasRepository = {
  find:   jest.fn(),
  create: jest.fn(),
  save:   jest.fn(),
};

describe('CarrerasService', () => {
  let service: CarrerasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrerasService,
        {
          provide: getRepositoryToken(Carrera),
          useValue: mockCarrerasRepository,
        },

      ],
    }).compile();

    service = module.get<CarrerasService>(CarrerasService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {

    it('debe retornar un array con carreras', async () => {
    // 1. Preparamos los datos que devolverá el mock
    const carrerasEsperadas = [
      { id_carrera: 1, nombre: 'Ingeniería en Sistemas' },
      { id_carrera: 2, nombre: 'Contador Público' },
    ];
    mockCarrerasRepository.find.mockResolvedValue(carrerasEsperadas);

    // 2. Llamamos a la función real del service
    const resultado = await service.findAll();

    // 3. Verificamos el resultado
    expect(resultado).toEqual(carrerasEsperadas);
    expect(mockCarrerasRepository.find).toHaveBeenCalledTimes(1);
  });

  it('debe retornar un array vacío si no hay carreras', async () => {
    // 1. El mock devuelve array vacío
    mockCarrerasRepository.find.mockResolvedValue([]);

    // 2. Llamamos al service
    const resultado = await service.findAll();

    // 3. Verificamos
    expect(resultado).toEqual([]);
    expect(mockCarrerasRepository.find).toHaveBeenCalledTimes(1);
  });
  })

  describe ('create', () =>{

    it('debe crear un registro con una carrera nueva', async() =>{

      //Preparamos el resultado: 

      const registroEsperadoSave = {id_carrera: 1, nombre:"Ingeniería"};

      mockCarrerasRepository.save.mockResolvedValue(registroEsperadoSave);

      const resultadoSave = await service.create("Ingeniería");
      
      expect(resultadoSave).toEqual(registroEsperadoSave);
      expect(mockCarrerasRepository.create).toHaveBeenCalledWith({nombre: "Ingeniería"});

      expect(mockCarrerasRepository.create).toHaveBeenCalledTimes(1);
      expect(mockCarrerasRepository.save).toHaveBeenCalledTimes(1);

    });

    it('debe lanzar error si falla la base de datos', async() => {

    mockCarrerasRepository.save.mockRejectedValue(new Error("Error de conexión a la base de datos"));

    await expect(service.create("Ingeniería")).rejects.toThrow("Error de conexión a la base de datos");


    })


});


});
