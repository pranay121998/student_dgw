import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  uniqueId;

  uniqueName;

  audios;

  audioForm: FormGroup;

  downloadUrl = null;

  audioName;

  audioID;

  audio;

  @ViewChild('file') file: ElementRef;

  @ViewChild('progress') progress: ElementRef;

  constructor(private route: ActivatedRoute, public api: ApiService, private fb: FormBuilder) {
    this.audioForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.uniqueId = this.route.snapshot.paramMap.get('id');
    this.uniqueName = this.route.snapshot.paramMap.get('name');
    this.api.getAudio(this.uniqueId).pipe().subscribe(res => {
      console.log(res);
      this.audios = res;
    });
  }


  onFileChanged = async (event) => {
    this.api.onFileChanged(event);
    await this.api.apiData$.subscribe(url => this.downloadUrl = url);
    console.log(this.downloadUrl);
  }

  clearAudio() {
    this.audioName = "";
    this.audioID = "";
    this.audio = "";
  }

  clearAudioProgress() {
    this.file.nativeElement.value = "";
    this.api.uploadProgress = new Observable<0>();
    this.progress.nativeElement.style.width = "0%";
    this.downloadUrl = null;
  }

  updateAudio() {
    this.api.updateAudio(this.uniqueId, this.audioID, this.audioForm.value, this.downloadUrl, this.audio).then(() => {
      this.clearAudioProgress();
    });
  }


  get subcollection() {
    return this.api.getAudio(this.uniqueId);
  }

  deleteAudio(audioId) {
    if (window.confirm('Are sure you want to delete this audio ?')) {
      this.api.deleteAudio(this.uniqueId, audioId);
    }

  }

  passAudioName(name, id, audio) {
    this.audioName = name;
    this.audioID = id;
    this.audio = audio;
  }

}
