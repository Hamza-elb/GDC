import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  public host:string="http://localhost:8080";

  constructor(private http : HttpClient) { }

  public getVilles(){
    return this.http.get(this.host+"/villes");
  }

  getCinemas(ville: any) {
    return  this.http.get(ville._links.cinemas.href);
  }

  getSalles(cinema: any) {
    return this.http.get(cinema._links.salles.href);
  }

  getProjections(salle: any) {
    let url = salle._links.projections.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1");
  }

  getPlaces(p: any) {
    let url = p._links.tickets.href.replace("{?projection}","");
    return this.http.get(url+"?projection=ticketProj");
  }

  payerTickets(form: any) {
    return this.http.post(this.host+"/payerTickets",form);
  }
}
