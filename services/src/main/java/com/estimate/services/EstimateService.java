package com.estimate.services;

import com.estimate.model.entities.dto.EstimateDTO;

import javax.ejb.Local;
import java.util.List;

@Local
public interface EstimateService {
    Long saveEstimate(EstimateDTO estimateDTO);
    List<EstimateDTO> getAllEstimates();
}
