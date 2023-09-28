import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.mode';
import { collectionData } from 'rxfire/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  constructor(
    private router: Router
  ) {
  }

  getAllUsers(): Observable<User[]>{
    const usersRef = collection(this.db, 'users');
    return collectionData(usersRef)
    .pipe(map(data =>{
      console.log(data);
      return data.map((user, index) =>{
        return {
          ...user,
          index: index + 1
        }
      })
    })) as Observable<User[]>
  }

  addUser(user: User){
    const usersRef = collection(this.db, 'users');
    addDoc(usersRef, user)
    .then(() =>{
      console.log('documento guardado');
      this.router.navigate(['/users']);
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  getBirth(time: any): Date{
    const miliSegundos = time.seconds * 1000;
    return new Date(miliSegundos);
  }

  birthDto(date: Date){
    const milliseconds = date.getTime(); // Obtiene el tiempo en milisegundos desde la época (1 de enero de 1970)
    const seconds = Math.floor(milliseconds / 1000); // Convierte milisegundos a segundos
    const nanoseconds = (milliseconds % 1000) * 1000000; // Calcula nanosegundos (milisegundos * 1,000,000)

    return { seconds, nanoseconds };
  }
}
