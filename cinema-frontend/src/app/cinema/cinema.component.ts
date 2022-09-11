import {Component, OnInit} from '@angular/core';
import {CinemaService} from "../services/cinema.service";


@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes!: any;
  public cinemas!: any;
  public salles!: any;
  public currentVille!: null;
  public currentCinema: any;
  public currentProjection: any;
  public selectedTicket: any;

  constructor(public cinemaService: CinemaService) {
  }

  ngOnInit(): void {
    this.cinemaService.getVilles().subscribe(data => {
      this.villes = data;
    }, err => {
      console.log(err);
    })
  }

  onGetCinemas(ville: any) {
    this.currentVille = ville;
    this.salles = undefined;
    this.cinemaService.getCinemas(ville).subscribe(data => {
      this.cinemas = data;
    }, err => {
      console.log(err);
    })
  }

  onGetSalles(cinema: any) {
    this.currentCinema = cinema;
    this.cinemaService.getSalles(cinema).subscribe(data => {
      this.salles = data;
      this.salles._embedded.salles.forEach((salle: any) => {
        this.cinemaService.getProjections(salle).subscribe(data => {
          salle.projections = data;
        }, err => {
          console.log(err);
        })
      })
      }, err => {
        console.log(err);
      })

    }


  onGetPlaces(p: any) {
    this.currentProjection=p;
    this.cinemaService.getPlaces(p).subscribe(data => {
      this.currentProjection.tickets = data;
      this.selectedTicket = [];
    }, err => {
      console.log(err);
    })
  }

  onSelectTicket(ticket: any) {
    if (!ticket.selected) {
      ticket.selected = true;
      this.selectedTicket.push(ticket);
    }else{
      ticket.selected = false;
      this.selectedTicket.splice(this.selectedTicket.indexOf(ticket),1);
    }


  }

  getTicketClass(ticket: any) {
      let str = "btn ticket ";
    if (ticket.reserve == true) {
      str += "btn-danger";
    } else if (ticket.selected) {
      str += "btn-warning";
    } else {
      str += "btn-success";
    }
    return str;
  }

  onPayTickets(form: any) {
    let tickets: any[] = [];
    this.selectedTicket.forEach((ticket: any) => {
      tickets.push(ticket.id);
    })
    form.tickets = tickets;
    console.log(form);
    this.cinemaService.payerTickets(form).subscribe(data => {
      alert("Tickets réservés avec succès!");
      this.onGetPlaces(this.currentProjection);
    }, err => {
      console.log(err);
    })
  }
}
