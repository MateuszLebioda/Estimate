package com.estimate.dao.services.dao;
import com.estimate.model.entities.Client;
import com.estimate.model.entities.User;

import java.util.List;
import java.util.Optional;

public interface ClientDao extends AbstractDaoFunction <Client>{

    List<Client> getClientsByUser(User user);
    Optional<Client> getClientById(Long id);
}
