import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Thumbnail Image Upload
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  basePath = '/thumbnails';
  downloadableURL = '';
  uploadProgress: Observable<number>;

  //Course Intro Video Upload
  ref2: AngularFireStorageReference;
  task2: AngularFireUploadTask;
  basePath2 = '/videos';
  downloadableURL2 = '';
  uploadProgress2: Observable<number>;

  constructor(private afs: AngularFirestore, public afStorage: AngularFireStorage) { }

  // don't use "any", type your data instead!
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();

  async onFileChanged(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task = this.afStorage.upload(filePath, file);    // upload task
      // this.progress = this.snapTask.percentageChanges();
      this.uploadProgress = this.task.snapshotChanges().pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
      // observe upload progress
      this.uploadProgress = this.task.percentageChanges();
      (await this.task).ref.getDownloadURL().then(url => {
        this.downloadableURL = url;
        console.log(this.downloadableURL)
        this.apiData.next(this.downloadableURL);
      });  // <<< url is found here
    } else {
      alert('No docs selected');
      this.downloadableURL = '';

    }
  }

  private apiData2 = new BehaviorSubject<any>(null);
  public apiData2$ = this.apiData2.asObservable();

  async onFileChanged2(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath2}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task2 = this.afStorage.upload(filePath, file);    // upload task
      // this.progress = this.snapTask.percentageChanges();
      this.uploadProgress2 = this.task2.snapshotChanges().pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
      // observe upload progress
      this.uploadProgress2 = this.task2.percentageChanges();
      (await this.task2).ref.getDownloadURL().then(url => {
        this.downloadableURL2 = url;
        console.log(this.downloadableURL2)
        this.apiData2.next(this.downloadableURL2);
      });  // <<< url is found here
    } else {
      alert('No docs selected');
      this.downloadableURL2 = '';
    }
  }



}
