import { Component, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ModalDirective } from './modal.directive';

@Component({
    selector: 'ts-modal',
    template: `
    <div #pad class="modal fade" (click)="tryClose($event)" [ngClass]="{'show': show}"
        [ngStyle]="{display: show?'block':'none',overflow: overflow}">
        <div class="modal-dialog modal-{{size}} d-block" [ngStyle]="{height: overflow==='hidden'?'90%':'auto',overflow:'auto'}" [class.modal-dialog-centered]="center">
            <div class="modal-content">
                <ng-template tsModalHost></ng-template>
            </div>
        </div>
    </div>
    <div *ngIf="show" class="modal-backdrop fade show"></div>`,
})
export class ModalComponent {

    @ViewChild('pad') pad: any;

    @ViewChild(ModalDirective) modalHost: ModalDirective;

    show: boolean;

    size: string;

    center: boolean;

    overflow: string;

    closeHandle: () => void;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        this.show = false;
        this.center = false;
        this.size = '';
    }

    loadComponent(content: any): ComponentRef<any> {

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(content);

        const viewContainerRef = this.modalHost.viewContainerRef;

        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);

        return componentRef;

    }

    open() {
        this.show = true;
    }

    close() {
        this.show = false;
    }

    tryClose(event: any) {
        if (event.target === this.pad.nativeElement) {
            this.close();
            this.closeHandle();
        }
    }

}
