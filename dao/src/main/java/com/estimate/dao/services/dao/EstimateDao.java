package com.estimate.dao.services.dao;

import com.estimate.model.entities.Client;
import com.estimate.model.entities.Estimate;
import com.estimate.model.entities.User;

import javax.ejb.Local;
import java.util.List;

@Local
public interface EstimateDao extends AbstractDaoFunction<Estimate> {
    List<Estimate> getEstimatesByUser(User user);
    Estimate getEstimatesById(Long id);
    List<Estimate> getEstimateByClientId(Client client, User user);
}
