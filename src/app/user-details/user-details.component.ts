import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/_model/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id!:number;
  user:User= new User();
  constructor(private route:ActivatedRoute,private userService:UserService) {
    this.id=route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data=>{
      this.user=data;
    });
  }

  ngOnInit(): void {
  }

}
