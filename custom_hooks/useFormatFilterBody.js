function useFormatFilterBody(filter, user) {

  if (!user) return

  return {
    addresses: filter.addresses,
    type: filter.type,
    selectedAreas: filter.selectedAreas,
    rent: filter.rent,
    minLimit: filter.minLimit,
    maxLimit: filter.maxLimit,
    minRentVal: filter.minRentVal,
    maxRentVal: filter.maxRentVal,
    selectedRentVal: filter.selectedRentVal,
    minBed: filter.minBed,
    minBath: filter.minBath,
    petsAllowed: filter.petsAllowed,
    parkingSpace: filter.parkingSpace,
    terrace: filter.terrace,
    garden: filter.garden,
    noSharedWalls: filter.noSharedWalls,
    noSharedFloor: filter.noSharedFloor,
    walkToSupermarket: filter.walkToSupermarket,
    walkToTrain: filter.walkToTrain,
    moveInEarliest: filter.moveInEarliest,
    moveInLatest: filter.moveInLatest,
    notesOrder: filter.notesOrder,
    userId: user.sub,
    userName: user.given_name,
    userEmail: user.email
  }
}

export default useFormatFilterBody