package com.estimate.services;

import com.estimate.dao.services.dao.AbstractMaterialEstimateDao;
import com.estimate.dao.services.dao.ClientDao;
import com.estimate.dao.services.dao.EstimateDao;
import com.estimate.dao.services.dao.JobTemplateEstimateDao;
import com.estimate.model.entities.*;
import com.estimate.model.entities.dto.EstimateDTO;
import com.estimate.model.entities.dto.UnitDTO;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Comparator;
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

    @EJB
    private AbstractMaterialEstimateDao abstractMaterialEstimateDao;

    @EJB
    private JobTemplateEstimateDao jobTemplateEstimateDao;

    @EJB
    private ClientDao clientDao;

    @Override
    @Transactional
    public EstimateDTO saveEstimate(EstimateDTO estimateDTO) {
        return estimateDao.save(dtoConverter.makeEstimate(estimateDTO)).toDTO();
    }

    @Override
    public List<EstimateDTO> getAllEstimates(User user) {
        return prepareEstimateList(estimateDao.getEstimatesByUser(user));
    }

    @Override
    public EstimateDTO getEstimatesByUserAndEstimateId(User user, Long estimateId) {
        Estimate estimate = estimateDao.getEstimatesById(estimateId);
        if(estimate.getUser().equals(user)){
            return estimate.toDTO();
        }
        return null;
    }

    @Override
    @Transactional
    public Boolean deleteEstimate(Long id) {
        Estimate estimate = estimateDao.getEstimatesById(id);
        if (estimate.getUser().getId().equals(user.get().getId())) {
            estimateDao.delete(estimate);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public EstimateDTO update(EstimateDTO estimateDTO) {
        Estimate estimate = estimateDao.getEstimatesById(estimateDTO.getId());
        estimateDao.delete(estimate);
        estimateDTO.setId(null);
        return estimateDao.save(dtoConverter.makeEstimate(estimateDTO)).toDTO();
    }

    @Override
    @Transactional
    public List<EstimateDTO> getAllEstimateByClientId(Long id) {
        Client client = clientDao.getClientById(id).get();
        return estimateDao.getEstimateByClientId(client, user.get()).stream().map(Estimate::toDTO).collect(Collectors.toList());
    }

    @Transactional
    private void deleteMaterials(Long estimateId) {
        Estimate estimate = estimateDao.getEstimatesById(estimateId);
        for (AbstractMaterialEstimate abstractMaterialEstimate : estimate.getMaterials()) {
            abstractMaterialEstimateDao.delete(abstractMaterialEstimate);
        }
    }

    @Transactional
    private void deleteJobTemplates(Long estimateId) {
        Estimate estimate = estimateDao.getEstimatesById(estimateId);
        for (JobTemplateEstimate jobTemplateEstimate : estimate.getJobTemplates()) {
            jobTemplateEstimateDao.delete(jobTemplateEstimate);
        }
    }

    @Transactional
    private EstimateDTO updateEstimate(EstimateDTO estimateDTO) {
        Estimate estimate = dtoConverter.makeEstimate(estimateDTO);
        if (estimate.getUser().getId().equals(user.get().getId())) {
            estimateDao.merge(estimate);
            return estimate.toDTO();
        }
        return null;
    }

    private List<EstimateDTO> prepareEstimateList(List<Estimate> estimates){
        return estimates.stream()
                .sorted(Comparator.comparing(Estimate::getName))
                .map(Estimate::toDTO).collect(Collectors.toList());
    }

}
