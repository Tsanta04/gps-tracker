# IoT Cloud Service - Real-Time Location Tracking

Welcome to the **IoT Cloud Service** project repository. This project demonstrates a complete IoT architecture for real-time location tracking, using the MQTT protocol for communication between a device simulator and a mobile application.

## Project Description

The system consists of two main parts communicating via an MQTT broker (HiveMQ Cloud):

1.  **The Publisher (Simulator)**: A Python script that generates and sends GPS coordinates simulating device movement.
2.  **The Subscriber (Mobile Application)**: A React Native (Expo) application that receives these coordinates and displays the device's position on a map.

## Repository Organization

The project is structured into two main folders:

| Folder | Description | Technology |
| :--- | :--- | :--- |
| **`SimulationCode/`** | Contains the Jupyter notebook (`Send.ipynb`) that simulates the IoT device and publishes geolocation data. | Python, Paho-MQTT, Jupyter |
| **`AppCode/`** | Contains the source code of the mobile application that subscribes to the data stream to visualize the path. | React Native, Expo, MQTT |

## Technical Architecture

-   **Protocole** : MQTT (Message Queuing Telemetry Transport)
-   **Broker** : HiveMQ Cloud (Cluster public sécurisé via TLS)
-   **Topic** : `iot/device001/location`
-   **Security** : Encrypted connection (TLS/SSL) on port 8883.

## General Prerequisites

To run the entire project, you will need:

-   **Python 3.x** (for the simulation)
-   **Node.js** & **npm** (for the mobile application)
-   **Expo Go** (on your smartphone) or an Android/iOS emulator.

## How to Start

Each folder contains its own `README.md` with detailed instructions. Here is the recommended workflow:

1.  **Start the Simulation**:
    Go to the `SimulationCode/` folder and follow the instructions to start the `Send.ipynb` notebook. This will start sending data to the broker.

2.  **Start the Application**:
    Go to the `AppCode/` folder, install the dependencies, and launch the application with Expo. You will then see the marker moving on the map in real-time.

---
*Project realized as part of the IoT Cloud Service course.*
