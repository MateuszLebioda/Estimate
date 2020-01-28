package com.estimate.dao.services.dao;

import com.estimate.dao.services.dao.AbstractDaoFunction;
import com.estimate.model.entities.Client;
import com.estimate.model.entities.Estimate;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.EstimateDTO;

import javax.ejb.Local;
import java.util.List;

@Local
public interface EstimateDao extends AbstractDaoFunction<Estimate> {
    List<Estimate> getEstimatesByUser(User user);
    Estimate getEstimatesByUId(Long id);
    List<Estimate> getEstimateByClientId(Client client, User user);
}
