import { Component, ViewChild, ComponentFactoryResolver, Injector, ComponentRef } from '@angular/core';
import { WindowDirective } from './window.directive';

@Component({
    selector: 'ts-window',
    template: `
    <div [class.d-none]="!show" class="animated zoomIn position-fixed h-100 w-100" [ngStyle]="windowStyle">
        <ng-template tsWindowHost></ng-template>
    </div>
    `,
    styles: [`
    .animated {
        animation-duration: 0.5s;
        animation-fill-mode: both;
    }
    .animated.infinite {
        animation-iteration-count: infinite;
    }
    @keyframes zoomIn {
        from {
          opacity: 0;
          transform: scale3d(0.3, 0.3, 0.3);
        }
        50% {
          opacity: 1;
        }
      }
    .zoomIn {
        animation-name: zoomIn;
    }
    `]
})
export class WindowComponent {

    windowStyle: any;

    show = false;

    @ViewChild(WindowDirective) modalHost: WindowDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        this.windowStyle = {
            top: 0,
            left: 0,
            zIndex: 1060,
        };
    }

    loadComponent(content: any, index: number, injector: Injector): ComponentRef<any> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        this.modalHost.viewContainerRef.clear();
        this.windowStyle.zIndex += index;
        return this.modalHost.viewContainerRef.createComponent(componentFactory, undefined, injector);
    }

    present() { this.show = true; }
    close() { this.show = false; }
}
