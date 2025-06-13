let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function timeToString(time) {
  const date = new Date(time);
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

function startStopwatch() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      document.getElementById("display").textContent = timeToString(elapsedTime);
    }, 100);
    triggerPulse();
  }
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
  triggerPulse();
}

function resetStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  document.getElementById("display").textContent = "00:00:00";
  document.getElementById("laps").innerHTML = "";
  triggerPulse();
}

function recordLap() {
  const lapTime = timeToString(elapsedTime);
  const li = document.createElement("li");
  li.textContent = `Lap ${document.getElementById("laps").children.length + 1}: ${lapTime}`;
  document.getElementById("laps").appendChild(li);
  triggerPulse();
}

function triggerPulse() {
  const display = document.getElementById("display");
  display.classList.remove("pulse");
  void display.offsetWidth; // Force reflow to restart animation
  display.classList.add("pulse");
}
