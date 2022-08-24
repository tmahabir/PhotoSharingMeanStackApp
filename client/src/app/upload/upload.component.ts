import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ImageService } from '../image.service';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})

export class UploadComponent implements OnInit{
  form: FormGroup;
  imageData: string;


  constructor(private imageService: ImageService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),

    })
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      }

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.imageService.addImage(this.form.value.name, this.form.value.image, this.auth.getUserDetails().name); //this is all good here
    this.form.reset();
    this.imageData = null;
  }
}
