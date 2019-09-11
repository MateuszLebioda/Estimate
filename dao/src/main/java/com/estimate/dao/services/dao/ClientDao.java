package com.estimate.dao.services.dao;
import com.estimate.model.entities.Client;
import com.estimate.model.entities.User;

import java.util.Set;

public interface ClientDao extends AbstractDaoFunction <Client>{

    Set<Client> getClientsByUser(User user);
}
