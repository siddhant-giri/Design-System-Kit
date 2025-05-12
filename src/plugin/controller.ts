figma.showUI(__html__, { width: 360, height: 500 });

// Add these variables to track generation counts
let colorVariationCount = 0;
let textVariationCount = 0;

// Sample color palettes - create multiple variations
const colorPaletteVariations = [
  // First variation
  {
    primary: [
      { name: 'Primary/100', color: { r: 0.07, g: 0.63, b: 0.98 } }, // #18A0FB
      { name: 'Primary/80', color: { r: 0.29, g: 0.72, b: 0.98 } },
      { name: 'Primary/60', color: { r: 0.51, g: 0.81, b: 0.99 } },
      { name: 'Primary/40', color: { r: 0.73, g: 0.9, b: 0.99 } },
      { name: 'Primary/20', color: { r: 0.95, g: 0.99, b: 1 } }
    ],
    neutral: [
      { name: 'Neutral/100', color: { r: 0.2, g: 0.2, b: 0.2 } },
      { name: 'Neutral/90', color: { r: 0.3, g: 0.3, b: 0.3 } },
      { name: 'Neutral/80', color: { r: 0.4, g: 0.4, b: 0.4 } },
      { name: 'Neutral/70', color: { r: 0.5, g: 0.5, b: 0.5 } },
      { name: 'Neutral/60', color: { r: 0.6, g: 0.6, b: 0.6 } },
      { name: 'Neutral/50', color: { r: 0.7, g: 0.7, b: 0.7 } },
      { name: 'Neutral/40', color: { r: 0.8, g: 0.8, b: 0.8 } },
      { name: 'Neutral/30', color: { r: 0.85, g: 0.85, b: 0.85 } },
      { name: 'Neutral/20', color: { r: 0.9, g: 0.9, b: 0.9 } },
      { name: 'Neutral/10', color: { r: 0.95, g: 0.95, b: 0.95 } }
    ],
    accent: [
      { name: 'Success', color: { r: 0.13, g: 0.71, b: 0.1 } },
      { name: 'Warning', color: { r: 1, g: 0.8, b: 0 } },
      { name: 'Error', color: { r: 0.9, g: 0.12, b: 0.12 } },
      { name: 'Info', color: { r: 0.11, g: 0.55, b: 0.9 } }
    ]
  },
  // Second variation
  {
    primary: [
      { name: 'Primary/100', color: { r: 0.4, g: 0.2, b: 0.8 } }, // Purple
      { name: 'Primary/80', color: { r: 0.55, g: 0.4, b: 0.85 } },
      { name: 'Primary/60', color: { r: 0.7, g: 0.6, b: 0.9 } },
      { name: 'Primary/40', color: { r: 0.85, g: 0.8, b: 0.95 } },
      { name: 'Primary/20', color: { r: 0.95, g: 0.9, b: 1 } }
    ],
    neutral: [
      { name: 'Neutral/100', color: { r: 0.15, g: 0.15, b: 0.2 } },
      { name: 'Neutral/90', color: { r: 0.25, g: 0.25, b: 0.3 } },
      { name: 'Neutral/80', color: { r: 0.35, g: 0.35, b: 0.4 } },
      { name: 'Neutral/70', color: { r: 0.45, g: 0.45, b: 0.5 } },
      { name: 'Neutral/60', color: { r: 0.55, g: 0.55, b: 0.6 } },
      { name: 'Neutral/50', color: { r: 0.65, g: 0.65, b: 0.7 } },
      { name: 'Neutral/40', color: { r: 0.75, g: 0.75, b: 0.8 } },
      { name: 'Neutral/30', color: { r: 0.82, g: 0.82, b: 0.87 } },
      { name: 'Neutral/20', color: { r: 0.9, g: 0.9, b: 0.95 } },
      { name: 'Neutral/10', color: { r: 0.95, g: 0.95, b: 0.98 } }
    ],
    accent: [
      { name: 'Success', color: { r: 0.1, g: 0.65, b: 0.45 } },
      { name: 'Warning', color: { r: 0.95, g: 0.65, b: 0.2 } },
      { name: 'Error', color: { r: 0.85, g: 0.15, b: 0.3 } },
      { name: 'Info', color: { r: 0.2, g: 0.5, b: 0.8 } }
    ]
  },
  // Third variation
  {
    primary: [
      { name: 'Primary/100', color: { r: 0.0, g: 0.7, b: 0.6 } }, // Teal
      { name: 'Primary/80', color: { r: 0.2, g: 0.8, b: 0.7 } },
      { name: 'Primary/60', color: { r: 0.4, g: 0.9, b: 0.8 } },
      { name: 'Primary/40', color: { r: 0.7, g: 0.95, b: 0.9 } },
      { name: 'Primary/20', color: { r: 0.9, g: 1, b: 0.95 } }
    ],
    neutral: [
      { name: 'Neutral/100', color: { r: 0.25, g: 0.25, b: 0.25 } },
      { name: 'Neutral/90', color: { r: 0.35, g: 0.35, b: 0.35 } },
      { name: 'Neutral/80', color: { r: 0.45, g: 0.45, b: 0.45 } },
      { name: 'Neutral/70', color: { r: 0.55, g: 0.55, b: 0.55 } },
      { name: 'Neutral/60', color: { r: 0.65, g: 0.65, b: 0.65 } },
      { name: 'Neutral/50', color: { r: 0.75, g: 0.75, b: 0.75 } },
      { name: 'Neutral/40', color: { r: 0.85, g: 0.85, b: 0.85 } },
      { name: 'Neutral/30', color: { r: 0.9, g: 0.9, b: 0.9 } },
      { name: 'Neutral/20', color: { r: 0.95, g: 0.95, b: 0.95 } },
      { name: 'Neutral/10', color: { r: 0.97, g: 0.97, b: 0.97 } }
    ],
    accent: [
      { name: 'Success', color: { r: 0.0, g: 0.75, b: 0.4 } },
      { name: 'Warning', color: { r: 0.9, g: 0.7, b: 0.1 } },
      { name: 'Error', color: { r: 0.95, g: 0.2, b: 0.2 } },
      { name: 'Info', color: { r: 0.0, g: 0.6, b: 0.8 } }
    ]
  }
];

