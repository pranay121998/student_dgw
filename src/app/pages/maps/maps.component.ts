import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html'
})

export class MapsComponent implements OnInit {

    isChecked = false;

    courseForm: FormGroup;

    courseID;

    courseName;
    courseDesc;
    courseImg;
    coursePrice;
    courseVideo;

    @ViewChild('file1') file1: ElementRef;

    @ViewChild('file2') file2: ElementRef;

    @ViewChild('progress1') progress1: ElementRef;

    @ViewChild('progress2') progress2: ElementRef;

    constructor(public api: ApiService, private fb: FormBuilder) {
        this.courseForm = this.fb.group({
            name: ['', Validators.required,],
            description: ['', Validators.required],
            price: ['', Validators.required],
            imageUrl: ['', Validators.required],
            video: ['', Validators.required],
        });
    }

    downloadUrl
    downloadUrl2;

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

    ngOnInit() {

    }

    loadId(id, name, desc, image, price, video, isChecked) {
        this.courseID = id;
        this.courseName = name;
        this.courseDesc = desc;
        this.courseImg = image;
        this.coursePrice = price;
        this.courseVideo = video;
        this.isChecked = isChecked;
        console.log("Image Video: " + this.courseImg)
        console.log("Course Video: " + this.courseVideo)
    }

    clearCourse() {
        this.courseID = "";
        this.courseName = "";
        this.courseDesc = "";
        this.courseImg = "";
        this.coursePrice = "";
        this.courseVideo = "";
    }

    clearForm() {
        this.courseForm.reset();

    }

    getStats(event: Event) {
        console.log(event.target["checked"]);
        this.isChecked = event.target["checked"];
    }

    updateCourse() {
        this.api.updateCourse(this.courseID, this.courseForm.value, this.courseImg, this.downloadUrl, this.courseVideo, this.downloadUrl2, this.isChecked).then(() => {
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

}
