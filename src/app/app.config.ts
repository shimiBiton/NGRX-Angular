import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideHttpClient} from "@angular/common/http";
import {provideState, provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {UsersEffects} from "./store/users/users.effects";
import {usersFeature} from "./store/users/users.reducer";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {ordersFeature} from "./store/orders/orders.reducer";
import {OrdersEffects} from "./store/orders/orders.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideState(usersFeature),
    provideState(ordersFeature),
    provideEffects([UsersEffects, OrdersEffects]),
    provideStoreDevtools({ logOnly: !isDevMode(), maxAge: 25 }),
  ]
};