// Sample text styles - create multiple variations
const textStyleVariations = [
  // First variation
  [
    { name: 'Heading/H1', fontSize: 32, fontWeight: 700, lineHeight: { value: 40, unit: 'PIXELS' as const } },
    { name: 'Heading/H2', fontSize: 28, fontWeight: 700, lineHeight: { value: 36, unit: 'PIXELS' as const } },
    { name: 'Heading/H3', fontSize: 24, fontWeight: 600, lineHeight: { value: 32, unit: 'PIXELS' as const } },
    { name: 'Heading/H4', fontSize: 20, fontWeight: 600, lineHeight: { value: 28, unit: 'PIXELS' as const } },
    { name: 'Heading/H5', fontSize: 18, fontWeight: 600, lineHeight: { value: 26, unit: 'PIXELS' as const } },
    { name: 'Heading/H6', fontSize: 16, fontWeight: 600, lineHeight: { value: 24, unit: 'PIXELS' as const } },
    { name: 'Body/Regular', fontSize: 16, fontWeight: 400, lineHeight: { value: 24, unit: 'PIXELS' as const } },
    { name: 'Body/Small', fontSize: 14, fontWeight: 400, lineHeight: { value: 20, unit: 'PIXELS' as const } },
    { name: 'Caption', fontSize: 12, fontWeight: 400, lineHeight: { value: 16, unit: 'PIXELS' as const } }
  ],
  // Second variation
  [
    { name: 'Heading/H1', fontSize: 36, fontWeight: 800, lineHeight: { value: 44, unit: 'PIXELS' as const } },
    { name: 'Heading/H2', fontSize: 32, fontWeight: 700, lineHeight: { value: 40, unit: 'PIXELS' as const } },
    { name: 'Heading/H3', fontSize: 28, fontWeight: 700, lineHeight: { value: 36, unit: 'PIXELS' as const } },
    { name: 'Heading/H4', fontSize: 24, fontWeight: 600, lineHeight: { value: 32, unit: 'PIXELS' as const } },
    { name: 'Heading/H5', fontSize: 20, fontWeight: 600, lineHeight: { value: 28, unit: 'PIXELS' as const } },
    { name: 'Heading/H6', fontSize: 18, fontWeight: 600, lineHeight: { value: 26, unit: 'PIXELS' as const } },
    { name: 'Body/Regular', fontSize: 16, fontWeight: 400, lineHeight: { value: 24, unit: 'PIXELS' as const } },
    { name: 'Body/Small', fontSize: 14, fontWeight: 400, lineHeight: { value: 20, unit: 'PIXELS' as const } },
    { name: 'Caption', fontSize: 12, fontWeight: 300, lineHeight: { value: 16, unit: 'PIXELS' as const } }
  ],
  // Third variation
  [
    { name: 'Heading/H1', fontSize: 40, fontWeight: 700, lineHeight: { value: 48, unit: 'PIXELS' as const } },
    { name: 'Heading/H2', fontSize: 36, fontWeight: 700, lineHeight: { value: 44, unit: 'PIXELS' as const } },
    { name: 'Heading/H3', fontSize: 32, fontWeight: 600, lineHeight: { value: 40, unit: 'PIXELS' as const } },
    { name: 'Heading/H4', fontSize: 28, fontWeight: 600, lineHeight: { value: 36, unit: 'PIXELS' as const } },
    { name: 'Heading/H5', fontSize: 24, fontWeight: 600, lineHeight: { value: 32, unit: 'PIXELS' as const } },
    { name: 'Heading/H6', fontSize: 20, fontWeight: 600, lineHeight: { value: 28, unit: 'PIXELS' as const } },
    { name: 'Body/Regular', fontSize: 18, fontWeight: 400, lineHeight: { value: 28, unit: 'PIXELS' as const } },
    { name: 'Body/Small', fontSize: 16, fontWeight: 400, lineHeight: { value: 24, unit: 'PIXELS' as const } },
    { name: 'Caption', fontSize: 14, fontWeight: 400, lineHeight: { value: 20, unit: 'PIXELS' as const } }
  ]
];

// Add this function to generate both styles at once
async function generateStyles() {
  // Get the current variations and increment counters for next time
  const currentColorVariation = colorPaletteVariations[colorVariationCount % colorPaletteVariations.length];
  const currentTextVariation = textStyleVariations[textVariationCount % textStyleVariations.length];
  
  colorVariationCount++;
  textVariationCount++;
  
  // Convert colors to a format suitable for the UI
  const uiColors = Object.entries(currentColorVariation).map(([category, colors]) => {
    return {
      category,
      colors: colors.map(c => ({
        name: c.name,
        hex: rgbToHex(c.color.r, c.color.g, c.color.b)
      }))
    };
  });
  
  // Convert text styles to a format suitable for the UI
  const uiTextStyles = currentTextVariation.map(style => ({
    name: style.name,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    lineHeight: style.lineHeight.value
  }));
  
  // Send both styles to UI for preview
  figma.ui.postMessage({ 
    type: 'styles-generated', 
    colors: uiColors,
    textStyles: uiTextStyles,
    colorVariation: colorVariationCount,
    textVariation: textVariationCount
  });
}

