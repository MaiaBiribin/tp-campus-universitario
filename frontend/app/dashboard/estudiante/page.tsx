"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EstudianteHome(){
    const router = useRouter();

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    }, []);

    
    return(
   <div>
    <main>
      
        <div>
          
          <header>
             <p>
               bienvenido 
             </p>
          </header>

           
        </div>
        
       
            
       
     </main>
    </div>
    )
}