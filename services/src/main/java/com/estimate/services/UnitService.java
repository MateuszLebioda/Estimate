package com.estimate.services;

import com.estimate.model.entities.Unit;
import com.estimate.model.entities.User;
import com.estimate.model.entities.dto.UnitDTO;
import com.estimate.model.entities.utils.Role;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface UnitService {
    Long addUnit(Unit unit);
    List<UnitDTO> getAllUnits(User user);
    List<UnitDTO> getHiddenUnits(User user);
    List<UnitDTO> getDisplayedUnits(User user);
    void hideUnit(Long id);
    void displayUnit(Long id);
    List<Unit> generateDefaultUnits();
    List<Unit> generateDefaultUnitsToUser(User user);
    Optional<Unit> getOptionalUnitById(Long id);
    Unit getUnitById(Long id);
    boolean deleteUnit(Unit unit);
    boolean isMyUnit(User user, Unit unit);
    boolean isMyUnit(User user, Long unitId);
    void merge(Unit unit);
}
