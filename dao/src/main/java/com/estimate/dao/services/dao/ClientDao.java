package com.estimate.dao.services.dao;
import com.estimate.model.entities.Client;
import com.estimate.model.entities.User;

import java.util.List;

public interface ClientDao extends AbstractDaoFunction <Client>{

    List<Client> getClientsByUser(User user);
}
