import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { map } from 'rxjs/operators';
import { Audio, Chapter, Course, PDF } from 'app/model/course';
import { Users } from 'app/model/users';
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

  //Chapter Audio Upload
  task4: AngularFireUploadTask;
  basePath4 = '/course_audios';
  downloadableURL4 = '';
  uploadProgress4: Observable<number>;

  //Chapter PDF Upload
  task5: AngularFireUploadTask;
  basePath5 = '/course_pdf';
  downloadableURL5 = '';
  uploadProgress5: Observable<number>;

  itemCollection: AngularFirestoreCollection<Course>;
  items: Observable<Course[]>;

  chapterCollection: AngularFirestoreCollection<Chapter>;
  chapters: Observable<Chapter[]>;

  userCollection: AngularFirestoreCollection<Users>;
  users: Observable<Users[]>;

  audioCollection: AngularFirestoreCollection<Audio>;
  audios: Observable<Audio[]>;

  pdfCollection: AngularFirestoreCollection<PDF>;
  pdfs: Observable<PDF[]>

  nameofCourse = "dev-course";
  nameofusers = "users"

  singleUser;

  constructor(private afs: AngularFirestore, public afStorage: AngularFireStorage) {
    this.itemCollection = this.afs.collection<Course>(this.nameofCourse);
    this.items = this.itemCollection.valueChanges();

    this.userCollection = this.afs.collection<Users>(this.nameofusers);
    this.users = this.userCollection.valueChanges();
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

  private apiData4 = new BehaviorSubject<any>(null);
  public apiData4$ = this.apiData4.asObservable();

  async onFileChanged4(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath4}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task4 = this.afStorage.upload(filePath, file);    // upload task
      // this.progress = this.snapTask.percentageChanges();
      this.uploadProgress4 = this.task4.snapshotChanges().pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
      // observe upload progress
      this.uploadProgress4 = this.task4.percentageChanges();
      (await this.task4).ref.getDownloadURL().then(url => {
        this.downloadableURL4 = url;
        console.log(this.downloadableURL4)
        this.apiData4.next(this.downloadableURL4);
      });  // <<< url is found here
    } else {
      alert('No docs selected');
      this.downloadableURL4 = '';
    }
  }

  private apiData5 = new BehaviorSubject<any>(null);
  public apiData5$ = this.apiData5.asObservable();

  async onFileChanged5(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath5}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task5 = this.afStorage.upload(filePath, file);    // upload task
      // this.progress = this.snapTask.percentageChanges();
      this.uploadProgress5 = this.task5.snapshotChanges().pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
      // observe upload progress
      this.uploadProgress5 = this.task5.percentageChanges();
      (await this.task5).ref.getDownloadURL().then(url => {
        this.downloadableURL5 = url;
        console.log(this.downloadableURL5)
        this.apiData5.next(this.downloadableURL5);
      });  // <<< url is found here
    } else {
      alert('No docs selected');
      this.downloadableURL5 = '';
    }
  }

  addCourse(course: Course, imageUrl, videoUrl, audioUrl) {
    return this.afs.collection(this.nameofCourse).add({
      name: course.name,
      description: course.description,
      price: course.price,
      imageUrl: imageUrl,
      video: videoUrl,
      audio: audioUrl,
      buyers: [],
    }).then(res => {
      console.log("Course Added");
      this.afs.collection(this.nameofCourse).doc(res.id).update({
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
    return this.afs.collection(this.nameofCourse).doc(id).collection('chapters').add({
      name: chapter.name,
      video: video,
      watched: [],
    }).then(res => {
      console.log("Chapter Added");
      this.afs.collection(this.nameofCourse).doc(id).collection('chapters').doc(res.id).update({
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

  addAudio(id, audio: Audio, audioUrl) {
    return this.afs.collection(this.nameofCourse).doc(id).collection('audios').add({
      name: audio.name,
      audio: audioUrl
    }).then(res => {
      console.log("Audio Added");
      this.afs.collection(this.nameofCourse).doc(id).collection('audios').doc(res.id).update({
        audioId: res.id
      }).then(() => {
        console.log("AudioId Added");
      })
    }).catch(err => {
      alert("Error: " + err.code + " " + err.message);
      console.log("Error Code: " + err.code);
      console.log("Error MEssage: " + err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        documentID: id,
        errorAt: "Add Audio"
      })
    })
  }

  addPDF(id, pdf: PDF, pdfUrl) {
    return this.afs.collection(this.nameofCourse).doc(id).collection('pdfs').add({
      name: pdf.name,
      pdf: pdfUrl
    }).then(res => {
      console.log("pdf Added");
      this.afs.collection(this.nameofCourse).doc(id).collection('pdfs').doc(res.id).update({
        pdfId: res.id
      }).then(() => {
        console.log("pdfId Added");
      })
    }).catch(err => {
      alert("Error: " + err.code + " " + err.message);
      console.log("Error Code: " + err.code);
      console.log("Error MEssage: " + err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        documentID: id,
        errorAt: "Add PDF"
      })
    })
  }

  getSubCollection(id) {
    this.chapterCollection = this.afs.collection<Course>(this.nameofCourse).doc(id).collection<Chapter>("chapters");
    return this.chapterCollection.valueChanges();
  }

  getAudio(id) {
    this.audioCollection = this.afs.collection<Course>(this.nameofCourse).doc(id).collection<Audio>("audios");
    return this.audioCollection.valueChanges();
  }

  getPDF(id) {
    this.pdfCollection = this.afs.collection<Course>(this.nameofCourse).doc(id).collection<PDF>("pdfs");
    return this.pdfCollection.valueChanges();
  }

  getSingleUser(id) {
    return this.singleUser = this.userCollection.doc(id).valueChanges();
  }

  getSingleChapter(courseId, chapterId) {
    this.chapterCollection = this.afs.collection<Course>(this.nameofCourse).doc(courseId).collection<Chapter>("chapters");
    return this.chapterCollection.doc(chapterId).valueChanges();
  }

  // getCourseByuser(userId) {
  //   this.chapterCollection = this.afs.collection<Course>(this.nameofCourse, ref => ref.where('buyers[]', '==', userId));
  // }

  getCourse() {
    this.itemCollection = this.afs.collection<Course>(this.nameofCourse, ref => ref.orderBy('buyers'));
    return this.itemCollection.valueChanges();
  }

  updateCourse(courseId, course: Course, image1, image2, video1, video2) {
    this.itemCollection = this.afs.collection<Course>(this.nameofCourse);
    if (!image2) {
      course.imageUrl = image1;
    } else {
      course.imageUrl = image2;
    }
    if (!video2) {
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
    this.chapterCollection = this.afs.collection<Course>(this.nameofCourse).doc(courseId).collection<Chapter>("chapters");
    if (!video) {
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
    if (window.confirm('Are sure you want to delete this Course ?')) {
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
      });
    }
  }

  deleteChapter(courseId, chapterId) {
    this.chapterCollection = this.afs.collection<Course>(this.nameofCourse).doc(courseId).collection<Chapter>("chapters");
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

  deleteAudio(courseId, audioId) {
    this.audioCollection = this.afs.collection<Course>(this.nameofCourse).doc(courseId).collection<Audio>("audios");
    return this.audioCollection.doc(audioId).delete().then(() => {
      console.log("Operation Successful");
    }).catch(err => {
      console.log(err.code);
      console.log(err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        courseId: audioId,
        chapterId: audioId,
        errorAt: "Audio Delete",
      })
    });
  }

  deletePDF(courseId, pdfId) {
    this.pdfCollection = this.afs.collection<Course>(this.nameofCourse).doc(courseId).collection<PDF>("pdfs");
    return this.pdfCollection.doc(pdfId).delete().then(() => {
      console.log("PDF Delete Operation Successful");
    }).catch(err => {
      console.log(err.code);
      console.log(err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        courseId: courseId,
        chapterId: pdfId,
        errorAt: "PDF Delete",
      })
    });
  }

  updateAudio(courseId, chapterId, audio: Audio, video, video2) {
    this.audioCollection = this.afs.collection<Course>(this.nameofCourse).doc(courseId).collection<Audio>("audios");
    if (!video) {
      audio.audio = video2;
    } else {
      audio.audio = video;
    }
    return this.audioCollection.doc(chapterId).update({
      name: audio.name,
      audio: audio.audio,
    }).then(() => {
      console.log("Audio Update Successfull");
    }).catch(err => {
      console.log(err.code);
      console.log(err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        courseId: courseId,
        audioId: chapterId,
        errorAt: "Audio Update",
      })
    });
  }

  updatePDF(courseId, pdfId, pdf: PDF, file, file2) {
    this.pdfCollection = this.afs.collection<Course>(this.nameofCourse).doc(courseId).collection<PDF>("pdfs");
    if (!file) {
      pdf.pdf = file2;
    } else {
      pdf.pdf = file;
    }
    return this.pdfCollection.doc(pdfId).update({
      name: pdf.name,
      pdf: pdf.pdf,
    }).then(() => {
      console.log("PDF Update Successfull");
    }).catch(err => {
      console.log(err.code);
      console.log(err.message);
      this.afs.collection("errorLog").add({
        errorCode: err.code,
        errorMessage: err.message,
        courseId: courseId,
        pdfId: pdfId,
        errorAt: "PDF Update",
      })
    });
  }

}
