
<img src="https://github.com/user-attachments/assets/2bff7c7f-a990-4fe9-b468-3ce9bb845fbf" alt="Profile Picture" width="60" height="60" style="border-radius:50%; margin-right: 10px;">

## Byteuth - Three.js Starter Boilerplate
Basic starter setup for Three.js projects, complete with essential components, controls, and a base GUI template.

## Features

### Core Setup

- **Canvas**: Renders the 3D scene.
- **Scene**: A container for all 3D objects.
- **Camera**: A perspective camera is set up with customizable aspect ratio, field of view, and near/far clipping planes.
- **Renderer**: WebGL renderer configured to automatically adjust size and pixel ratio.

### Basic Mesh & Helpers

- **Basic Mesh**: A customizable cube with texture mapping, adjustable geometry, and real-time color changes.
- **AxesHelper**: Displays the X, Y, and Z axes to assist with scene orientation.
- **Clock**: Used to track elapsed time for animations.

### Controls

- **OrbitControls**: Enables interactive rotation, zooming, and panning of the scene. Damping is enabled for smoother camera movement.

### GUI Controls

- **lil-gui**: A GUI panel is integrated to control various aspects of the scene:
  - **Mesh Position**: Adjust the X, Y, and Z positions of the cube.
  - **Wireframe & Visibility**: Toggle the cube's wireframe mode and visibility.
  - **Color**: Change the color of the cube in real-time.
  - **Spin**: Trigger a 360° rotation of the cube along the Y-axis using GSAP animations.
  - **Subdivision**: Dynamically alter the cube's geometry subdivisions.

### Texture Loaders

- **Loading Manager**: Manages and tracks the loading of textures, with logging for start, progress, completion, and error events.
- **TextureLoader**: Loads a checkerboard texture, with specific settings for color space, filtering, rotation, and centering.

### Event Listeners

- **Resize**: Automatically adjusts the renderer and camera aspect ratio when the window is resized.
- **Double Click**: Toggles fullscreen mode for the canvas element.
- **Mouse Move**: Tracks mouse movements to interact with the scene (currently adjusts cursor position).
- **Keydown ('h')**: Toggles the visibility of the GUI panel.

## Getting Started

To run this project locally:

```bash
npm install
npm run dev
```
![Screenshot from 2024-08-24 17-53-52](https://github.com/user-attachments/assets/5e741b90-b0fc-4b15-b56b-cfdd6150ddda)

