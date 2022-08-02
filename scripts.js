// Write your JavaScript code here.
// Remember to pay attention to page loading!
window.addEventListener('load', () => {
  // buttons
  const btnTakeOff = document.getElementById('takeoff');
  const btnLand = document.getElementById('landing');
  const btnAbortMission = document.getElementById('missionAbort');
  const btnDirections = document.getElementsByClassName('direction');
  // display
  const displayFlightStatus = document.getElementById('flightStatus');
  const displayShuttleHeight = document.getElementById('spaceShuttleHeight');
  // container
  const containerShuttleBackground = document.getElementById('shuttleBackground');
  // rocket
  const rocket = document.getElementById('rocket');
  let rocketStyle = getComputedStyle(rocket);
  let rocketPosition = {};
  // constants
  const MOVE_RATE = 10; //px
  const MILES_HEIGHT_MOVE = 10_000;

  // helper
  const updateInfo = (flightStatus, backgroundColor, shuttleHeight) => {
    displayFlightStatus.innerText = flightStatus;
    containerShuttleBackground.style.backgroundColor = backgroundColor;
    updateShuttleHeight(shuttleHeight);
  };

  const getShuttleHeight = () => Number(displayShuttleHeight.innerText.replace(',', ''));

  const updateShuttleHeight = shuttleHeight => {
    displayShuttleHeight.innerText = shuttleHeight.toLocaleString('en-US');
    if (shuttleHeight === 0) {
      rocket.style.bottom = 0;
      rocket.style.left = 'calc(50% - 37.5px)';
      rocketPosition = rocketPosition = getRocketComputedPosition();
    }
  };

  const getRocketComputedPosition = () => ({
    y: Number(rocketStyle.bottom.replace('px', '')),
    x: Number(rocketStyle.left.replace('px', ''))
  });

  const moveRocket = (direction) => {
    switch (direction) {
      case 'up':
        rocketPosition.y += MOVE_RATE;
        updateShuttleHeight(getShuttleHeight() + MILES_HEIGHT_MOVE);
        rocket.style.bottom = rocketPosition.y;
        break;
      case 'down':
        rocketPosition.y -= MOVE_RATE;
        updateShuttleHeight(getShuttleHeight() - MILES_HEIGHT_MOVE);
        rocket.style.bottom = rocketPosition.y;
        break;
      case 'right':
        rocketPosition.x += MOVE_RATE;
        rocket.style.left = rocketPosition.x;
        break;
      case 'left':
        rocketPosition.x -= MOVE_RATE;
        rocket.style.left = rocketPosition.x;
        break;
    }
  }

  btnTakeOff.onclick = () => {
    let readyForTakeOff = confirm('Confirm that the shuttle is ready for takeoff.');
    if (readyForTakeOff) {
      let miles = getShuttleHeight();
      updateInfo('Shuttle in flight.', 'blue', miles + MILES_HEIGHT_MOVE);
    }
  };

  btnLand.onclick = () => {
    alert('The shuttle is landing. Landing gear engaged.');
    updateInfo('The shuttle has landed.', 'green', 0);
  };

  btnAbortMission.onclick = () => {
    let abortMission = confirm('Confirm that you want to abort the mission.');
    if (abortMission) {
      updateInfo('Mission aborted.', 'green', 0);
    }
  };

  Array.from(btnDirections).forEach(btn => {
    btn.onclick = () => moveRocket(btn.id);
  });

  rocketPosition = getRocketComputedPosition();
  console.log('Rocket', rocketPosition);
  console.log('Ready');
});