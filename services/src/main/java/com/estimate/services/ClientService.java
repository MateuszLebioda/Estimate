package com.estimate.services;

import com.estimate.model.entities.Client;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.ClientDTO;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface ClientService {
    Long addClient(Client client);
    List<Client> getAllClients(User user);
    List<ClientDTO> getAllDTOClients(User user);
    Optional<Client> getOptionalClientById(Long id);
    Client getClientById(Long id);
    boolean deleteClient(Client client);
    boolean isMyClient(User user, Client client);
    boolean isMyClient(User user, Long clientId);
    void merge(Client client);
}
