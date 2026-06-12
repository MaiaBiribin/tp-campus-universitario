'use client'; // Necesario si usas el App Router porque requiere interactividad

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // O 'next/router' si usas Pages Router

export default function MapaPlantaBaja() {
  const router = useRouter();

 
  const handleNavigation = (e: React.MouseEvent<HTMLAreaElement>, ruta: string) => {
    e.preventDefault();
    router.push(ruta);
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1000px' }}>
      {}
      <Image
        src="/plantaBaja.png.jpg" 
        alt="Planta Baja"
        width={1000}
        height={600}
        priority 
        useMap="#mapa-planta-baja"
        style={{ width: '100%', height: 'auto' }}
      />

      <map name="mapa-planta-baja">
        
        <area shape="rect" coords="78,80,217,315" alt="Aula 101" onClick={(e) => handleNavigation(e, '/aulas/101')} href="/aulas/101" />
        <area shape="rect" coords="218,70,371,338" alt="Aula 102" onClick={(e) => handleNavigation(e, '/aulas/102')} href="/aulas/102" />
        <area shape="rect" coords="550,68,728,340" alt="Aula 103" onClick={(e) => handleNavigation(e, '/aulas/103')} href="/aulas/103" />
        <area shape="rect" coords="731,52,875,348" alt="Aula 104" onClick={(e) => handleNavigation(e, '/aulas/104')} href="/aulas/104" />

       
        <area shape="rect" coords="373,88,460,278" alt="Baños Hombres" onClick={(e) => handleNavigation(e, '/servicios/banos-hombres')} href="/servicios/banos-hombres" />
        <area shape="rect" coords="461,86,547,278" alt="Baños Mujeres" onClick={(e) => handleNavigation(e, '/servicios/banos-mujeres')} href="/servicios/banos-mujeres" />

        
        <area shape="rect" coords="876,114,967,348" alt="Escaleras" onClick={(e) => handleNavigation(e, '/planta-alta')} href="/planta-alta" />

      
        <area shape="rect" coords="41,316,169,503" alt="Patio" onClick={(e) => handleNavigation(e, '/patio')} href="/patio" />
        <area shape="rect" coords="39,505,206,757" alt="Aula 105" onClick={(e) => handleNavigation(e, '/aulas/105')} href="/aulas/105" />
        <area shape="rect" coords="254,435,355,753" alt="Recepción" onClick={(e) => handleNavigation(e, '/administracion/recepcion')} href="/administracion/recepcion" />
        <area shape="rect" coords="357,510,479,753" alt="Información" onClick={(e) => handleNavigation(e, '/administracion/info')} href="/administracion/info" />
        <area shape="rect" coords="481,513,631,765" alt="Aula 106" onClick={(e) => handleNavigation(e, '/aulas/106')} href="/aulas/106" />
        <area shape="rect" coords="631,424,809,765" alt="Aula 107" onClick={(e) => handleNavigation(e, '/aulas/107')} href="/aulas/107" />
        <area shape="rect" coords="812,467,969,765" alt="Aula 108" onClick={(e) => handleNavigation(e, '/aulas/108')} href="/aulas/108" />
      </map>
    </div>
  );
}