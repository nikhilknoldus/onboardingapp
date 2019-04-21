import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import Swal from "sweetalert2";

import { AlertService, StudentService } from "../_services";
import { Student } from "../_models/students";

@Component({
  selector: "app-onboardingform",
  templateUrl: "./onboardingform.component.html",
  styleUrls: ["./onboardingform.component.css"]
})
export class OnboardingformComponent implements OnInit {
  onboardingForm: FormGroup;
  loading = false;
  submitted = false;
  studentId:number;
  student: any;
  optedCategory = false;
  studentDetails:any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private alertService: AlertService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onboardingForm = this.formBuilder.group({
      studentName: ["", Validators.required],
      category: ["", Validators.required],
      dob: ["", Validators.required],
      fathersName: ["", Validators.required],
      mothersName: ["", Validators.required],
      lastClassScore: ["", Validators.required]
    });

    this._route.paramMap.subscribe(paraMap => {
      const id = +paraMap.get("id");
      this.getStudentById(id);
      this.studentId = id;
    });
  }

  selectedCategory(){
    if(this.onboardingForm.value.category == "International")
    {
      this.optedCategory = true;
    }else{
      this.optedCategory = false;
    }
  }
  getStudentById(id) {
    if (id == 0) {
      this.student= {
        id: null,
        studentName: null,
        category: null,
        dob: null,
        fathersName: null,
        mothersName: null,
        lastClassScore: null
      }
    }
    else{
      this.studentService.getById(id).subscribe(details => {
        this.student = details;
        this.studentDetails = this.student;
        this.onboardingForm.patchValue(this.student)
      })
     }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.onboardingForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.onboardingForm.invalid) {
      return;
    }
    this.loading = true;
    this.studentService
      .register(this.onboardingForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Successfully Onboarded", true);
          this.router.navigate(["/student-list"]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  updateStudent(id:number){
    this.mapFormValuesToStudentModel();
    if(this.onboardingForm.invalid){
      return;
    }
    this.loading= true;
    this.studentService.update(this.studentDetails)
    .pipe(first())
    .subscribe(
      data => {
        Swal.fire('Updated Successfully')
        this.router.navigate(['/student-list'])
      },
      error => {
        Swal.fire('Some issues, Please re-try')
      }
    )
  }
  mapFormValuesToStudentModel (){
    this.studentDetails.studentName = this.onboardingForm.value.studentName;
    this.studentDetails.category = this.onboardingForm.value.category;
    this.studentDetails.fathersName = this.onboardingForm.value.fathersName;
    this.studentDetails.mothersName = this.onboardingForm.value.mothersName;
    this.studentDetails.dob = this.onboardingForm.value.dob;
    this.studentDetails.lastClassScore = this.onboardingForm.value.lastClassScore;
    
  }
}
