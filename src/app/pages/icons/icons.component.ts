import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'icons-cmp',
    moduleId: module.id,
    templateUrl: 'icons.component.html'
})

export class IconsComponent {
    public imagePath;
    imgURL: any;
    public message: string;
    @ViewChild('file') file: ElementRef;

    enabled = false;

    downloadUrl;

    downloadUrl2;

    files: any;

    courseForm: FormGroup;

    constructor(
        public api: ApiService,
        private fb: FormBuilder,
    ) {
        this.courseForm = this.fb.group({
            name: ['', Validators.required,],
            description: ['', Validators.required],
            price: ['', Validators.required],
            imageUrl: this.downloadUrl,
            video: this.downloadUrl2,
        });
    }



    reset() {
        this.enabled = false;
        this.file.nativeElement.value = "";
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

    uploadCourse() {

    }
}
