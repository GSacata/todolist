import { NgModule } from "@angular/core";
import { NgIf, NgFor } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms"; // imports ngModel, to bem used on todolist.component.ts

@NgModule({
    declarations: [],
    imports: [
        NgIf, NgFor, HttpClientModule, FormsModule
    ],
    exports: [
        NgIf, NgFor, HttpClientModule, FormsModule
    ],
    providers: [],
    bootstrap: []
})

export class AppModule {}