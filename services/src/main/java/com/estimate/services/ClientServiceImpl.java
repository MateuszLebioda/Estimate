package com.estimate.services;

import com.estimate.dao.services.dao.ClientDao;
import com.estimate.model.entities.Client;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.ClientDTO;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Stateless(name = "clientService")
public class ClientServiceImpl implements ClientService{

    @EJB
    private ClientDao clientDao;

    @EJB
    private DTOConverter dtoConverter;

    @Override
    public Boolean mergeClient(ClientDTO clientDTO, User user) {
        Client client = clientDao.getClientById(clientDTO.getId()).get();
        if (isMyClient(user, client)) {
            client = dtoConverter.makeClient(clientDTO);
            merge(client);
            return Boolean.TRUE;
        }else {
            return Boolean.FALSE;
        }
    }

    @Override
    public Long addClient(Client client) {
        return clientDao.save(client).getId();
    }

    @Override
    public List<Client> getAllClients(User user) {
        return clientDao.getClientsByUser(user);
    }

    @Override
    public List<ClientDTO> getAllDTOClients(User user) {
        return getAllClients(user).stream().map(Client::toDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<Client> getOptionalClientById(Long id) {
        return clientDao.getClientById(id);
    }

    @Override
    public Client getClientById(Long id) {
        return clientDao.getClientById(id).get();
    }

    @Override
    public boolean deleteClient(Client client) {
        Optional<Client> optionalClient = clientDao.getClientById(client.getId());
        if(optionalClient.isPresent()){
            clientDao.delete(client);
            return true;
        }return false;
    }

    @Override
    public boolean isMyClient(User user, Client client) {
        return client.getUser().getId().equals(user.getId());
    }

    @Override
    public boolean isMyClient(User user, Long clientId) {
        Optional<Client> optionalClient = clientDao.getClientById(clientId);
        return optionalClient.filter(client -> isMyClient(user, client)).isPresent();
    }

    @Override
    public void merge(Client client) {
        clientDao.merge(client);
    }

}
