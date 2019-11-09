package com.estimate.dao.services.dao;

import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;

import java.util.List;
import java.util.Optional;

public interface UnitDao extends AbstractDaoFunction <Unit>{
    List<Unit> getUnitsByUser(User user);
    Optional<Unit> getUnitById(Long id);
}
