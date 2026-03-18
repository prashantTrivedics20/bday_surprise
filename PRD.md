# PRD — Birthday Surprise Web App

## Overview
Single-page static web app to present a personalized birthday surprise: slideshow, music, reveal animation.

## Goals
- Lightweight, offline-capable (static files).
- Easy customization of photos, text, and music.
- Mobile-first and accessible.

## Core Features
- Photo slideshow with prev/next controls.
- Play/Pause background music.
- "Reveal Surprise" triggers animation (hearts/confetti) and message change.
- Responsive layout, no external libraries.

## Acceptance Criteria
- Assets present at assets/photo1..photo5.jpg and assets/song.mp3.
- Play/Pause toggles audio and updates button label.
- Prev/Next navigate slides and wrap.
- Reveal triggers visible animation and message change.

## Customization
- assets/ — photos and song
- index.html — greeting and subtext
- styles.css, script.js — tweak behavior and animations

## Notes
- Keep total page size small; ensure proper licensing for shared media.