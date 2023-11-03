var sw = {
  // (A) PROPERTIES
  disp : null, // html time display
  res : null,  // html reset button
  startstop : null,   // html start/stop button
  timer : null, // timer object
  now : 0,      // current elapsed time

  // (B) INITIALIZE
  init : () => {
    // (B1) GET HTML ELEMENTS
    sw.disp = document.getElementById("zero");
    sw.res = document.getElementById("reset");
    sw.startstop = document.getElementById("start");

    // (B2) ENABLE BUTTON CONTROLS
    sw.res.onclick = sw.reset;
    sw.startstop.onclick = sw.start;
    sw.res.disabled = false;
    sw.startstop.disabled = false;
  },

  // (C) START!
  start : () => {
    sw.timer = setInterval(sw.tick, 1000);
    sw.startstop.value = "Stop";
    sw.startstop.onclick = sw.stop;
  },

  // (D) STOP
  stop : () => {
    clearInterval(sw.timer);
    sw.timer = null;
    sw.startstop.value = "Start";
    sw.startstop.onclick = sw.start;
  },

  // (E) TIMER ACTION
  tick : () => {
    // (E1) CALCULATE HOURS, MINS, SECONDS
    sw.now++;
    let hours = 0, mins = 0, secs = 0,
    remain = sw.now;
    hours = Math.floor(remain / 3600);
    remain -= hours * 3600;
    mins = Math.floor(remain / 60);
    remain -= mins * 60;
    secs = remain;

    // (E2) UPDATE THE DISPLAY TIMER
    if (hours<10) { hours = "0" + hours; }
    if (mins<10) { mins = "0" + mins; }
    if (secs<10) { secs = "0" + secs; }
    sw.disp.innerHTML = hours + ":" + mins + ":" + secs;
  },

  // (F) RESET
  reset : () => {
    if (sw.timer != null) { sw.stop(); }
    sw.now = -1;
    sw.tick();
  }
};
window.addEventListener("load", sw.init);