// Helper function to apply color styles
function applyColorStyles(customColors) {
  if (!customColors) return;
  
  // Create color styles for primary colors
  if (customColors.primary) {
    const primaryColor = hexToRgb(customColors.primary);
    
    // Create primary color variations
    const primaryVariations = [
      { name: 'Primary/100', color: primaryColor },
      { name: 'Primary/80', color: lighten(primaryColor, 0.2) },
      { name: 'Primary/60', color: lighten(primaryColor, 0.4) },
      { name: 'Primary/40', color: lighten(primaryColor, 0.6) },
      { name: 'Primary/20', color: lighten(primaryColor, 0.8) }
    ];
    
    // Create styles for each variation
    for (const variation of primaryVariations) {
      try {
        const style = figma.createPaintStyle();
        style.name = variation.name;
        style.paints = [{ type: 'SOLID', color: variation.color }];
      } catch (err) {
        console.log(`Could not create style for ${variation.name}: ${err}`);
      }
    }
  }
  
  // Create color styles for neutral colors
  if (customColors.neutral) {
    const neutralColor = hexToRgb(customColors.neutral);
    
    // Create neutral color variations
    const neutralVariations = [
      { name: 'Neutral/100', color: neutralColor },
      { name: 'Neutral/90', color: lighten(neutralColor, 0.1) },
      { name: 'Neutral/80', color: lighten(neutralColor, 0.2) },
      { name: 'Neutral/70', color: lighten(neutralColor, 0.3) },
      { name: 'Neutral/60', color: lighten(neutralColor, 0.4) },
      { name: 'Neutral/50', color: lighten(neutralColor, 0.5) },
      { name: 'Neutral/40', color: lighten(neutralColor, 0.6) },
      { name: 'Neutral/30', color: lighten(neutralColor, 0.7) },
      { name: 'Neutral/20', color: lighten(neutralColor, 0.8) },
      { name: 'Neutral/10', color: lighten(neutralColor, 0.9) }
    ];
    
    // Create styles for each variation
    for (const variation of neutralVariations) {
      try {
        const style = figma.createPaintStyle();
        style.name = variation.name;
        style.paints = [{ type: 'SOLID', color: variation.color }];
      } catch (err) {
        console.log(`Could not create style for ${variation.name}: ${err}`);
      }
    }
  }
  
  // Create semantic color styles
  const semanticColors = [
    { name: 'Semantic/Success', color: hexToRgb(customColors.success) },
    { name: 'Semantic/Warning', color: hexToRgb(customColors.warning) },
    { name: 'Semantic/Error', color: hexToRgb(customColors.error) },
    { name: 'Semantic/Info', color: hexToRgb(customColors.info) }
  ];
  
  // Create styles for each semantic color
  for (const color of semanticColors) {
    try {
      const style = figma.createPaintStyle();
      style.name = color.name;
      style.paints = [{ type: 'SOLID', color: color.color }];
    } catch (err) {
      console.log(`Could not create style for ${color.name}: ${err}`);
    }
  }
}

// Helper function to apply shadow styles
function applyShadowStyles(shadows) {
  if (!shadows || !shadows.length) return;
  
  for (const shadow of shadows) {
    try {
      // Create an effect style
      const effectStyle = figma.createEffectStyle();
      effectStyle.name = `Shadow/${shadow.name}`;
      
      // Create the shadow effect
      const shadowEffect: DropShadowEffect = {
        type: "DROP_SHADOW" as const,
        color: { 
          r: 0, 
          g: 0, 
          b: 0, 
          a: parseFloat(shadow.color.split(',')[3]) || 0.2 
        },
        offset: { 
          x: shadow.x || 0, 
          y: shadow.y || 4 
        },
        radius: shadow.blur || 8,
        spread: shadow.spread || 0,
        visible: true,
        blendMode: "NORMAL" as const
      };
      
      effectStyle.effects = [shadowEffect];
    } catch (err) {
      console.log(`Could not create shadow style for ${shadow.name}: ${err}`);
    }
  }
}

// Helper function to apply spacing tokens
function applySpacingTokens(spacingTokens) {
  if (!spacingTokens || !spacingTokens.length) return;
  
  // Currently Figma doesn't have a direct API for spacing tokens
  // We can create a documentation frame instead
  console.log('Applied spacing tokens:', spacingTokens);
}

// Helper function to apply sizing tokens
function applySizingTokens(sizingTokens) {
  if (!sizingTokens || !sizingTokens.length) return;
  
  // Currently Figma doesn't have a direct API for sizing tokens
  // We can create a documentation frame instead
  console.log('Applied sizing tokens:', sizingTokens);
}

// Helper function to apply text styles
function applyTextStyles(textStyles) {
  if (!textStyles) return;
  
  // Load the Inter font first
  figma.loadFontAsync({ family: "Inter", style: "Regular" })
    .then(() => figma.loadFontAsync({ family: "Inter", style: "Medium" }))
    .then(() => figma.loadFontAsync({ family: "Inter", style: "Bold" }))
    .then(() => {
    // Create text styles
      const styles = [
        { name: 'Heading/H1', fontSize: 32, fontWeight: 700, lineHeight: { value: 40, unit: 'PIXELS' as const } },
        { name: 'Heading/H2', fontSize: 28, fontWeight: 700, lineHeight: { value: 36, unit: 'PIXELS' as const } },
        { name: 'Heading/H3', fontSize: 24, fontWeight: 600, lineHeight: { value: 32, unit: 'PIXELS' as const } },
        { name: 'Heading/H4', fontSize: 20, fontWeight: 600, lineHeight: { value: 28, unit: 'PIXELS' as const } },
        { name: 'Heading/H5', fontSize: 18, fontWeight: 600, lineHeight: { value: 26, unit: 'PIXELS' as const } },
        { name: 'Heading/H6', fontSize: 16, fontWeight: 600, lineHeight: { value: 24, unit: 'PIXELS' as const } },
        { name: 'Body/Regular', fontSize: 16, fontWeight: 400, lineHeight: { value: 24, unit: 'PIXELS' as const } },
        { name: 'Body/Small', fontSize: 14, fontWeight: 400, lineHeight: { value: 20, unit: 'PIXELS' as const } },
        { name: 'Caption', fontSize: 12, fontWeight: 400, lineHeight: { value: 16, unit: 'PIXELS' as const } }
      ];
      
      for (const style of styles) {
        try {
          const textStyle = figma.createTextStyle();
          textStyle.name = style.name;
          textStyle.fontSize = style.fontSize;
          textStyle.lineHeight = style.lineHeight;
          textStyle.fontName = { 
            family: 'Inter', 
            style: style.fontWeight >= 700 ? 'Bold' : style.fontWeight >= 500 ? 'Medium' : 'Regular' 
          };
        } catch (err) {
          console.log(`Could not create text style for ${style.name}: ${err}`);
        }
      }
    })
    .catch(err => {
      console.log(`Could not load fonts: ${err}`);
    });
}

// Add this function to create spacing variables in Figma
function createSpacingVariables(spacingTokens) {
  // Check if the collection already exists
  let spacingCollection = figma.variables.getLocalVariableCollections()
    .find(collection => collection.name === 'Spacing');
  
  // Create the collection if it doesn't exist
  if (!spacingCollection) {
    spacingCollection = figma.variables.createVariableCollection('Spacing');
  }
  
  // Get the default mode ID
  const modeId = spacingCollection.modes[0].modeId;
  
  // Create variables for each spacing token
  spacingTokens.forEach(token => {
    // Check if variable already exists
    let variable = figma.variables.getLocalVariables()
      .find(v => v.name === token.name && v.variableCollectionId === spacingCollection.id);
    
    // Create the variable if it doesn't exist
    if (!variable) {
      variable = figma.variables.createVariable(
        token.name, 
        spacingCollection.id, 
        'FLOAT'
      );
    }
    
    // Set the value
    variable.setValueForMode(modeId, token.value);
  });
  
  return spacingCollection;
}

