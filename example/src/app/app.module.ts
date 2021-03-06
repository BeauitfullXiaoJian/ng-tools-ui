import { NgModule } from '@angular/core';
import { CoreModule } from './cores/cores.module';
import { AppRoutingModule } from './app.routing';
import {
    CssloadModule,
    DropdownModule,
    ConfirmModule,
    MenuModule,
    ToastModule,
} from 'ng-tools-ui';
import { SortablejsModule } from 'angular-sortablejs';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CoreModule.forRoot(),
        ConfirmModule.forRoot({ okTitle: '确认', cancelTitle: '取消' }),
        ToastModule.forRoot({ position: 'ts-bottom ts-right', timeout: 4000, maxLength: 4 }),
        MenuModule.forRoot(),
        CssloadModule,
        DropdownModule,
        SortablejsModule.forRoot({ animation: 150 }),
        DashboardModule,
        AppRoutingModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
