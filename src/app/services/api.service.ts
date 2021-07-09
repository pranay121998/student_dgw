import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { map } from 'rxjs/operators';
import { Chapter, Course } from 'app/model/course';
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
  task2: AngularFireUploadTask;
  basePath2 = '/intro_videos';
  downloadableURL2 = '';
  uploadProgress2: Observable<number>;

  //Chapter Video Upload
  task3: AngularFireUploadTask;
  basePath3 = '/chapter_videos';
  downloadableURL3 = '';
  uploadProgress3: Observable<number>;

  itemCollection: AngularFirestoreCollection<Course>;
  items: Observable<Course[]>

  chapterCollection: AngularFirestoreCollection<Chapter>
  chapters: Observable<Chapter[]>

  constructor(private afs: AngularFirestore, public afStorage: AngularFireStorage) {
    this.itemCollection = this.afs.collection<Course>("courses");
    this.items = this.itemCollection.valueChanges();
  }

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

  private apiData3 = new BehaviorSubject<any>(null);
  public apiData3$ = this.apiData3.asObservable();

  async onFileChanged3(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath3}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task3 = this.afStorage.upload(filePath, file);    // upload task
      // this.progress = this.snapTask.percentageChanges();
      this.uploadProgress3 = this.task3.snapshotChanges().pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
      // observe upload progress
      this.uploadProgress3 = this.task3.percentageChanges();
      (await this.task3).ref.getDownloadURL().then(url => {
        this.downloadableURL3 = url;
        console.log(this.downloadableURL3)
        this.apiData3.next(this.downloadableURL3);
      });  // <<< url is found here
    } else {
      alert('No docs selected');
      this.downloadableURL3 = '';
    }
  }

  addCourse(course: Course, imageUrl, videoUrl) {
    return this.afs.collection("courses").add({
      name: course.name,
      description: course.description,
      price: course.price,
      imageUrl: imageUrl,
      video: videoUrl
    }).then(res => {
      console.log("Course Added");
      this.afs.collection("courses").doc(res.id).update({
        courseId: res.id
      }).then(() => {
        console.log("courseId Added");
      })
    }).catch(err => {
      console.log("Error Code: " + err.code);
      console.log("Error MEssage: " + err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        errorAt: "Add Course",
      })
    })
  }

  addChapter(id, chapter: Chapter, video) {
    return this.afs.collection('courses').doc(id).collection('chapters').add({
      name: chapter.name,
      video: video
    }).then(res => {
      console.log("Chapter Added");
      this.afs.collection("courses").doc(id).collection('chapters').doc(res.id).update({
        chapterId: res.id
      }).then(() => {
        console.log("chapterId Added");
      })
    }).catch(err => {
      alert("Error: " + err.code + " " + err.message);
      console.log("Error Code: " + err.code);
      console.log("Error MEssage: " + err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        documentID: id,
        errorAt: "Add Chapter"
      })
    })
  }

  getSubCollection(id) {
    this.chapterCollection = this.afs.collection<Course>("courses").doc(id).collection<Chapter>("chapters");
    return this.chapterCollection.valueChanges();
  }

  updateCourse(courseId, course: Course, image1, image2, video1, video2) {
    this.itemCollection = this.afs.collection<Course>("courses");
    if (course.imageUrl === "") {
      course.imageUrl = image1;
    } else {
      course.imageUrl = image2;
    }
    if (course.video === "") {
      course.video = video1;
    } else {
      course.video = video2;
    }
    return this.itemCollection.doc(courseId).update({
      name: course.name,
      description: course.description,
      price: course.price,
      imageUrl: course.imageUrl,
      video: course.video,
    }).then(() => {
      console.log("Course Update Successfull");
    }).catch(err => {
      console.log(err.code);
      console.log(err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        courseId: courseId,
        errorAt: "Course Update",
      })
    });
  }

  updateChapter(courseId, chapterId, chapter: Chapter, video, video2) {
    this.chapterCollection = this.afs.collection<Course>("courses").doc(courseId).collection<Chapter>("chapters");
    if (chapter.video === "") {
      chapter.video = video2;
    } else {
      chapter.video = video;
    }
    return this.chapterCollection.doc(chapterId).update({
      name: chapter.name,
      video: chapter.video,
    }).then(() => {
      console.log("Chapter Update Successfull");
    }).catch(err => {
      console.log(err.code);
      console.log(err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        courseId: courseId,
        chapterId: chapterId,
        errorAt: "Chapter Update",
      })
    });
  }

  deleteCourse(id) {
    return this.itemCollection.doc(id).delete().then(() => {
      console.log("Delete Course Operation Successful");
    }).catch(err => {
      console.log(err.code);
      console.log(err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        courseId: id,
        errorAt: "Course Delete",
      })
    });;
  }

  deleteChapter(courseId, chapterId) {
    this.chapterCollection = this.afs.collection<Course>("courses").doc(courseId).collection<Chapter>("chapters");
    return this.chapterCollection.doc(chapterId).delete().then(() => {
      console.log("Operation Successful");
    }).catch(err => {
      console.log(err.code);
      console.log(err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        courseId: courseId,
        chapterId: chapterId,
        errorAt: "Chapter Delete",
      })
    });
  }

}
