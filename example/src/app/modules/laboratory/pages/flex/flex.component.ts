/**
 * 请编写页面文件说明
 *
 * @author 填写作者
 * @file   flex.component.ts
 * @date   2018-6-27 12:23:22
 */
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './flex.component.html',
    styleUrls: ['./flex.component.scss']
})
export class FlexComponent implements OnInit {

    justifyContent = 'start';

    flexWarp = 'nowrap';

    items = new Array<{ align: string, src: string }>();

    constructor() {
        this.items.push(...[
            { align: 'start', src: 'assets/images/avatar/0.jpg' }
        ]);
    }

    ngOnInit() {

    }

    addItem(align: string) {
        this.items.push({ align, src: `assets/images/avatar/${this.items.length % 7}.jpg` });
    }

    removeItem() {
        return this.items.length > 0 && this.items.pop();
    }

    showImage($event) {
        console.log($event);
    }
}
