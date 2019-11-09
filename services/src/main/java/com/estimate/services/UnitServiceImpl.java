package com.estimate.services;

import com.estimate.dao.services.dao.UnitDao;
import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.UnitDTO;

import javax.ejb.Stateless;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Stateless(name = "unitService")
public class UnitServiceImpl implements UnitService {

    private UnitDao unitDao;

    @Override
    public Long addUnit(Unit unit) {
        return unitDao.save(unit).getId();
    }

    @Override
    public List<Unit> getAllUnits(User user) {
        return unitDao.getUnitsByUser(user);
    }

    @Override
    public List<UnitDTO> getAllDTOUnits(User user) {
        return getAllUnits(user).stream().map(Unit::toDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<Unit> getOptionalUnitById(Long id) {
        return unitDao.getUnitById(id);
    }

    @Override
    public Unit getUnitById(Long id) {
        return unitDao.getUnitById(id).get();
    }

    @Override
    public boolean deleteUnit(Unit unit) {
        Optional<Unit> optionalClient = unitDao.getUnitById(unit.getId());
        if(optionalClient.isPresent()){
            unitDao.delete(unit);
            return true;
        }return false;
    }

    @Override
    public boolean isMyUnit(User user, Unit unit) {
        return unit.getUser().getId().equals(user.getId());
    }

    @Override
    public boolean isMyUnit(User user, Long unitId) {
        return unitId.equals(user.getId());
    }

    @Override
    public void merge(Unit unit) {
        unitDao.merge(unit);
    }
}
