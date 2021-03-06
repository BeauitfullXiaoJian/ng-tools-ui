import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleGroup } from '../../interfaces/role.interface';

@Component({
    selector: 'app-role-ul',
    template: `
    <ul tsCollapses class="p-0">
        <li [class.has-child]="roleGroup.roleChildren.length>0"
            class="d-table w-100 list-none p-2 border border-muted mb-2">
            <div class="d-table-row">
                <div tsToggle class="d-table-cell pointer">
                    <button *ngIf="roleGroup.roleChildren.length>0" class="btn btn-sm btn-success mr-2">
                        <i class="fa fa-fw fa-angle-right" [class.fa-rotate-90]="tsCollapse.open"></i>
                    </button>
                    <button *ngIf="roleGroup.roleChildren.length===0" class="btn btn-sm btn-outline-white mr-2" disabled>
                        <i class="fa fa-fw fa-angle-right"></i>
                    </button>
                    {{roleGroup.role.roleName}}
                </div>
                <div class="d-table-cell text-right">
                    <a (click)="sendInsertEvent(roleGroup)" class="btn-icon btn-icon-success" title="添加">
                        <i class="fa fa-lg fa-fw fa-plus align-middle"></i>
                    </a>
                    <a (click)="sendUpdateEvent(roleGroup)" class="btn-icon btn-icon-info" title="编辑">
                        <i class="fa fa-lg fa-fw fa-edit align-middle"></i>
                    </a>
                    <a (click)="sendDeleteEvent(roleGroup)" class="btn-icon btn-icon-danger" title="删除">
                        <i class="fa fa-lg fa-fw fa-trash-o align-middle"></i>
                    </a>
                </div>
            </div>
        </li>
        <div #tsCollapse="tsCollapse" tsCollapse [open]="true" class="pl-2">
            <app-role-ul
                *ngFor="let role of roleGroup.roleChildren"
                (insertEvent)="sendInsertEvent($event)"
                (updateEvent)="sendUpdateEvent($event)"
                (deleteEvent)="sendDeleteEvent($event)"
                [roleGroup]="role"></app-role-ul>
        </div>
    </ul>
    `,
    styleUrls: ['./role-manager.component.scss']
})
export class RoleUlComponent {

    @Input() roleGroup: RoleGroup;

    @Output() insertEvent = new EventEmitter<RoleGroup>(false);

    @Output() updateEvent = new EventEmitter<RoleGroup>(false);

    @Output() deleteEvent = new EventEmitter<RoleGroup>(false);

    constructor() { }

    sendInsertEvent(roleGroup: RoleGroup) {
        this.insertEvent.emit(roleGroup);
    }

    sendUpdateEvent(roleGroup: RoleGroup) {
        this.updateEvent.emit(roleGroup);
    }

    sendDeleteEvent(roleGroup: RoleGroup) {
        this.deleteEvent.emit(roleGroup);
    }
}
