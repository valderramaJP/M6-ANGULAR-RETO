import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  totalImages = 4;
  intervalId: any; 

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  goToPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
  }

  goToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.totalImages;
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.goToNext();
    }, 3000);
  }

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
