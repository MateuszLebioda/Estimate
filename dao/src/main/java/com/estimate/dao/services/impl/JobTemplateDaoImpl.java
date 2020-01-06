package com.estimate.dao.services.impl;

import com.estimate.dao.services.dao.AbstractDao;
import com.estimate.dao.services.dao.JobTemplateDao;
import com.estimate.model.entities.JobTemplate;

import javax.ejb.Stateless;

@Stateless(name = "jobTemplateDao")
public class JobTemplateDaoImpl extends AbstractDao<JobTemplate> implements JobTemplateDao {

}
