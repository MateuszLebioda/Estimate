package com.estimate.dao.services.impl;

import com.estimate.dao.services.dao.AbstractDao;
import com.estimate.dao.services.dao.JobTemplateEstimateDao;
import com.estimate.model.entities.JobTemplateEstimate;

import javax.ejb.Stateless;

@Stateless(name = "jobTemplateEstimate")
public class JobTemplateEstimateDaoImpl extends AbstractDao<JobTemplateEstimate> implements JobTemplateEstimateDao {
}
