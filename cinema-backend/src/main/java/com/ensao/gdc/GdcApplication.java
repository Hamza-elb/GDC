package com.ensao.gdc;

import com.ensao.gdc.entities.Film;
import com.ensao.gdc.entities.Salle;
import com.ensao.gdc.entities.Ticket;
import com.ensao.gdc.services.ICinemaInitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class GdcApplication implements CommandLineRunner {
    @Autowired
    private ICinemaInitService cinemaInitService;
    @Autowired
    private RepositoryRestConfiguration restConfiguration;
    public static void main(String[] args) {
        SpringApplication.run(GdcApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        restConfiguration.exposeIdsFor(Film.class, Salle.class, Ticket.class);
        cinemaInitService.initVilles();
        cinemaInitService.initCinemas();
        cinemaInitService.initSalles();
        cinemaInitService.initPlaces();
        cinemaInitService.initSeances();
        cinemaInitService.initCategories();
        cinemaInitService.initFilms();
        cinemaInitService.initProjections();
        cinemaInitService.initTickets();
    }
}
