import { Component, OnInit } from "@angular/core";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { File } from "@ionic-native/file/ngx";
import { decode } from "punycode";

@Component({
  selector: "app-gallery-page",
  templateUrl: "./gallery-page.component.html",
  styleUrls: ["./gallery-page.component.scss"],
})
export class GalleryPageComponent implements OnInit {
  constructor(private photoViewer: PhotoViewer, private file: File) {}

  ngOnInit() {}

  showImage(url: string) {
    console.log(url);
    
    this.photoViewer.show(decodeURIComponent(this.file.applicationDirectory + url), "Holos", {
      closeButton: true,
      copyToReference: true,
      share: true
    });
  }
}
