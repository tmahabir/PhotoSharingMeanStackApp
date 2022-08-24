import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthenticationService, UserDetails } from "../authentication.service";
import { ImageService } from "../image.service";
import { Image } from '../models/Image';

@Component({
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  images: Image[] = [];
  private imageSubscription: Subscription;
  constructor(private auth: AuthenticationService, private imageService: ImageService) {}

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    );

    this.imageService.getImages();
    this.imageSubscription = this.imageService.getImagesStream().subscribe((images: Image[]) => {
      this.images = images;
    });
  }

  onDelete(filePath: string){
    this.imageService.deleteImage(filePath);
  }
}
