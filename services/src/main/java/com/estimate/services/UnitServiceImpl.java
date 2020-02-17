package com.estimate.services;

import com.estimate.dao.services.dao.UnitDao;
import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.UnitDTO;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Comparator;
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
    public List<UnitDTO> getAllUnits(User user) {
        return prepareUnitList(unitDao.getAllUnitsByUser(user));
    }

    @Override
    public List<UnitDTO> getHiddenUnits(User user) {
        return prepareUnitList(unitDao.getHiddenUnitsByUser(user));
    }

    @Override
    public List<UnitDTO> getDisplayedUnits(User user) {
        return prepareUnitList(unitDao.getDisplayUnitsByUser(user));
    }

    @Override
    public void hideUnit(Long id) {
        editHide(id,true);
    }

    @Override
    public void displayUnit(Long id) {
        editHide(id,false);
    }

    @Override
    public List<Unit> generateDefaultUnits() {
        List<Unit> units = new ArrayList<>();
        units.add(new Unit("m","", true));
        units.add(new Unit("m","2", true));
        units.add(new Unit("m","3", true));
        units.add(new Unit("rg","", true));
        return units;
    }

    @Override
    public List<Unit> generateDefaultUnitsToUser(User user) {
        List<Unit> units = generateDefaultUnits();
        units.forEach(u -> u.setUser(user));
        return units;
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
    @Transactional
    public boolean deleteUnit(Unit unit) {
        Optional<Unit> optionalUnit = unitDao.getUnitById(unit.getId());
        if(optionalUnit.isPresent()){
            if(optionalUnit.get().getMaterials().isEmpty() &&
                    optionalUnit.get().getJobTemplates().isEmpty()) {
                unitDao.delete(unit);
                return true;
            }
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

    private List<UnitDTO> prepareUnitList(List<Unit> units){
        return units.stream()
                .sorted()
                .map(Unit::toDTO).collect(Collectors.toList());
    }

    @Transactional
    private void editHide(Long id, boolean hide){
        Unit unit = unitDao.getUnitById(id).get();
        unit.setHidden(hide);
        unitDao.merge(unit);
    }
}
