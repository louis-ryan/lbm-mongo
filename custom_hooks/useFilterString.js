function useFilterString(filter, limit, skipping) {

    return (
        `searchLimit=${limit};` +
        `searchSkip=${skipping};` +
        `address=${filter.addresses.join()};` +
        `rent=${filter.selectedRentVal};` +
        `minBed=${filter.minBed};` +
        `minBath=${filter.minBath};` +
        `petsAllowed=${filter.petsAllowed};` +
        `parkingSpace=${filter.parkingSpace};` +
        `terrace=${filter.terrace};` +
        `garden=${filter.garden};` +
        `noSharedWalls=${filter.noSharedWalls};` +
        `noSharedFloor=${filter.noSharedFloor};` +
        `walkToSupermarket=${filter.walkToSupermarket};` +
        `walkToTrain=${filter.walkToTrain};` +
        `moveIn=${[filter.moveInEarliest, filter.moveInLatest]};`
    )
}

export default useFilterString