// Update the applyStyles function to handle undefined values
function applyStyles(customColors, shadows, spacingTokens, gridTokens, sizingTokens, textStyles) {
  try {
    // Create color styles if provided
    if (customColors) {
      applyColorStyles(customColors);
    }
    
    // Create shadow styles if provided
    if (shadows) {
      applyShadowStyles(shadows);
    }
    
    // Create spacing variables if provided
    if (spacingTokens) {
      createSpacingVariables(spacingTokens);
    }
    
    // Apply grid tokens if they exist
    if (gridTokens) {
      applyGridTokens(gridTokens);
    }
    
    // Apply sizing tokens if they exist
    if (sizingTokens) {
      applySizingTokens(sizingTokens);
    }
    
    // Create text styles with proper font family and weight
    if (textStyles && Array.isArray(textStyles) && textStyles.length > 0) {
      // Create text styles
      textStyles.forEach(async (style) => {
        try {
          // Check if style already exists
          const existingStyle = figma.getLocalTextStyles().find(s => s.name === style.name);
          const textStyle = existingStyle || figma.createTextStyle();
          
          // Set style name
          textStyle.name = style.name;
          
          // Load font
          await figma.loadFontAsync({ 
            family: style.fontFamily || 'Inter', 
            style: getFontStyle(style.fontWeight) 
          });
          
          // Set text properties
          textStyle.fontSize = style.fontSize;
          textStyle.lineHeight = style.lineHeight;
          
          if (style.letterSpacing !== undefined) {
            textStyle.letterSpacing = { 
              value: style.letterSpacing, 
              unit: 'PIXELS' 
            };
          }
          
          // Set font weight
          if (style.fontWeight) {
            // Map font weight to font style
            const fontStyle = getFontStyle(style.fontWeight);
            textStyle.fontName = { 
              family: style.fontFamily || 'Inter', 
              style: fontStyle 
            };
          }
        } catch (error) {
          console.error('Error creating text style:', error);
        }
      });
    }
    
    // Notify UI that styles were applied
    figma.ui.postMessage({
      type: 'styles-applied',
      message: 'Styles applied successfully!'
    });
  } catch (error) {
    console.error('Error applying styles:', error);
    throw error;
  }
}

// Helper function to map font weight to font style
function getFontStyle(weight) {
  if (!weight) return 'Regular';
  
  // Map common weights to style names
  switch (weight) {
    case 100: return 'Thin';
    case 200: return 'Extra Light';
    case 300: return 'Light';
    case 400: return 'Regular';
    case 500: return 'Medium';
    case 600: return 'Semi Bold';
    case 700: return 'Bold';
    case 800: return 'Extra Bold';
    case 900: return 'Black';
    default: return 'Regular';
  }
}

// Fix the applyGridTokens function by removing the invalid sectionSize property
function applyGridTokens(gridTokens) {
  if (!gridTokens || !gridTokens.length) return;
  
  // Apply grid tokens logic
  for (const grid of gridTokens) {
    try {
      const gridStyle = figma.createGridStyle();
      gridStyle.name = `Grid/${grid.name}`;
      gridStyle.layoutGrids = [{
        pattern: 'COLUMNS',
        alignment: 'STRETCH',
        gutterSize: grid.gutter,
        count: grid.columns,
        offset: grid.margin
      }];
    } catch (err) {
      console.log(`Could not create grid style: ${err}`);
    }
  }
  
  // Notify the UI that grid styles were applied
  figma.ui.postMessage({
    type: 'grid-styles-applied'
  });
}

// Fix the createColorPalette helper function to handle undefined values
function createColorPalette(title, colors, x, y) {
  const paletteFrame = figma.createFrame();
  paletteFrame.name = `${title} Colors`;
  paletteFrame.resize(1000, 120);
  paletteFrame.x = x;
  paletteFrame.y = y;
  paletteFrame.fills = [];
  
  // Add title
  const paletteTitle = figma.createText();
  paletteTitle.characters = title;
  paletteTitle.fontSize = 18;
  paletteTitle.fontName = { family: "Inter", style: "Medium" };
  paletteTitle.x = 0;
  paletteTitle.y = 0;
  paletteFrame.appendChild(paletteTitle);
  
  // Add color swatches
  const swatchWidth = 80;
  const swatchHeight = 80;
  const gap = 16;
  
  colors.forEach((color, index) => {
    // Create color swatch
    const swatch = figma.createRectangle();
    swatch.resize(swatchWidth, swatchHeight);
    swatch.x = index * (swatchWidth + gap);
    swatch.y = 40;
    swatch.fills = [{ type: 'SOLID', color: color.color }];
    swatch.cornerRadius = 8;
    
    paletteFrame.appendChild(swatch);
    
    // Add color name
    const colorName = figma.createText();
    colorName.characters = color.name;
    colorName.fontSize = 12;
    colorName.fontName = { family: "Inter", style: "Medium" };
    
    // Calculate position after text is created to get accurate width
    colorName.x = index * (swatchWidth + gap);
    colorName.y = swatch.y + swatchHeight + 8;
    paletteFrame.appendChild(colorName);
  });
  
  return paletteFrame;
}

