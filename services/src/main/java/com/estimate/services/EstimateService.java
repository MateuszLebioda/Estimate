package com.estimate.services;

import com.estimate.model.entities.dto.EstimateDTO;

import javax.ejb.Local;
import java.util.List;

@Local
public interface EstimateService {
    EstimateDTO saveEstimate(EstimateDTO estimateDTO);
    List<EstimateDTO> getAllEstimates();
    Boolean deleteEstimate(Long id);
    EstimateDTO update(EstimateDTO estimateDTO);
}