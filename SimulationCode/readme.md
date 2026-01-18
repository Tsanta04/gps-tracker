# IoT Location Publisher Simulation

This project contains a Jupyter Notebook (`Send.ipynb`) that simulates an IoT device traveling between two points. It publishes the device's geolocation data (latitude, longitude) to a HiveMQ Cloud MQTT broker in real-time.

## Features

- **MQTT Connectivity**: Connects to a secure HiveMQ Cloud broker using TLS (Port 8883).
- **Path Simulation**: Generates a linear trajectory between two coordinates (simulating a path from "Gaiopolis" to "Central Square").
- **Real-time Publishing**: Sends JSON payloads every 2 seconds containing the device ID, coordinates, and timestamp.

## Prerequisites

- Python 3.x
- Jupyter Notebook or JupyterLab

## Dependencies

The notebook relies on the `paho-mqtt` library. The first cell of the notebook attempts to install it automatically:

```bash
pip install paho-mqtt
```

## Configuration



- **Broker**: `e792f3c61e8648d2bd1822c6d1910301.s1.eu.hivemq.cloud`
- **Port**: `8883` (TLS)
- **Topic**: `iot/device001/location`
- **Device ID**: `device001`

*Note: The `USERNAME` and `PASSWORD` are hardcoded in the script. Ensure these match your MQTT broker's access control list.*

## Usage

1. Open `Send.ipynb` in your Jupyter environment.
2. Run the cells sequentially to:
   - Install dependencies.
   - Configure the MQTT client.
   - Connect to the broker.
   - Start the simulation loop.
3. The notebook will print the JSON payload for every message sent.
4. To stop the simulation, interrupt the kernel. The script handles `KeyboardInterrupt` to disconnect the client gracefully.

## Data Format

The device publishes messages in the following JSON format:

```json
{
  "device_id": "device001",
  "latitude": -18.8805,
  "longitude": 47.5089,
  "timestamp": "2026-01-15T10:24:59.825728"
}
```