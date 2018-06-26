/**
 * 实验室模块
 *
 * @author xiaojian
 * @file   laboratory.module.ts
 * @date   2018-6-26 21:12:51
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LaboratoryRoutingModule, declarationComponents, entryComponents, providers } from './laboratory.routing';
import { ButtonModule, BadgeModule, ImageModule, CssloadModule } from 'ng-tools-ui';

@NgModule({
    imports: [
        FormsModule,
        ButtonModule,
        BadgeModule,
        ImageModule,
        CssloadModule,
        LaboratoryRoutingModule,
    ],
    declarations: [declarationComponents],
    entryComponents: [entryComponents],
    providers: [providers]
})
export class LaboratoryModule { }