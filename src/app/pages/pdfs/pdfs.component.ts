import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrls: ['./pdfs.component.css']
})
export class PdfsComponent implements OnInit {

  uniqueId;
  uniqueName;
  pdfs;
  pdfID;
  pdf;

  pdfForm: FormGroup;

  downloadUrl = null;

  pdfName;

  @ViewChild('file') file: ElementRef;

  @ViewChild('progress') progress: ElementRef;

  constructor(private route: ActivatedRoute, public api: ApiService, private fb: FormBuilder) {
    this.pdfForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.uniqueId = this.route.snapshot.paramMap.get('id');
    this.uniqueName = this.route.snapshot.paramMap.get('name');
    this.api.getPDF(this.uniqueId).pipe().subscribe(res => {
      console.log(res);
      this.pdfs = res;
    });
  }

  onFileChanged = async (event) => {
    this.api.onFileChanged(event);
    await this.api.apiData$.subscribe(url => this.downloadUrl = url);
    console.log(this.downloadUrl);
  }

  clearPDFName() {
    this.pdfName = "";
    this.pdfID = "";
    this.pdf = "";
  }

  clearPDFProgress() {
    this.file.nativeElement.value = "";
    this.api.uploadProgress = new Observable<0>();
    this.progress.nativeElement.style.width = "0%";
    this.downloadUrl = null;
  }

  updatePDF() {


    this.api.updatePDF(this.uniqueId, this.pdfID, this.pdfForm.value, this.downloadUrl, this.pdf).then(() => {
      this.clearPDFProgress();
    });
  }

  get subcollection() {
    return this.api.getPDF(this.uniqueId);
  }


  deletePDF(pdfId:any) {
    if (window.confirm('Are sure you want to delete this pdf ?')) {
      this.api.deletePDF(this.uniqueId, pdfId);
    }
  }

  passPDFName(name, id, pdf) {
    this.pdfName = name;
    this.pdfID = id;
    this.pdf = pdf;
  }

}
