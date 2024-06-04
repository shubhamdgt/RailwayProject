function generateJourneyData(stations) {
    const journeyData = [];
    let idealSpeed = 0;
    let currentSpeed = 0;
    let remainingDistance = stations[stations.length - 1].Distance;
    let journeyStatus = "started";
    let energySavingSpeed = 50;
    let energySavingDistance = 20;
    let time = 0;
    const maxIdealSpeed = 90;
    const speedIncrement = 0.5;
    const distanceDecrement = 0.1;
    const stationStopTime = 3; // Time to stop at each station in seconds
    let stopTimeRemaining = 0;
    let approachingStationIndex = 0;

    while (remainingDistance > 0) {
        // Check if the train needs to stop at the approaching station
        const approachingStation = stations[approachingStationIndex];
        if (approachingStation.Distance >= remainingDistance) {
            if (stopTimeRemaining < stationStopTime) {
                idealSpeed = 0;
                currentSpeed = 0;
                stopTimeRemaining += 1;
            } else {
                // After stopping, move to the next station
                stopTimeRemaining = 0;
                approachingStationIndex++;
            }
        } else {
            // Increment the ideal speed slowly until it reaches maxIdealSpeed
            if (idealSpeed < maxIdealSpeed) {
                idealSpeed += speedIncrement;
            } else {
                idealSpeed = maxIdealSpeed;
            }

            // Adjust current speed to be slightly higher than ideal speed
            currentSpeed = idealSpeed + Math.random() * 5;

            // Update remaining distance
            remainingDistance -= distanceDecrement;
        }

        // Determine approaching and next stations
        const nextStation = getNextStation(stations, approachingStation);
        const superNextStation = getNextStation(stations, nextStation);

        // Update journey status
        if (remainingDistance <= 0) {
            journeyStatus = "completed";
        } else if (remainingDistance < stations[1].Distance) {
            journeyStatus = "Ongoing";
        } else {
            journeyStatus = "started";
        }

        // Add data point to the journey data array
        journeyData.push([
            idealSpeed.toFixed(1),
            getElevation(stations, remainingDistance),
            currentSpeed.toFixed(1),
            remainingDistance.toFixed(1),
            `${approachingStation.name} (${(approachingStation.Distance - remainingDistance).toFixed(3)} Km)`,
            `${nextStation.name} (${(nextStation.Distance - remainingDistance).toFixed(3)} Km)`,
            `${superNextStation.name} (${(superNextStation.Distance - remainingDistance).toFixed(3)} Km)`,
            energySavingSpeed,
            energySavingDistance,
            journeyStatus
        ]);

        // Simulate time passing
        time += 1;
    }

    return journeyData;
}

function getApproachingStation(stations, remainingDistance) {
    return stations.find(station => station.Distance >= remainingDistance) || stations[stations.length - 1];
}

function getNextStation(stations, currentStation) {
    const currentIndex = stations.indexOf(currentStation);
    return stations[currentIndex + 1] || currentStation;
}

function getElevation(stations, remainingDistance) {
    const currentStation = getApproachingStation(stations, remainingDistance);
    return currentStation.Elevation;
}

// Station data
const stations = [
    { name: "Pune Junction (PUNE)", Distance: 0, Elevation: 560 },
    { name: "Shivajinagar (SVJR)", Distance: 3, Elevation: 557 },
    { name: "Khadki (KK)", Distance: 7, Elevation: 560 },
    { name: "Dapodi (DAPD)", Distance: 11, Elevation: 563 }
];

// Generate the journey data
const journeyData = generateJourneyData(stations);

// Log the journey data to the console
console.log(JSON.stringify(journeyData, null, 2));
