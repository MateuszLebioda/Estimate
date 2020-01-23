package com.estimate.dao.services.impl;

import com.estimate.dao.services.dao.AbstractDao;
import com.estimate.dao.services.dao.AbstractMaterialEstimateDao;
import com.estimate.model.entities.AbstractMaterialEstimate;

import javax.ejb.Stateless;

@Stateless(name = "abstractMaterialEstimateDao")
public class AbstractMaterialEstimateDaoImpl  extends AbstractDao<AbstractMaterialEstimate> implements AbstractMaterialEstimateDao {
}
