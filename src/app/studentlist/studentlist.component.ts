import { Component, OnInit } from "@angular/core";
import { UserService, StudentService } from "../_services";
import Swal from "sweetalert2";
import { Student } from "../_models/students";
import { first } from "rxjs/operators";

@Component({
  selector: "app-studentlist",
  templateUrl: "./studentlist.component.html",
  styleUrls: ["./studentlist.component.css"]
})
export class StudentlistComponent implements OnInit {
  currentUser: Student;
  students: any = [];
  studentCount = 1;
  studentDetails: any;
  searchText: string;
  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.loadAllStudents();
  }

  private loadAllStudents() {
    this.studentService
      .getAll()
      .pipe(first())
      .subscribe(studentsList => {
        this.students = studentsList;
        this.studentCount = this.students.length;
      });
  }

  UpdateDetails(id: number){
    alert(JSON.stringify(id))
  }

  viewDetails(studentDetails:any){
    this.studentDetails = studentDetails;
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
}