// Fix the createDocumentation function to handle errors more gracefully
function createDocumentation(customColors, shadows, spacingTokens, gridTokens, textStyles) {
  try {
    // Load required fonts first
    figma.loadFontAsync({ family: "Inter", style: "Regular" })
      .then(() => figma.loadFontAsync({ family: "Inter", style: "Medium" }))
      .then(() => figma.loadFontAsync({ family: "Inter", style: "Bold" }))
      .then(() => {
        // Create a new page for documentation
        const documentationPage = figma.createPage();
        documentationPage.name = "Design System Documentation";
        figma.currentPage = documentationPage;
        
        // Create a frame to hold all documentation
        const mainFrame = figma.createFrame();
        mainFrame.name = "Design System Documentation";
        mainFrame.resize(1200, 3000); // Make it large enough initially
        mainFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        
        // Add a header section with background
        const headerSection = figma.createFrame();
        headerSection.name = "Header";
        headerSection.resize(1200, 160);
        
        // Safely get primary color or use a default
        const primaryColor = customColors && customColors.primary 
          ? hexToRgb(customColors.primary) 
          : { r: 0.07, g: 0.63, b: 0.98 }; // Default blue
        
        headerSection.fills = [{ type: 'SOLID', color: primaryColor }];
        headerSection.x = 0;
        headerSection.y = 0;
        mainFrame.appendChild(headerSection);
        
        // Add title
    const title = figma.createText();
    title.characters = "Design System";
        title.fontSize = 48;
        title.fontName = { family: "Inter", style: "Bold" };
        title.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        title.x = 60;
    title.y = 60;
        headerSection.appendChild(title);
    
        // Add subtitle
    const subtitle = figma.createText();
        subtitle.characters = "Complete documentation of all design tokens";
        subtitle.fontSize = 18;
    subtitle.fontName = { family: "Inter", style: "Regular" };
        subtitle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        subtitle.x = 60;
        subtitle.y = 120;
        headerSection.appendChild(subtitle);
        
        let yOffset = 200;
        
        // Add color section if customColors exist
        if (customColors) {
          try {
            const colorSection = figma.createFrame();
            colorSection.name = "Colors";
            colorSection.resize(1080, 600);
            colorSection.x = 60;
            colorSection.y = yOffset;
            colorSection.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
            colorSection.cornerRadius = 12;
            mainFrame.appendChild(colorSection);
    
    // Add color section title
    const colorTitle = figma.createText();
    colorTitle.characters = "Color Palette";
            colorTitle.fontSize = 32;
            colorTitle.fontName = { family: "Inter", style: "Bold" };
            colorTitle.x = 40;
            colorTitle.y = 40;
            colorSection.appendChild(colorTitle);
            
            // Create primary color palette if primary color exists
            if (customColors.primary) {
              const primaryColors = [
                { name: "100", color: hexToRgb(customColors.primary) },
                { name: "80", color: lighten(hexToRgb(customColors.primary), 0.2) },
                { name: "60", color: lighten(hexToRgb(customColors.primary), 0.4) },
                { name: "40", color: lighten(hexToRgb(customColors.primary), 0.6) },
                { name: "20", color: lighten(hexToRgb(customColors.primary), 0.8) }
              ];
              
              const primaryPalette = createColorPalette("Primary", primaryColors, 40, 100);
              colorSection.appendChild(primaryPalette);
            }
            
            // Create neutral color palette if neutral color exists
            if (customColors.neutral) {
              const neutralColors = [
                { name: "100", color: hexToRgb(customColors.neutral) },
                { name: "90", color: lighten(hexToRgb(customColors.neutral), 0.1) },
                { name: "80", color: lighten(hexToRgb(customColors.neutral), 0.2) },
                { name: "70", color: lighten(hexToRgb(customColors.neutral), 0.3) },
                { name: "60", color: lighten(hexToRgb(customColors.neutral), 0.4) },
                { name: "50", color: lighten(hexToRgb(customColors.neutral), 0.5) },
                { name: "40", color: lighten(hexToRgb(customColors.neutral), 0.6) },
                { name: "30", color: lighten(hexToRgb(customColors.neutral), 0.7) },
                { name: "20", color: lighten(hexToRgb(customColors.neutral), 0.8) },
                { name: "10", color: lighten(hexToRgb(customColors.neutral), 0.9) }
              ];
              
              const neutralPalette = createColorPalette("Neutral", neutralColors, 40, 240);
              colorSection.appendChild(neutralPalette);
            }
            
            // Create semantic colors if they exist
            const semanticColors = [];
            
            if (customColors.success) {
              semanticColors.push({ name: "Success", color: hexToRgb(customColors.success) });
            }
            
            if (customColors.warning) {
              semanticColors.push({ name: "Warning", color: hexToRgb(customColors.warning) });
            }
            
            if (customColors.error) {
              semanticColors.push({ name: "Error", color: hexToRgb(customColors.error) });
            }
            
            if (customColors.info) {
              semanticColors.push({ name: "Info", color: hexToRgb(customColors.info) });
            }
            
            if (semanticColors.length > 0) {
              const semanticPalette = createColorPalette("Semantic", semanticColors, 40, 380);
              colorSection.appendChild(semanticPalette);
            }
            
            yOffset += 640;
          } catch (error) {
            console.error("Error creating color section:", error);
          }
        }
        
        // Add typography section if textStyles exist
        if (textStyles && textStyles.length > 0) {
          try {
            const typographySection = figma.createFrame();
            typographySection.name = "Typography";
            typographySection.resize(1080, 500);
            typographySection.x = 60;
            typographySection.y = yOffset;
            typographySection.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
            typographySection.cornerRadius = 12;
            mainFrame.appendChild(typographySection);
            
            // Add typography section title
            const typographyTitle = figma.createText();
            typographyTitle.characters = "Typography";
            typographyTitle.fontSize = 32;
            typographyTitle.fontName = { family: "Inter", style: "Bold" };
            typographyTitle.x = 40;
            typographyTitle.y = 40;
            typographySection.appendChild(typographyTitle);
            
            // Create typography examples
            let textYOffset = 120;
            
            for (const style of textStyles) {
              // Skip if required properties are missing
              if (!style.name || !style.fontSize || !style.lineHeight) continue;
              
              const textExample = figma.createText();
              textExample.characters = style.name;
              textExample.fontSize = style.fontSize;
              textExample.fontName = { 
                family: 'Inter', 
                style: style.fontWeight >= 700 ? 'Bold' : style.fontWeight >= 500 ? 'Medium' : 'Regular' 
              };
              
              // Safely set line height
              if (style.lineHeight && typeof style.lineHeight.value === 'number') {
                textExample.lineHeight = style.lineHeight;
              }
              
              textExample.x = 40;
              textExample.y = textYOffset;
              typographySection.appendChild(textExample);
              
              // Add style specs
              const styleSpecs = figma.createText();
              styleSpecs.characters = `${style.fontSize}px / ${style.lineHeight?.value || style.fontSize * 1.5}px`;
              styleSpecs.fontSize = 12;
              styleSpecs.fontName = { family: "Inter", style: "Regular" };
              styleSpecs.x = 400;
              styleSpecs.y = textYOffset + (style.fontSize - 12) / 2;
              typographySection.appendChild(styleSpecs);
              
              textYOffset += style.fontSize + 24;
            }
            
            yOffset += 540;
          } catch (error) {
            console.error("Error creating typography section:", error);
          }
        }
        
        // Add shadow section if shadows exist
        if (shadows && shadows.length > 0) {
          try {
            const shadowSection = figma.createFrame();
            shadowSection.name = "Shadows";
            shadowSection.resize(1080, 300);
            shadowSection.x = 60;
            shadowSection.y = yOffset;
            shadowSection.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
            shadowSection.cornerRadius = 12;
            mainFrame.appendChild(shadowSection);
            
            // Add shadow section title
            const shadowTitle = figma.createText();
            shadowTitle.characters = "Shadows";
            shadowTitle.fontSize = 32;
            shadowTitle.fontName = { family: "Inter", style: "Bold" };
            shadowTitle.x = 40;
            shadowTitle.y = 40;
            shadowSection.appendChild(shadowTitle);
            
            // Create shadow examples
            let shadowXOffset = 40;
            const shadowYOffset = 120;
            
            for (const shadow of shadows) {
              // Skip if required properties are missing
              if (!shadow.name) continue;
              
              // Create shadow example
              const shadowExample = createShadowExample(shadow);
              
              shadowExample.x = shadowXOffset;
              shadowExample.y = shadowYOffset;
              shadowSection.appendChild(shadowExample);
              
              // Add shadow name
              const shadowLabel = figma.createText();
              shadowLabel.characters = shadow.name;
              shadowLabel.fontSize = 14;
              shadowLabel.fontName = { family: "Inter", style: "Medium" };
              shadowLabel.x = shadowXOffset;
              shadowLabel.y = shadowYOffset + 120;
              shadowLabel.resize(160, shadowLabel.height);
              shadowLabel.textAlignHorizontal = 'CENTER';
              shadowSection.appendChild(shadowLabel);
              
              shadowXOffset += 180;
            }
            
            yOffset += 340;
          } catch (error) {
            console.error("Error creating shadow section:", error);
          }
        }
        
        // Add spacing section if spacingTokens exist
        if (spacingTokens && spacingTokens.length > 0) {
          try {
            const spacingSection = figma.createFrame();
            spacingSection.name = "Spacing";
            spacingSection.resize(1080, 300);
            spacingSection.x = 60;
            spacingSection.y = yOffset;
            spacingSection.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
            spacingSection.cornerRadius = 12;
            mainFrame.appendChild(spacingSection);
            
            // Add spacing section title
            const spacingTitle = figma.createText();
            spacingTitle.characters = "Spacing";
            spacingTitle.fontSize = 32;
            spacingTitle.fontName = { family: "Inter", style: "Bold" };
            spacingTitle.x = 40;
            spacingTitle.y = 40;
            spacingSection.appendChild(spacingTitle);
            
            // Create spacing examples
            let spacingXOffset = 40;
            const spacingYOffset = 120;
            
            for (const spacing of spacingTokens) {
              // Skip if required properties are missing
              if (!spacing.name || typeof spacing.value !== 'number') continue;
              
              // Create spacing example
              const spacingExample = figma.createRectangle();
              spacingExample.resize(spacing.value, 40);
              spacingExample.x = spacingXOffset;
              spacingExample.y = spacingYOffset;
              spacingExample.fills = [{ type: 'SOLID', color: primaryColor }];
              spacingExample.cornerRadius = 4;
              spacingSection.appendChild(spacingExample);
              
              // Add spacing name and value
              const spacingLabel = figma.createText();
              spacingLabel.characters = `${spacing.name} (${spacing.value}px)`;
              spacingLabel.fontSize = 14;
              spacingLabel.fontName = { family: "Inter", style: "Medium" };
              spacingLabel.x = spacingXOffset;
              spacingLabel.y = spacingYOffset + 60;
              spacingSection.appendChild(spacingLabel);
              
              spacingXOffset += spacing.value + 40;
            }
            
            yOffset += 340;
          } catch (error) {
            console.error("Error creating spacing section:", error);
          }
        }
        
        // Add grid section if gridTokens exist
        if (gridTokens && gridTokens.length > 0) {
          try {
            const gridSection = figma.createFrame();
            gridSection.name = "Grids";
            gridSection.resize(1080, 300);
            gridSection.x = 60;
            gridSection.y = yOffset;
            gridSection.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
            gridSection.cornerRadius = 12;
            mainFrame.appendChild(gridSection);
            
            // Add grid section title
            const gridTitle = figma.createText();
            gridTitle.characters = "Layout Grids";
            gridTitle.fontSize = 32;
            gridTitle.fontName = { family: "Inter", style: "Bold" };
            gridTitle.x = 40;
            gridTitle.y = 40;
            gridSection.appendChild(gridTitle);
            
            // Create grid examples
            let gridXOffset = 40;
            const gridYOffset = 120;
            
            for (const grid of gridTokens) {
              // Skip if required properties are missing
              if (!grid.name || typeof grid.columns !== 'number') continue;
              
              // Create grid example
              const gridExample = figma.createFrame();
              gridExample.resize(400, 160);
              gridExample.x = gridXOffset;
              gridExample.y = gridYOffset;
              gridExample.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
              
              // Apply grid
              gridExample.layoutGrids = [{
                pattern: 'COLUMNS',
                alignment: 'STRETCH',
                gutterSize: grid.gutter || 16,
                count: grid.columns,
                offset: grid.margin || 0
              }];
              
              gridSection.appendChild(gridExample);
              
              // Add grid name and specs
              const gridLabel = figma.createText();
              gridLabel.characters = `${grid.name} (${grid.columns} columns, ${grid.gutter || 16}px gutter, ${grid.margin || 0}px margin)`;
              gridLabel.fontSize = 14;
              gridLabel.fontName = { family: "Inter", style: "Medium" };
              gridLabel.x = gridXOffset;
              gridLabel.y = gridYOffset + 180;
              gridSection.appendChild(gridLabel);
              
              gridXOffset += 500;
            }
            
            yOffset += 340;
          } catch (error) {
            console.error("Error creating grid section:", error);
          }
        }
        
        // Resize the main frame to fit all content
        mainFrame.resize(mainFrame.width, yOffset + 40);
        
        // Notify the UI that documentation was created
    figma.ui.postMessage({ 
          type: 'documentation-created',
          message: 'Design system generated successfully!'
        });
        
        // Reset loading state in UI
        figma.ui.postMessage({
          type: 'loading-complete'
        });
      })
      .catch(error => {
        console.error("Error loading fonts:", error);
        figma.ui.postMessage({
          type: 'error',
          message: 'Error loading fonts: ' + error.message
        });
        
        // Reset loading state in UI
        figma.ui.postMessage({
          type: 'loading-complete'
        });
    });
  } catch (error) {
    console.error("Error creating documentation:", error);
    figma.ui.postMessage({ 
      type: 'error', 
      message: 'Error creating documentation: ' + error.message 
    });
    
    // Reset loading state in UI
    figma.ui.postMessage({
      type: 'loading-complete'
    });
  }
}

