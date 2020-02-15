package com.estimate.services;

import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.EstimateDTO;

import javax.ejb.Local;
import java.util.List;

@Local
public interface EstimateService {
    EstimateDTO saveEstimate(EstimateDTO estimateDTO);
    List<EstimateDTO> getAllEstimates();
    EstimateDTO getEstimatesByUserAndEstimateId(User user, Long estimateId);
    Boolean deleteEstimate(Long id);
    EstimateDTO update(EstimateDTO estimateDTO);
    List<EstimateDTO> getAllEstimateByClientId(Long id);
}
