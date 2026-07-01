# 🧠 Memory Match Challenge

A dynamic, 100% pure canvas memory puzzle game built completely from scratch using the HTML5 `<canvas>` API and native JavaScript. This application completely bypasses the HTML DOM for the user interface, rendering all screens, inputs, animations, and game states programmatically onto a single canvas viewport frame.

**Play the live game here:** [Memory Match Challenge](https://mazen414.github.io/Memory-Match-Canvas/)

---

## 🎮 Project Features
* **Modular Engineering Architecture:** Strictly structured into small, specialized script files under the `js/` directory to maximize code readability and maintainability (each module stays well under the 150-line limit).
* **Pure Canvas State Machine:** The entire game loop (Welcome Screen, Interactive Theme Selection, Rules Popup, Active Gameplay HUD, and the Final Leaderboard) is driven programmatically without any reliance on HTML interface elements.
* **Progressive Game Mechanics:** Features 6 scaling levels of difficulty where grid sizing expands dynamically and base level timers progressively shorten to increase the challenge.
* **Persistent Browser High-Scores:** Saves and sorts the top 10 player records directly inside the browser's `localStorage` array.

---

## ⚙️ Technical Computer Graphics Implementations

This project focuses heavily on low-level rendering pipelines, geometric coordinate space checking, and affine math transformations:

* **Affine 2D/3D Rotations:** Discards standard CSS keyframe transitions. Card flipping animations are computed mathematically on a 2D viewport plane using translation matrices and coordinate axis scaling (`ctx.translate`, `ctx.scale`) bound to a trigonometric cosine easing function ($Math.cos$).
* **Spatial Bounding-Box Collision:** User interactions are managed without standard HTML form elements or button event bindings. Input captures (such as typing player names into a canvas text box buffer) and click events are verified by mapping screen coordinate vectors $(X, Y)$ against programmatic bounding boxes.
* **Dynamic Matrix Layout:** Grid dimensions adapt dynamically based on active gameplay tier configurations, repositioning array indices into a clean, uniform multi-column grid context.

---

## 📂 Codebase Structure

```text
├── index.html             # Clean entry point hosting only the target canvas tag
├── arel_logo.jpeg         # Istanbul Arel University branding asset
├── README.md              # Documentation file
└── js/
    ├── data.js            # Configuration parameters and game state tracking flags
    ├── id-generator.js    # Unique custom identity hash calculation utility
    ├── shuffle-engine.js  # Array randomizer using the Fisher-Yates algorithm
    ├── ui-regions.js      # Bounding boxes mapping target button coordinate spaces
    ├── canvas-renderer.js # Class module executing pure pixel painting layers
    ├── game-state.js      # Core engine loop managing timer updates and matching logic
    └── main.js            # Core wrapper initializing events and frame cycles