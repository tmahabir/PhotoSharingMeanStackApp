import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from 'rxjs/operators';

import { Image } from './models/Image';
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  private images: Image[] = [];
  private images$ = new Subject<Image[]>();
  readonly url = "http://localhost:4200/api/images";

  constructor(private http: HttpClient ) { }

  getImages() {
    this.http.get<{ images: Image[] }>(this.url).pipe(
      map((imageData) => {
        return imageData.images;
      })
    ).subscribe((images) => {
      this.images = images;
      this.images$.next(this.images);
    });
  }

  getImagesStream() {
    return this.images$.asObservable();
  }

  addImage(name: string, image: File): void {
    const imageData = new FormData();
    imageData.append("name", name);
    imageData.append("image", image, name); //could remove name as third parameter so that the filepath is not based on name input
    this.http.post<{image: Image}>(this.url, imageData)
      .subscribe((imageData) => {
        const image: Image = {
          _id: imageData.image._id,
          name: name,
          filePath: imageData.image.filePath
        };
        this.images.push(image);
        this.images$.next(this.images);
      });
  }

  deleteImage(filePath: string) {
    this.http.delete(filePath)
    .subscribe(()=>{
      const updatedPosts = this.images.filter(image=>image.filePath!==filePath);
        this.images=updatedPosts;
        this.images$.next([...this.images]);
    });
  }

}
