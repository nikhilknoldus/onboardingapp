import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { User } from "../_models";
import { UserService, StudentService } from "../_services";
import Swal from "sweetalert2";
import { Student } from "../_models/students";

@Component({
  templateUrl: "home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  students: Student[] = [];
  
  constructor(private userService: UserService, private studentService: StudentService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.loadAllUsers();
    this.loadAllStudents();
  }

  deleteUser(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "info",
      imageWidth: 200,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        this.userService
          .delete(id)
          .pipe(first())
          .subscribe(() => {
            this.loadAllUsers();
          });
      }
    });
  }

  deleteStudent(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "info",
      imageWidth: 200,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        this.studentService
          .delete(id)
          .pipe(first())
          .subscribe(() => {
            this.loadAllStudents();
          });
      }
    });
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }

  private loadAllStudents() {
    this.studentService
      .getAll()
      .pipe(first())
      .subscribe(students => {
        this.students = students;
      });
  }
}
