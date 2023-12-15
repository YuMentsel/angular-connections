import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { GroupsComponent } from './components/groups/groups.component';
import { PeopleComponent } from './components/people/people.component';
import { CreateGroupFormComponent } from './components/create-group-form/create-group-form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [
    MainComponent,
    GroupsComponent,
    PeopleComponent,
    CreateGroupFormComponent,
    ConfirmationComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
