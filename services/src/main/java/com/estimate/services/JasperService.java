package com.estimate.services;


import javax.ejb.Local;

@Local
public interface JasperService {
   byte[] generateMaterialPriceList(Long userId);
   byte[] generateServicesPriceList(Long userId);
   byte[] generateEstimateReport(Long userId, Long estimateId);
}
