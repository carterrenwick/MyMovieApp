import { Component, OnInit, ElementRef, OnDestroy, Input } from '@angular/core';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() title: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
      this.element = el.nativeElement;
  }

  ngOnInit(): void {
      const modal = this;

      // ensure id attribute exists
      if (!this.id) {
          return;
      }

      // close modal on background click
      this.element.addEventListener('click', (e: any) => {
          if (e.target.className === 'my-modal fadeIn' && e.target.parentElement.id !== 'idle-modal') {
              modal.close();
          }
      });

      // add self (this modal instance) to the modal service so it's accessible from controllers
      this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
      this.modalService.remove(this.id);
  }

  // open modal
  open(): void {
      this.element.style.display = 'block';
      document.body.classList.add('my-modal-open');
  }

  // close modal
  close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('my-modal-open');
  }
}
