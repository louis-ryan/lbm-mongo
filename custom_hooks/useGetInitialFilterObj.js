function useGetInitialFilterObj() {
    

    return {
        addresses: [],
        selectedAreas: [],
        rent: [],
        minRentVal: null,
        maxRentVal: null,
        selectedRentVal: [null, null],
        minBed: 0,
        minBath: 0,
        petsAllowed: false,
        parkingSpace: false,
        terrace: false,
        garden: false,
        noSharedWalls: false,
        noSharedFloor: false,
        walkToSupermarket: false,
        walkToTrain: false,
        moveInEarliest: null,
        moveInLatest: null,
        userId: null,
        userName: null,
        userEmail: null
    };
}

export default useGetInitialFilterObj