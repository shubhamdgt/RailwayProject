$(document).ready(function () {
  var $delay = 1000,
    // vMin = 11.5,
    // vMax = 14.5,
    // cMin = 0.3,
    // cMax = 2.5,
    // mMin = 0,
    // mMax = 5,
    totalPoints = 25,
    $voltageDisplay = $("div.volts"),
    $currentDisplay = $("div.amps"),
    $moistureDisplay = $("div.moisture");
  $remainingDistance = $("div.remainingDistance");
  $appDestination = $("div.appDestination");
  $nextDestination = $("div.nextDestination");
  $next2Destination = $("div.next2Destination");
  $engSpeed = $("span.engSpeed");
  $engDistance = $("span.engDistance");
  $journeyStatus = $("span.journeyStatus");

  var sensorData = []; // Array to hold the sensor data
  var dataIndex = 0;

 
  const button = document.getElementById('checkout-button');
  


  function loadData() {
    $.getJSON("data.json", function (data) {
      sensorData = data;
    });
  }

  function getSensorValues() {
    if (dataIndex >= sensorData.length) {
      dataIndex = 0; // Reset to loop the data if it reaches the end
    }
    var data = sensorData[dataIndex];
    dataIndex++;
    return data;
  }

  // function getRandomInt(min, max) {
  // 	let reading = (Math.random() * (max - min + 1) + min);
  // 	return (Math.round(reading * 2) / 2)
  // }

  function updateEngSpeed(value) {
    $engSpeed.html(value.toFixed(1));
  }

  function updateEngDistance(value) {
    $engDistance.html(value.toFixed(1));
  }

  function updateJourneyStatus(value) {
    $journeyStatus.html(value);

    if (value == "Ongoing") {
      button.disabled = true;
  }

  }

  function updateRemainingDistance(value) {
    $remainingDistance.html(value.toFixed(1));
  }

  function updateAppDestination(value) {
    $appDestination.html(value);
  }

  function updateNextDestination(value) {
    $nextDestination.html(value);
  }

  function updateNext2Destination(value) {
    $next2Destination.html(value);
  }

  function updateVoltage(value) {
    $voltageDisplay.html(value.toFixed(1));
  }

  function updateCurrent(value) {
    $currentDisplay.html(value.toFixed(1));
  }

  function updateMoisture(value) {
    $moistureDisplay.html(value.toFixed(1) + "<span>AMSL</span>");
  }

  // Ideal Speed , Elevation , Current Speed , Remaining Distance, Approaching Destination , Next Destination, Super Next Destination , Energy Saving Speed , Energy Saving Distance , Journey Status

  function updateSensorDisplayValues(d) {
    console.log(d);
    updateVoltage(d[0]);
    updateCurrent(d[1]);
    updateMoisture(d[2]);
    updateRemainingDistance(d[3]);
    updateAppDestination(d[4]);
    updateNextDestination(d[5]);
    updateNext2Destination(d[6]);
    updateEngSpeed(d[7]);
    updateEngDistance(d[8]);
    updateJourneyStatus(d[9]);
  }

  Highcharts.setOptions({
    global: {
      useUTC: false,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  });

  $("#sensorData").highcharts({
    chart: {
      type: "spline",
      events: {
        load: function () {
          var voltage = this.series[0];
          var current = this.series[1];
          var moisture = this.series[2];
          var x,
            volts,
            amps,
            mPercent,
            appDest,
            nxtDest,
            nxt2Dest,
            remDist,
            engSpeed,
            engDistance,
            journeyStatus;

          loadData();

          // faking sensor data
          // data will be coming from sensors on the MKR1000
          setInterval(function () {
            var sensorValues = getSensorValues();
            x = new Date().getTime();

            volts = sensorValues[0];
            mPercent = sensorValues[1];
            amps = sensorValues[2];
            remDist = sensorValues[3];
            appDest = sensorValues[4];
            nxtDest = sensorValues[5];
            nxt2Dest = sensorValues[6];
            engSpeed = sensorValues[7];
            engDistance = sensorValues[8];
            journeyStatus = sensorValues[9];

            // x = (new Date()).getTime(),
            // 	volts = getRandomInt(vMin, vMax),
            // 	amps = getRandomInt(cMin, cMax),
            // 	mPercent = getRandomInt(mMin, mMax);

            voltage.addPoint([x, volts], false, true);
            current.addPoint([x, amps], false, true);
            moisture.addPoint([x, mPercent], true, true);

            updateSensorDisplayValues([
              volts,
              amps,
              mPercent,
              remDist,
              appDest,
              nxtDest,
              nxt2Dest,
              engSpeed,
              engDistance,
              journeyStatus,
            ]);
          }, $delay);
        },
      },
    },
    title: {
      text: "Train Current Status",
    },
    // xAxis: {
    //   type: "datetime",
    //   tickPixelInterval: 100,
    // },
    xAxis: {
      type: "linear",
      tickPixelInterval: 100,
      labels: {
        enabled: false, // Hide x-axis labels
      },
    },
    yAxis: [
      {
        title: {
          text: "IDEAL SPEED",
          style: {
            color: "#2b908f",
            font: "13px sans-serif",
          },
        },
        min: 0,
        max: 150,
        plotLines: [
          {
            value: 0,
            width: 1,
            color: "#808080",
          },
        ],
      },
      {
        title: {
          text: "CURRENT SPEED",
          style: {
            color: "#90ee7e",
            font: "13px sans-serif",
          },
        },
        min: 0,
        max: 150,
        opposite: true,
        plotLines: [
          {
            value: 0,
            width: 1,
            color: "#808080",
          },
        ],
      },
      {
        title: {
          text: "ELEVATION",
          style: {
            color: "#f45b5b",
            font: "13px sans-serif",
          },
        },
        min: 0,
        max: 5000,
        opposite: true,
        plotLines: [
          {
            value: 0,
            width: 1,
            color: "#808080",
          },
        ],
      },
    ],
    tooltip: {
      formatter: function () {
        var unitOfMeasurement = this.series.name === "VOLTAGE" ? " V" : " A";
        return (
          "<b>" +
          this.series.name +
          "</b><br/>" +
          Highcharts.numberFormat(this.y, 1) +
          unitOfMeasurement
        );
      },
    },
    legend: {
      enabled: true,
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        name: "IDEAL SPEED",
        yAxis: 0,
        style: {
          color: "#2b908f",
        },
        data: (function () {
          // generate an array of random data
          var data = [],
            time = new Date().getTime(),
            i;

          for (i = -totalPoints; i <= 0; i += 1) {
            data.push({
              x: time + i * $delay,
              //   y: getRandomInt(12, 12),
              y: 0, // Initial value
            });
          }
          return data;
        })(),
      },
      {
        name: "CURRENT SPEED",
        yAxis: 1,
        data: (function () {
          // generate an array of random data
          var data = [],
            time = new Date().getTime(),
            i;

          for (i = -totalPoints; i <= 0; i += 1) {
            data.push({
              x: time + i * $delay,
              //   y: getRandomInt(0.7, 0.7),
              y: 0, // Initial value
            });
          }
          return data;
        })(),
      },
      {
        name: "ELEVATION",
        yAxis: 2,
        data: (function () {
          // generate an array of random data
          var data = [],
            time = new Date().getTime(),
            i;

          for (i = -totalPoints; i <= 0; i += 1) {
            data.push({
              x: time + i * $delay,
              //   y: getRandomInt(1, 1),
              y: 0, // Initial value
            });
          }
          return data;
        })(),
      },
    ],
  });
});



