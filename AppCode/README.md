# IoT Location Subscriber Application

This directory contains the client application (`AppCode`) built with **Expo (React Native)**. It subscribes to the IoT data stream to receive real-time geolocation updates published by the simulation and visualizes the device's path on a map.

## Features

- **MQTT Subscription**: Establishes a secure TLS connection to the HiveMQ Cloud broker.
- **Real-time Monitoring**: Listens on the topic `iot/device001/location` for incoming messages.
- **Map Visualization**: Displays the device's location on a map interface.

## Configuration

The application is configured to connect to the same broker used in `SimulationCode`:

- **Broker**: `e792f3c61e8648d2bd1822c6d1910301.s1.eu.hivemq.cloud`
- **Port**: `8883` (TLS)
- **Topic**: `iot/device001/location`
- **Device ID**: `device001` (Filter)

*Note: Ensure the credentials (Username/Password) in the code match your HiveMQ cluster permissions.*

## Prerequisites

- **Node.js** (LTS version recommended)
- **npm** or **yarn**
- **Expo Go** app installed on your physical device (Android/iOS) OR an Android/iOS Simulator.

## User Guide (Run with Expo)

1. **Install Dependencies**:
   Navigate to the `AppCode` directory in your terminal and install the required packages:
   ```bash
   cd AppCode
   npm install
   ```

2. **Start the Application**:
   Start the Expo development server:
   ```bash
   npx expo start
   ```

3. **Launch on Device/Emulator**:
   - **Physical Device**: Open the **Expo Go** app and scan the QR code displayed in the terminal.
   - **Emulator**: Press `a` to open in the Android Emulator or `i` for the iOS Simulator.

4. **Visualize Data**:
   Ensure `Send.ipynb` (in `SimulationCode`) is running. The app will update the map marker in real-time as it receives MQTT messages.

## Expected Data Format

The application expects messages in the following JSON structure:

```json
{
  "device_id": "device001",
  "latitude": -18.8805,
  "longitude": 47.5089,
  "timestamp": "2026-01-15T10:24:59.825728"
}
```
