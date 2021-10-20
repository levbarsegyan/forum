import { Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { InfoComponent } from './info/info.component';
const appRoutes: Routes = [
  {
    path: 'home',
    component: NewsComponent,
  },
  {
    path: 'info',
    component: InfoComponent,
  },
];
export default appRoutes;
