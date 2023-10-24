function useFilterString(filter, limit, skipping) {

    return (
        `userId=${filter.userId};` +
        `searchLimit=${limit};` +
        `searchSkip=${skipping};` +
        `notesOrder=${filter.notesOrder};` +
        `address=${filter.addresses.join()};` +
        `type=${filter.type};` +
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