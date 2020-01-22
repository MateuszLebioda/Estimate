package com.estimate.services;

import com.estimate.dao.services.EstimateDao;
import com.estimate.model.entities.Estimate;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.EstimateDTO;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Stateless(name = "estimateService")
public class EstimateServiceImpl implements EstimateService {

    @Inject
    private Optional<User> user;

    @EJB
    private DTOConverter dtoConverter;

    @EJB
    private EstimateDao estimateDao;

    @Override
    @Transactional
    public Long saveEstimate(EstimateDTO estimateDTO) {
        return estimateDao.save(dtoConverter.makeEstimate(estimateDTO)).getId();
    }

    @Override
    public List<EstimateDTO> getAllEstimates() {
        return estimateDao.getEstimatesByUser(user.get()).stream().map(Estimate::toDTO).collect(Collectors.toList());
    }
}
