package com.ensao.gdc.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "ticketProj", types = {com.ensao.gdc.entities.Ticket.class})
public interface ITicketsProjection {
    public Long getId();
    public String getNomClient();
    public double getPrix();
    public Integer getCodePayement();
    public boolean getReserve();
    public Place getPlace();
}
