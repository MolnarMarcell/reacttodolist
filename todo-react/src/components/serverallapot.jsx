import {useState, useEffect} from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:5173/';

const onlineStilus = {
    color: 'green',
    fontWeight: 'bold',
    border: '2px solid rgba(24, 151, 24, 0.74)',
    backgroundColor: 'lightgreen',
    padding: '2px 4px',
    borderRadius: '8px',
};

const keresesStilus = {
    color: 'grey',
    fontWeight: 'bold',
    border: '2px solid grey',
    backgroundColor: 'lightgrey',
    padding: '2px 4px',
    borderRadius: '8px',
}

const offlineStilus = {
    color: 'red',
    fontWeight: 'bold',   
    border: '2px solid red',
    backgroundColor: 'rgba(255, 0, 0, 0.2)', 
    padding: '2px 4px',
    borderRadius: '8px',
}

export default function ServerAllapot() {
    const [serverAllapot, setServerAllapot] = useState(null);

      function getServerAllapot() {
    axios.get(SERVER_URL)
      .then((response) => {
        setServerAllapot(true);
        console.log("Szerver állapot: Online");
      })
      .catch((error) => {
        console.error("Hiba a szerver állapot lekérésekor:", error);
        setServerAllapot(false);
        console.log("Szerver állapot: Offline");
      });
  }

    useEffect(() => {
        getServerAllapot();
    }, []);

  return (
    <div>
        <label>Szerver állapota: <span style={serverAllapot === null ? keresesStilus : serverAllapot ? onlineStilus : offlineStilus}>
            {serverAllapot === null ? "Ellenőrzés..." : serverAllapot ? "Online" : "Offline"}
        </span></label>
    </div>
  );
}