import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    uniqueId;
    userDetails;
    items;
    courses;
    constructor(private route: ActivatedRoute, private api: ApiService) { }
    ngOnInit() {
        this.uniqueId = this.route.snapshot.paramMap.get('id');
        this.api.getSingleUser(this.uniqueId).pipe(take(1)).subscribe(userRes => {
            // console.log(res);
            this.userDetails = userRes;
        });
        this.api.getCourse().pipe(take(1)).subscribe(res => {
            this.courses = res;
        })

    }
}
