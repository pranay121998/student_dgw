import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {

  uniqueId;
  uniqueName;

  chapters;

  chapterForm: FormGroup;

  chapterName;
  chapterID;

  downloadUrl3 = null;

  video;

  watchers;

  @ViewChild('file3') file3: ElementRef;

  @ViewChild('progress3') progress3: ElementRef;

  constructor(private route: ActivatedRoute, public api: ApiService, private fb: FormBuilder) {
    this.chapterForm = this.fb.group({
      name: ['', Validators.required],
      video: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.uniqueId = this.route.snapshot.paramMap.get('id');
    this.uniqueName = this.route.snapshot.paramMap.get('name');
    this.api.getSubCollection(this.uniqueId).pipe().subscribe(res => {
      //console.log(res);
      this.chapters = res;
    });
  }

  get subcollection() {
    return this.api.getSubCollection(this.uniqueId);
  }

  deleteChapter(chapterId) {
    if (window.confirm('Are sure you want to delete this chapter ?')) {
      this.api.deleteChapter(this.uniqueId, chapterId);
    }

  }

  getSingleChapter(id) {
    this.api.getSingleChapter(this.uniqueId, id).pipe(take(1)).subscribe(res => {
      console.log(res['watched']);
      this.watchers = res['watched'];
    })
  }

  passChapterName(name, id, video) {
    this.chapterName = name;
    this.chapterID = id;
    this.video = video;
  }

  clearChapterName() {
    this.chapterName = "";
    this.chapterID = "";
    this.video = "";
  }

  onFileChanged3 = async (event) => {
    this.api.onFileChanged3(event);
    await this.api.apiData3$.subscribe(url => this.downloadUrl3 = url);
    console.log(this.downloadUrl3);
  }

  updateChapter() {
    this.api.updateChapter(this.uniqueId, this.chapterID, this.chapterForm.value, this.downloadUrl3, this.video).then(() => {
      this.clearChapter();
    });
  }

  clearChapter() {
    this.file3.nativeElement.value = "";
    this.api.uploadProgress3 = new Observable<0>();
    this.progress3.nativeElement.style.width = "0%";
    this.downloadUrl3 = null;
  }

}
