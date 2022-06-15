import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Admin } from "app/model/admin";
import { Observable, of } from "rxjs";
import { map, switchMap, take, tap } from "rxjs/operators";

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  //https://firebase.google.com/docs/auth/web/password-auth

  user$: Observable<any>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<Admin>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async SignIn(email, password) {
    // this.afAuth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
        // Signed in
        // var user = userCredential.user;
        // console.log(user.uid);
        this.router.navigate(["/add"]);
      // })
      // .catch((error) => {
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   alert("Wrong Credentials");
      //   console.log(errorCode);
      //   console.log(errorMessage);
      // });
  }

  async signOut() {
    this.afAuth
      .signOut()
      .then(() => {
        console.log("Signed Out");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
}