// Helper function to convert RGB to HEX
function rgbToHex(r, g, b) {
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Update the generateCustomColors function to handle all color types
const generateCustomColors = (customColors) => {
  const { primary, neutral, success, warning, error, info } = customColors;
  
  // Convert hex to RGB
  const primaryRGB = hexToRgb(primary);
  const neutralRGB = hexToRgb(neutral);
  const successRGB = hexToRgb(success || '#21B619');
  const warningRGB = hexToRgb(warning || '#FFCC00');
  const errorRGB = hexToRgb(error || '#E51F1F');
  const infoRGB = info ? hexToRgb(info) : generateInfoColor(primaryRGB);
  
  // Create primary color variations
  const primaryPalette = [
    { name: 'Primary/100', color: primaryRGB, hex: primary },
    { name: 'Primary/80', color: lighten(primaryRGB, 0.2), hex: rgbToHex(lighten(primaryRGB, 0.2).r, lighten(primaryRGB, 0.2).g, lighten(primaryRGB, 0.2).b) },
    { name: 'Primary/60', color: lighten(primaryRGB, 0.4), hex: rgbToHex(lighten(primaryRGB, 0.4).r, lighten(primaryRGB, 0.4).g, lighten(primaryRGB, 0.4).b) },
    { name: 'Primary/40', color: lighten(primaryRGB, 0.6), hex: rgbToHex(lighten(primaryRGB, 0.6).r, lighten(primaryRGB, 0.6).g, lighten(primaryRGB, 0.6).b) },
    { name: 'Primary/20', color: lighten(primaryRGB, 0.8), hex: rgbToHex(lighten(primaryRGB, 0.8).r, lighten(primaryRGB, 0.8).g, lighten(primaryRGB, 0.8).b) }
  ];
  
  // Create 10 neutral color variations
  const neutralPalette = [
    { name: 'Neutral/100', color: neutralRGB, hex: neutral },
    { name: 'Neutral/90', color: lighten(neutralRGB, 0.1), hex: rgbToHex(lighten(neutralRGB, 0.1).r, lighten(neutralRGB, 0.1).g, lighten(neutralRGB, 0.1).b) },
    { name: 'Neutral/80', color: lighten(neutralRGB, 0.2), hex: rgbToHex(lighten(neutralRGB, 0.2).r, lighten(neutralRGB, 0.2).g, lighten(neutralRGB, 0.2).b) },
    { name: 'Neutral/70', color: lighten(neutralRGB, 0.3), hex: rgbToHex(lighten(neutralRGB, 0.3).r, lighten(neutralRGB, 0.3).g, lighten(neutralRGB, 0.3).b) },
    { name: 'Neutral/60', color: lighten(neutralRGB, 0.4), hex: rgbToHex(lighten(neutralRGB, 0.4).r, lighten(neutralRGB, 0.4).g, lighten(neutralRGB, 0.4).b) },
    { name: 'Neutral/50', color: lighten(neutralRGB, 0.5), hex: rgbToHex(lighten(neutralRGB, 0.5).r, lighten(neutralRGB, 0.5).g, lighten(neutralRGB, 0.5).b) },
    { name: 'Neutral/40', color: lighten(neutralRGB, 0.6), hex: rgbToHex(lighten(neutralRGB, 0.6).r, lighten(neutralRGB, 0.6).g, lighten(neutralRGB, 0.6).b) },
    { name: 'Neutral/30', color: lighten(neutralRGB, 0.7), hex: rgbToHex(lighten(neutralRGB, 0.7).r, lighten(neutralRGB, 0.7).g, lighten(neutralRGB, 0.7).b) },
    { name: 'Neutral/20', color: lighten(neutralRGB, 0.8), hex: rgbToHex(lighten(neutralRGB, 0.8).r, lighten(neutralRGB, 0.8).g, lighten(neutralRGB, 0.8).b) },
    { name: 'Neutral/10', color: lighten(neutralRGB, 0.9), hex: rgbToHex(lighten(neutralRGB, 0.9).r, lighten(neutralRGB, 0.9).g, lighten(neutralRGB, 0.9).b) }
  ];
  
  // Create semantic color palette
  const accentPalette = [
    { name: 'Success', color: successRGB, hex: success || '#21B619' },
    { name: 'Warning', color: warningRGB, hex: warning || '#FFCC00' },
    { name: 'Error', color: errorRGB, hex: error || '#E51F1F' },
    { name: 'Info', color: infoRGB, hex: info || rgbToHex(infoRGB.r, infoRGB.g, infoRGB.b) }
  ];
  
  return [
    { category: 'primary', colors: primaryPalette },
    { category: 'neutral', colors: neutralPalette },
    { category: 'accent', colors: accentPalette }
  ];
};

// Helper function to generate info color if not provided
function generateInfoColor(primaryRGB) {
  // Create analogous color (adjacent on color wheel)
  const hslPrimary = rgbToHsl(primaryRGB.r, primaryRGB.g, primaryRGB.b);
  
  // Rotate hue by 30 degrees for analogous color
  const hslAnalogous = { ...hslPrimary, h: (hslPrimary.h + 30) % 360 };
  
  return hslToRgb(hslAnalogous.h, hslAnalogous.s, hslAnalogous.l);
}

// Add the missing RGB to HSL conversion function
function rgbToHsl(r, g, b) {
  r /= 1;
  g /= 1;
  b /= 1;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }

  return { h: h * 360, s, l };
}

