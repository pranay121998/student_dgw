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

    @ViewChild('progress1') progress1: ElementRef;

    @ViewChild('progress2') progress2: ElementRef;

    @ViewChild('progress3') progress3: ElementRef;

    enabled = false;

    downloadUrl;

    downloadUrl2;

    downloadUrl3;

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
            video: ['', Validators.required]
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

    uploadCourse() {
        this.api.addCourse(this.courseForm.value, this.downloadUrl, this.downloadUrl2).then(() => {
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

    clearChapter() {
        this.chapterForm.reset();
        this.file3.nativeElement.value = "";
        this.api.uploadProgress3 = new Observable<0>();
        this.progress3.nativeElement.style.width = "0%";
        this.downloadUrl3 = null;
    }
}
