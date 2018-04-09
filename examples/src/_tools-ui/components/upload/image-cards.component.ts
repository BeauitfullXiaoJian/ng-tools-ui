import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { UploadConfig } from './upload.interface';
import { InputImages } from './input-images.class';
import { DomAttr } from '../../commons/extends/attr.class';
import { styleStr } from './upload.data';

@Component({
    selector: 'ts-image-cards',
    template: `
    <div class="w-100">
        <input #input_file class="d-none" type="file" multiple="multiple"
         accept="image/*" (change)="changeFile($event.target.files);input_file.value=null">
        <div *ngFor="let item of images.list;index as i"  class="d-inline-block border border-muted p-1 mr-1 mb-1 align-top"
            [ngStyle]="blockStyle">
            <div *ngIf="!item.uploading" class="w-100 h-100 upload-block" [ngStyle]="{'background-image': getUrl(item)}">
                <div class="upload-block-window text-white text-center h-100 w-100" [ngStyle]="windowStyle">
                    <!--<i class="fa fa-fw fa-lg fa-eye pointer"></i>-->
                    <i (click)="removeImage(i)" class="fa fa-fw fa-lg fa-trash pointer"></i>
                </div>
            </div>
            <div *ngIf="item.uploading" class="span w-100 h-100">
                <div class="typing_loader"></div>
            </div>
        </div><div class="d-inline-block border border-muted p-1 mb-1 align-top" [ngStyle]="blockStyle">
            <div (click)="input_file.click()" class="w-100 h-100 upload-block">
                <div class="text-muted text-center h-100 w-100 pointer" [ngStyle]="windowStyle">
                    <i class="fa fa-fw fa-lg fa-picture-o"></i>选择图片
                </div>
            </div>
        </div>
    </div>
    `,
    styles: [styleStr]
})
export class ImageCardsComponent extends DomAttr implements OnChanges {

    @Input() src: string;
    @Input() title: string;
    @Input() config: UploadConfig;
    @Input() width: number;

    @Output() srcChange = new EventEmitter<string>(false);
    @Output() fileChange = new EventEmitter<File[]>(false);
    @Output() deleteChange = new EventEmitter<any>(false);

    images = new InputImages();
    uploading = false;
    default: string;

    get sizePx(): string {
        return this.width + 'px';
    }

    get blockStyle(): any {
        return { height: this.sizePx, width: this.sizePx };
    }

    get windowStyle(): any {
        return { lineHeight: (this.width - 7) + 'px' };
    }

    constructor(
        private domSanitizer: DomSanitizer
    ) {
        super();
        this.src = '';
        this.config = { host: '' };
        this.default = '';
        this.width = 100;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.uploading) {
            this.images = new InputImages(this.src);
            if (changes.src && !this.default) { this.default = changes.src.currentValue; }
        }
    }

    changeFile(files: File[]) {
        for (let i = 0; i < files.length; i++) {
            const url = window.URL.createObjectURL(files[i]);
            this.images.push({ type: 'file', file: files[i], url, uploading: !!this.config.uploader });
            this.fileChange.emit(files);
        }
        if (this.config.uploader) { this.uploadImage(); }
    }

    getUrl(image: { type: string, file: File, url: string, uploading: boolean }): string {
        if (image.type === 'file') {
            return `url(${image.url})`;
        } else {
            return `url(${image.url ? this.config.host + image.url : ''}`;
        }
    }

    removeImage(index: number) {
        this.deleteChange.emit(this.images.list[index]);
        this.images.remove(index);
        this.srcChange.emit(this.images.urls.join());
    }

    uploadImage() {
        const fileItems = this.images.fileItems;
        let cx = 0;
        this.uploading = true;
        for (let i = 0; i < fileItems.length; i++) {
            this.config.uploader(fileItems[i].file).subscribe(res => {
                fileItems[i].type = 'url';
                fileItems[i].uploading = false;
                fileItems[i].file = null;
                fileItems[i].url = res;
                this.srcChange.emit(this.images.urls.join());
                if (++cx === fileItems.length) { this.uploading = false; }
            });
        }
    }

    resetInput(input: HTMLInputElement) {
        this.src = this.default;
        this.images = new InputImages(this.src);
        input.value = '';
        this.uploading = false;
        this.srcChange.emit(this.images.urls.join());
    }
}
