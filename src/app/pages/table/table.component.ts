import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
    constructor(public api: ApiService) { }
    ngOnInit() {

    }
}
