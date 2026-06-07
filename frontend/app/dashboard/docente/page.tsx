"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DocenteHome(){

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
              <header>
                
              </header>

            </main>
        </div>



    )
}