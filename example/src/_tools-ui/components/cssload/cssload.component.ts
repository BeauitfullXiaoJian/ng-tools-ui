import { Component, OnInit, Input } from '@angular/core';
import { DomAttr } from '../../commons/extends/attr.class';


@Component({
    selector: `ts-cssload`,
    exportAs: 'tsCssload',
    template: `
    <div class="loading">
        <div class="loading-center">
            <div class="loading-center-absolute">
                <div class="{{borderClass}} object object_four"></div>
                <div class="{{borderClass}} object object_three"></div>
                <div class="{{borderClass}} object object_two"></div>
                <div class="{{borderClass}} object object_one"></div>
            </div>
        </div>
    </div>`,
    styles: [
        `
        .loading {
            height: 100%;
            width: 100%;
        }
        .loading-center {
            width: 100%;
            height: 100%;
            position: relative;
        }
        .loading-center-absolute {
            position: absolute;
            left: 50%;
            top: 50%;
            height: 200px;
            width: 200px;
            margin-top: -100px;
            margin-left: -100px;
        }
        .object {
            -moz-border-radius: 50% 50% 50% 50%;
            -webkit-border-radius: 50% 50% 50% 50%;
            border-radius: 50% 50% 50% 50%;
            position: absolute;
            border-left: 5px solid white;
            border-right: 5px solid white;
            border-top: 5px solid transparent !important;
            border-bottom: 5px solid transparent !important;
            -webkit-animation: animate 2s infinite;
            animation: animate 2s infinite;
        }
        .object_one {
            left: 75px;
            top: 75px;
            width: 50px;
            height: 50px;
        }
        .object_two {
            left: 65px;
            top: 65px;
            width: 70px;
            height: 70px;
            -webkit-animation-delay: 0.1s;
            animation-delay: 0.1s;
        }
        .object_three {
            left: 55px;
            top: 55px;
            width: 90px;
            height: 90px;
            -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s;
        }
        .object_four {
            left: 45px;
            top: 45px;
            width: 110px;
            height: 110px;
            -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s;
        }
        @-webkit-keyframes animate {
            50% {
                -ms-transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg);
            }
            100% {
                -ms-transform: rotate(0deg);
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
        }
        @keyframes animate {
            50% {
                -ms-transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg);
            }
            100% {
                -ms-transform: rotate(0deg);
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
        }
       `
    ]
})
export class CssloadComponent extends DomAttr {

    constructor() {
        super();
    }
}
