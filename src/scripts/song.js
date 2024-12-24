let socket = new WebSocket(
    "wss://scrobbled.tepiloxtl.net/ws/get_last_track/flowtyle",
  );
  
  socket.onopen = function (e) {
    console.log("[open] Connection established");
  };
  
  socket.onmessage = function (event) {
    data = JSON.parse(event.data);
    document.getElementById("listening").innerHTML = `
      <div id="listeningStatus">
      <div id="blob"></div>
      <h2 id="trackStatus"></h2>
      </div>
      <div id="musicBox">
      <img src="${data["recenttracks"]["track"][0]["image"]["1"]["#text"]}">
      <div id="trackInfo">
      <h3 id="trackName">${data["recenttracks"]["track"][0]["name"]}</h3>
      <p id="artistName">${data["recenttracks"]["track"][0]["artist"]["name"]}</p>
      </div>
      </div>
      `;
  
    if (data["recenttracks"]["track"][0].nowplaying === "true") {
      document.getElementById("trackStatus").innerHTML = "Listening to";
      document.getElementById("blob").style.background = "#5dff8a";
    } else {
      document.getElementById("trackStatus").innerHTML = "Last listened";
      document.getElementById("blob").style.background = "#5d5d5d";
    }
  };
  
  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`,
      );
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log("[close] Connection died");
    }
  };
  
  socket.onerror = function (error) {
    console.log(`[error]`);
  };
  