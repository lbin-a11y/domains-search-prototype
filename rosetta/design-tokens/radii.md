# Border Radius design tokens

## Overview

Border radius tokens define the corner rounding for UI elements. Rosetta's design philosophy emphasizes **subtle rounding** to create a modern, refined aesthetic without being overly rounded.

IMPORTANT: Do not apply border radii to Rosetta components if they do not already have them.

## Usage Guidelines by Context

### Large Surfaces (Dialogs, Drawers)

Use subtle rounding to soften edges without being distracting.

Recommended: Custom 11px for very large surfaces

### Containers (Cards, Sections, Panels)

Use gentle rounding to provide visual definition.

Recommended: Custom 6px for containers or sections

### Components (Buttons, Inputs, Controls)

IMPORTANT: Use default radii in any Rosetta component - if it has no radius, do not apply it. Only apply border radii if specifically asked as an override. If asked to provide border radius, apply custom 2px-3px border radii only if absolutely necessary.

### Intentional Full Rounding

Some components are designed to be fully rounded as part of their visual identity like Badge or Chip.