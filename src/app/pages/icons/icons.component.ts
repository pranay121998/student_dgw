import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'icons-cmp',
    moduleId: module.id,
    templateUrl: 'icons.component.html'
})

export class IconsComponent {

    getCourses;

    public imagePath;
    imgURL: any;
    public message: string;

    @ViewChild('file1') file1: ElementRef;

    @ViewChild('file2') file2: ElementRef;

    @ViewChild('file3') file3: ElementRef;

    @ViewChild('file4') file4: ElementRef;

    @ViewChild('file5') file5: ElementRef;

    @ViewChild('progress1') progress1: ElementRef;

    @ViewChild('progress2') progress2: ElementRef;

    @ViewChild('progress3') progress3: ElementRef;

    @ViewChild('progress4') progress4: ElementRef;

    @ViewChild('progress5') progress5: ElementRef;

    enabled = false;

    downloadUrl;

    downloadUrl2;

    downloadUrl3;

    downloadUrl4;

    downloadUrl5;

    files: any;

    courseForm: FormGroup;

    chapterForm: FormGroup;

    constructor(
        public api: ApiService,
        private fb: FormBuilder,
    ) {
        this.courseForm = this.fb.group({
            name: ['', Validators.required,],
            description: ['', Validators.required],
            price: ['', Validators.required],
            imageUrl: ['', Validators.required],
            video: ['', Validators.required],
        });

        this.chapterForm = this.fb.group({
            name: ['', Validators.required],
            video: ['', Validators.required],
            audio: ['', Validators.required],
            pdf: ['', Validators.required]
        })
    }

    ngOnInit(): void {
    }

    reset() {
        this.enabled = false;
        this.file1.nativeElement.value = "";
        this.imgURL = "";
    }

    preview(files) {
        this.enabled = true;
        this.files = files;
        if (files.length === 0)
            return;

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }

        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        }
    }

    onFileChanged = async (event) => {
        this.api.onFileChanged(event);
        await this.api.apiData$.subscribe(url => this.downloadUrl = url);
        console.log(this.downloadUrl);
    }

    onFileChanged2 = async (event) => {
        this.api.onFileChanged2(event);
        await this.api.apiData2$.subscribe(url => this.downloadUrl2 = url);
        console.log(this.downloadUrl2);
    }

    onFileChanged3 = async (event) => {
        this.api.onFileChanged3(event);
        await this.api.apiData3$.subscribe(url => this.downloadUrl3 = url);
        console.log(this.downloadUrl3);
    }

    onFileChanged4 = async (event) => {
        this.api.onFileChanged4(event);
        await this.api.apiData4$.subscribe(url => this.downloadUrl4 = url);
        console.log(this.downloadUrl4);
    }

    onFileChanged5 = async (event) => {
        this.api.onFileChanged5(event);
        await this.api.apiData5$.subscribe(url => this.downloadUrl5 = url);
        console.log(this.downloadUrl5);
    }

    uploadCourse() {
        this.api.addCourse(this.courseForm.value, this.downloadUrl, this.downloadUrl2, this.downloadUrl4).then(() => {
            this.courseForm.reset();
            this.file1.nativeElement.value = "";
            this.file2.nativeElement.value = "";
            this.api.uploadProgress = new Observable<0>();
            this.api.uploadProgress2 = new Observable<0>();
            this.progress1.nativeElement.style.width = "0%";
            this.progress2.nativeElement.style.width = "0%";
            this.downloadUrl = null;
            this.downloadUrl2 = null;
        });
    }

    courseId;

    passCourseId(id) {
        this.courseId = id;
    }

    addChapter(id) {
        this.api.addChapter(id, this.chapterForm.value, this.downloadUrl3).then(() => {
            this.clearChapter();
        });
    }

    addAudio(id) {
        this.api.addAudio(id, this.chapterForm.value, this.downloadUrl4).then(() => {
            this.clearAudio();
        });
    }

    addPDF(id) {
        this.api.addPDF(id, this.chapterForm.value, this.downloadUrl5).then(() => {
            this.clearPDF();
        });
    }

    clearChapter() {
        this.chapterForm.reset();
        this.file3.nativeElement.value = "";
        this.api.uploadProgress3 = new Observable<0>();
        this.progress3.nativeElement.style.width = "0%";
        this.downloadUrl3 = null;
    }

    clearAudio() {
        this.chapterForm.reset();
        this.file4.nativeElement.value = "";
        this.api.uploadProgress4 = new Observable<0>();
        this.progress4.nativeElement.style.width = "0%";
        this.downloadUrl4 = null;
    }

    clearPDF() {
        this.chapterForm.reset();
        this.file5.nativeElement.value = "";
        this.api.uploadProgress5 = new Observable<0>();
        this.progress5.nativeElement.style.width = "0%";
        this.downloadUrl5 = null;
    }
}