// Add the missing HSL to RGB conversion function
function hslToRgb(h, s, l) {
  h /= 360;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return { r, g, b };
}

// Fix the hexToRgb function to handle undefined values
function hexToRgb(hex) {
  // Return a default color if hex is undefined
  if (!hex) {
    return { r: 0, g: 0, b: 0 };
  }
  
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  return { r, g, b };
}

// Helper function to lighten a color
function lighten(color, amount) {
  return {
    r: Math.min(1, color.r + (1 - color.r) * amount),
    g: Math.min(1, color.g + (1 - color.g) * amount),
    b: Math.min(1, color.b + (1 - color.b) * amount)
  };
}

// Add a function to clean up resources
function cleanupResources() {
  // Clear any references that might cause memory leaks
  colorVariationCount = 0;
  textVariationCount = 0;
  
  // Notify the UI that cleanup is complete
  figma.ui.postMessage({
    type: 'cleanup-complete'
  });
}

// Update the message handler to include cleanup
figma.ui.onmessage = (msg) => {
  if (msg.type === 'generate-styles') {
    generateStyles();
  } else if (msg.type === 'generate-custom-colors') {
    // Handle custom color generation
    try {
      const customPalette = generateCustomColors(msg.colors);
      figma.ui.postMessage({
        type: 'styles-generated',
        colors: customPalette
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Error generating custom colors: ' + error.message
      });
    }
  } else if (msg.type === 'apply-styles') {
    try {
      // Only apply styles without creating documentation
      applyStyles(
        msg.customColors, 
        msg.shadows, 
        msg.spacingTokens, 
        msg.gridTokens, 
        msg.sizingTokens,
        msg.textStyles
      );
      
      // Notify UI that styles were applied
      figma.ui.postMessage({
        type: 'styles-applied',
        message: 'Styles applied successfully!'
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Error applying styles: ' + error.message
      });
    } finally {
      figma.ui.postMessage({
        type: 'loading-complete'
      });
    }
  } else if (msg.type === 'create-documentation') {
    try {
      // Only create documentation without applying styles
      createDocumentation(
        msg.customColors, 
        msg.shadows, 
        msg.spacingTokens, 
        msg.gridTokens,
        msg.textStyles
      );
      
      // Notify UI that documentation was created
      figma.ui.postMessage({
        type: 'documentation-created',
        message: 'Documentation created successfully!'
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Error creating documentation: ' + error.message
      });
    } finally {
      figma.ui.postMessage({
        type: 'loading-complete'
      });
    }
  } else if (msg.type === 'close-plugin') {
    cleanupResources();
    figma.closePlugin();
  } else if (msg.type === 'resize') {
    // Handle resize message from UI
    figma.ui.resize(msg.width, msg.height);
  } else if (msg.type === 'ui-loaded') {
    // Auto-generate styles when UI is loaded
    generateStyles();
  } else if (msg.type === 'cleanup') {
    cleanupResources();
  } else if (msg.type === 'generate-design-system') {
    try {
      // First apply all styles
      applyStyles(
        msg.customColors, 
        msg.shadows, 
        msg.spacingTokens, 
        msg.gridTokens, 
        msg.sizingTokens,
        msg.textStyles
      );
      
      // Then create documentation
      createDocumentation(
        msg.customColors, 
        msg.shadows, 
        msg.spacingTokens, 
        msg.gridTokens,
        msg.textStyles
      );
      
      // Notify UI that everything is complete
      figma.ui.postMessage({
        type: 'design-system-generated',
        message: 'Design system styles and documentation created successfully!'
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Error generating design system: ' + error.message
      });
    } finally {
      figma.ui.postMessage({
        type: 'loading-complete'
      });
    }
  }
};

