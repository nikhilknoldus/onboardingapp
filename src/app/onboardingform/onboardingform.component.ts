import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

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

  student: any;

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
      // documents: ["", Validators.required],
      dob: Date,
      fathersName: ["", Validators.required],
      mothersName: ["", Validators.required],
      lastClassScore: ["", Validators.required]
    });

    this._route.paramMap.subscribe(paraMap => {
      const id = +paraMap.get("id");
      this.getStudentById(id);
    });
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
}
