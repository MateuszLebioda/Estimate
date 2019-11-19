package com.estimate.services;

import com.estimate.dao.services.dao.UnitDao;
import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.UnitDTO;
import com.estimate.model.entities.utils.Role;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Stateless(name = "unitService")
public class UnitServiceImpl implements UnitService {

    @EJB
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
    public List<Unit> getAllUnitsByRole(User user, Role role) {
        return unitDao.getUnitsByUserAndRole(user,role);
    }

    @Override
    public List<Unit> generateDefaultUnits() {
        List<Unit> units = new ArrayList<>();
        units.add(new Unit("m","", Role.MATERIAL,true));
        units.add(new Unit("m","2", Role.MATERIAL,true));
        units.add(new Unit("m","3", Role.MATERIAL,true));
        units.add(new Unit("rg","", Role.WORKS,true));
        return units;
    }

    @Override
    public List<Unit> generateDefaultUnitsToUser(User user) {
        List<Unit> units = generateDefaultUnits();
        units.forEach(u -> u.setUser(user));
        return units;
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
