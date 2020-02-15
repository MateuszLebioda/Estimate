package com.estimate.services;

import com.estimate.model.entities.Estimate;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.EstimateDTO;
import com.estimate.model.entities.dto.MaterialTemplateDTO;
import com.estimate.model.entities.dto.ServiceTempleDTO;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.*;


@Stateless(name = "jasperService")
public class JasperServiceImpl implements JasperService {

    @EJB
    private UserService userService;

    @EJB
    private MaterialService materialService;

    @EJB
    private EstimateService estimateService;

    @Override
    public byte[] generateEstimateReport(Long userId, Long estimateId) {
        User user = userService.getUserById(userId);
        EstimateDTO estimate = estimateService.getEstimatesByUserAndEstimateId(user, estimateId);
        JRBeanCollectionDataSource materialSource = new JRBeanCollectionDataSource(estimate.getMaterials());
        JRBeanCollectionDataSource servicesSource = new JRBeanCollectionDataSource(estimate.getServices());
        JRBeanCollectionDataSource jobTemplatesSource = new JRBeanCollectionDataSource(estimate.getJobTemplates());
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("MaterialsParameters",materialSource);
        parameters.put("ServicesSource",servicesSource);
        parameters.put("JobTemplateSource",jobTemplatesSource);
        parameters.put("Title", estimate.getName());
        parameters.put("price", estimate.getSumPrice());
        parameters.put("client", estimate.getClient());
        return generateJasperReports(parameters, "/EstimateReport/EstimateReport.jasper");
    }

    @Override
    public byte[] generateMaterialPriceList(Long userId) {
        User user = userService.getUserById(userId);
        List<MaterialTemplateDTO> abstractMaterialTemplates = materialService.getAllMaterialsDTO(user);
        JRBeanCollectionDataSource source = new JRBeanCollectionDataSource(abstractMaterialTemplates);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("MaterialsParameters",source);
        return generateJasperReports(parameters, "/MaterialPriceList/MaterialsPriceList.jasper");
    }

    @Override
    public byte[] generateServicesPriceList(Long userId) {
        User user = userService.getUserById(userId);
        List<ServiceTempleDTO> abstractMaterialTemplates = materialService.getAllServicesDTO(user);
        JRBeanCollectionDataSource source = new JRBeanCollectionDataSource(abstractMaterialTemplates);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("MaterialsParameters",source);
        return generateJasperReports(parameters,  "/ServicePriceList/ServicesPriceList.jasper");
    }



    private byte[] generateJasperReports(Map<String,Object> parameters, String reportPath){
        try {
            JasperPrint jasperPrint = JasperFillManager
                    .fillReport(getClass()
                            .getResourceAsStream(reportPath), parameters, new JREmptyDataSource());
            return JasperExportManager.exportReportToPdf(jasperPrint);
        } catch (JRException e) {
            return null;
        }
    }
}
