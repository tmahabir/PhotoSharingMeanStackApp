import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from '../image.service';
import { Image } from '../models/Image';

@Component({
  selector: 'show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})

export class ShowComponent implements OnInit, OnDestroy{
  images: Image[] = [];
  private imageSubscription: Subscription;
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImages();
    this.imageSubscription = this.imageService.getImagesStream().subscribe((images: Image[]) => {
      this.images = images;
    });
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe();
  }

  onDelete(filePath: string){
    this.imageService.deleteImage(filePath);
  }
}
