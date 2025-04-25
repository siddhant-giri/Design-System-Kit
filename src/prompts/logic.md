Create a Figma plugin for UX designers called "Design Starter Kit" with the following functionality:

1. **Color Palette Generator:**
   - Allow the user to input a mood, keyword, or brand adjective (e.g., "calm", "luxury", "playful").
   - Use a predefined or AI-generated color palette based on the input.
   - Generate 5–7 color swatches.
   - Automatically create Figma color styles with appropriate naming (e.g., Primary/100, Secondary/500).

2. **Text Generator:**
   - Accept inputs like the type of screen (e.g., onboarding, dashboard, empty state).
   - Generate sample UX microcopy and headlines using GPT (or similar), tailored to the screen type.
   - Create text styles like Headline/Large, Body/Medium, Caption/Small in Figma.

3. **Documentation Generator:**
   - Generate a clean, organized documentation page in Figma.
   - Include sections like:
     - Color Palette Overview (with hex codes and style names)
     - Typography Guidelines (sample text with applied styles)
     - Sample Copy (with text type labeled clearly)
   - Auto-place all documentation inside a new Figma frame named "🧾 Project Design Docs".

4. **UX Notes:**
   - Include brief UX reasoning under each section (e.g., why the color was chosen for the mood, or why the font suits the purpose).

Ensure the plugin has:
- A user-friendly UI within Figma
- Buttons for “Generate Colors”, “Generate Text”, and “Create Documentation”
- Modular and clean code structure using TypeScript
- Comments throughout the code for easy developer handoff

The goal is to help UX Designers quickly set up a project’s foundation with meaningful colors, text, and documentation.

Also, generate a `README` inside the codebase and an inline guide visible in Figma when the plugin runs for the first time.
