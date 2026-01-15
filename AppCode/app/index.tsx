import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapScreen() {
  const mapHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    body, html { margin: 0; padding: 0; height: 100%; }
    #map { height: 100%; width: 100%; }
  </style>
</head>
<body>

<div id="map"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>

<script>
  function log(msg) {
    window.ReactNativeWebView.postMessage(msg);
  }

  // ================= MAP =================
  const map = L.map('map').setView([0, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19
  }).addTo(map);

  let marker = null;
  let polyline = L.polyline([], { color: '#2563eb', weight: 4 }).addTo(map);

  // ================= MQTT =================
  const options = {
    username: 'GPS_ESP',
    password: 'TsantaMirindra1',
    clean: true,
    reconnectPeriod: 2000,
  };

  log('Connecting to MQTT...');

  const client = mqtt.connect(
    'wss://e792f3c61e8648d2bd1822c6d1910301.s1.eu.hivemq.cloud:8884/mqtt',
    options
  );

  client.on('connect', () => {
    log(' MQTT connected');
    client.subscribe('iot/device001/location', err => {
      if (err) log(' Subscribe error: ' + err.message);
      else log(' Subscribed to topic');
    });
  });

  client.on('error', error => {
    log(' MQTT ERROR: ' + (error.message || error));
  });

  client.on('offline', () => {
    log(' MQTT offline');
  });

  client.on('reconnect', () => {
    log(' MQTT reconnecting...');
  });

  client.on('message', (topic, message) => {

    try {
      const data = JSON.parse(message.toString());
      log(data.latitude + ' ' + data.longitude);

      if (!data.latitude || !data.longitude) {
        log(' Invalid GPS data');
        return;
      }

      const lat = data.latitude;
      const lng = data.longitude;

      polyline.addLatLng([lat, lng]);

      if (!marker) {
        marker = L.marker([lat, lng]).addTo(map);
        map.setView([lat, lng], 16);
      } else {
        marker.setLatLng([lat, lng]);
      }
    } catch (e) {
      log(' JSON error');
    }
  });
</script>

</body>
</html>
`;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: mapHTML }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={(event) => {
          console.log('WEBVIEW:', event.nativeEvent.data);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