// Make sure to clean up when the plugin is closed
figma.on('close', () => {
  cleanupResources();
});

// Fix the shadow effect type error in the createDocumentation function
function createShadowExample(shadow) {
  const shadowExample = figma.createRectangle();
  shadowExample.resize(200, 100);
  shadowExample.cornerRadius = 8;
  shadowExample.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  
  // Parse shadow color from rgba format
  const shadowColor = parseRgba(shadow.color);
  
  // Create a properly typed shadow effect with correct BlendMode type
  const shadowEffect = {
    type: "DROP_SHADOW" as const,
    color: shadowColor,
    offset: { x: shadow.x || 0, y: shadow.y || 0 },
    radius: shadow.blur || 0,
    spread: shadow.spread || 0,
    visible: true,
    blendMode: "NORMAL" as const
  };
  
  shadowExample.effects = [shadowEffect];
  return shadowExample;
}

// Helper function to parse rgba color string
function parseRgba(rgba) {
  // Default color if parsing fails
  const defaultColor = { r: 0, g: 0, b: 0, a: 0.1 };
  
  if (!rgba) return defaultColor;
  
  try {
    // Handle rgba format like "rgba(0,0,0,0.1)"
    if (rgba.startsWith('rgba')) {
      const values = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (values && values.length === 5) {
        return {
          r: parseInt(values[1]) / 255,
          g: parseInt(values[2]) / 255,
          b: parseInt(values[3]) / 255,
          a: parseFloat(values[4])
        };
      }
    }
    
    // Handle hex format with alpha like "#00000019"
    if (rgba.startsWith('#') && rgba.length === 9) {
      const r = parseInt(rgba.slice(1, 3), 16) / 255;
      const g = parseInt(rgba.slice(3, 5), 16) / 255;
      const b = parseInt(rgba.slice(5, 7), 16) / 255;
      const a = parseInt(rgba.slice(7, 9), 16) / 255;
      return { r, g, b, a };
    }
    
    // Handle hex format without alpha like "#000000"
    if (rgba.startsWith('#') && rgba.length === 7) {
      const r = parseInt(rgba.slice(1, 3), 16) / 255;
      const g = parseInt(rgba.slice(3, 5), 16) / 255;
      const b = parseInt(rgba.slice(5, 7), 16) / 255;
      return { r, g, b, a: 0.1 }; // Default alpha
    }
  } catch (e) {
    console.error("Error parsing color:", e);
  }
  
  return defaultColor;
}
