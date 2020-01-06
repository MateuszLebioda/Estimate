package com.estimate.dao.services.impl;

import com.estimate.dao.services.dao.AbstractDao;
import com.estimate.dao.services.dao.JobTemplateAbstractMaterialDao;
import com.estimate.model.entities.JobTemplateAbstractMaterial;

import javax.ejb.Stateless;

@Stateless(name = "jobTemplateAbstractMaterialDao")
public class JobTemplateAbstractMaterialDaoImpl extends AbstractDao<JobTemplateAbstractMaterial> implements JobTemplateAbstractMaterialDao {
}
