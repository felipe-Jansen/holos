import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ClientService } from "../client-page/client.service";

@Injectable()
export class ClientDetailResolver implements Resolve<any> {
  constructor(private clientService: ClientService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const clientId = route.paramMap.get("id");

    return this.clientService.findById(Number(clientId));
  }
}
