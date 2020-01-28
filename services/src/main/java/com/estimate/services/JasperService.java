package com.estimate.services;

import com.estimate.model.entities.dto.EstimateDTO;

public interface JasperService {
   void generateEstimateReports(EstimateDTO estimateDTO);
   void generatePriceList(Long userId);
}
