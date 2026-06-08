
# 🗺️ Amsterdam Adventure Map

**Turn the beautiful streets of Amsterdam into a real-life playground!** Tired of staring at screens while walking past 17th-century canal houses? **Amsterdam Adventure Map** is a "Screen-to-Street" app designed to push young explorers *off* the device and into the physical world. It’s an interactive scavenger hunt, a learning tool, and a digital journal all rolled into one. 

No servers. No tracking. Just pure exploration. 🧭

---

## 🎒 What's in the Backpack? (Features)

This application is designed with two distinct modes to keep the adventure engaging for all ages:
* **🌟 Junior Mode (Ages 5–8):** Focuses on sensory discovery, nature observation, color recognition, and getting active.
* **🕵️ Senior Mode (Ages 9–12):** Challenges older kids with logic puzzles, history, architecture, and market economics.

### Core Systems
* **25 Offline Missions:** From counting bakfietsen to estimating the height of industrial cranes, missions dynamically filter based on age and unlocked regions.
* **Skill Progression:** Explorers level up in 7 distinct skill trees, including *Detective*, *Creator*, *Language*, and *Active* exploration.
* **Local Discovery Journal:** Kids take photos to prove they completed a mission. The app uses a hidden canvas to compress images so they fit perfectly on-screen.
* **The Parent Gate:** A secret, math-protected dashboard for parents to add custom missions, change difficulty, and set gentle screen-time reminders.

---

## 🛡️ The "Parent Guild" Promise (Privacy First)

We built this for kids, which means safety is the ultimate priority. This app relies entirely on **local data architecture**:

* **Zero Tracking:** No analytics, no cookies, no GPS tracking.
* **No Cloud Storage:** Every photo, mission, and badge is saved directly on the phone or tablet's local storage. If you drop the device in a canal, the data sleeps with the fishes. 🐟
* **Screen-Time Nudges:** The app gently reminds explorers when they've been staring at the screen for too long, encouraging them to look back up at the real world.

---

## 🚀 How to Start the Expedition

This app is a **Progressive Web App (PWA)**, meaning you don't need an App Store to install it. 

### The Quick Way (PWA)
1. Open the live link on your iPhone, iPad, or Android device.
2. Tap the **Share** button (iOS) or **Menu** button (Android).
3. Select **"Add to Home Screen"**.
4. The browser UI disappears, and you have a full-screen, offline-ready native app.

### The Developer Way (Native App via Capacitor)
Want to wrap this into a real iOS/Android app? It's fully prepped for **Ionic Capacitor**:
```bash
# 1. Initialize your project
mkdir amsterdam-adventure && cd amsterdam-adventure
npm init -y

# 2. Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/preferences
npx cap init "Amsterdam Adventure" com.yourdomain.amsterdam --web-dir www

# 3. Move the code
mkdir -p www
# Copy the index.html, sw.js, and manifest.json into the /www folder!

# 4. Build for iOS
npx cap add ios
npx cap sync ios
npx cap open ios
(Don't forget to add the NSCameraUsageDescription permission to your Info.plist to allow the in-app camera to work!)

🚲 Ready to explore?
Grab your coat, watch out for the trams, and let's go discover Amsterdam!

Created with ❤️ for the little explorers of North Holland.
