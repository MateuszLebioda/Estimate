package com.estimate.dao.services;

import com.estimate.dao.services.dao.AbstractDaoFunction;
import com.estimate.model.entities.Estimate;
import com.estimate.model.entities.User;

import javax.ejb.Local;
import java.util.List;

@Local
public interface EstimateDao extends AbstractDaoFunction<Estimate> {
    List<Estimate> getEstimatesByUser(User user);
}
