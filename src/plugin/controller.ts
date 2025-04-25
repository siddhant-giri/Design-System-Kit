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
      { name: 'Neutral/80', color: { r: 0.4, g: 0.4, b: 0.4 } },
      { name: 'Neutral/60', color: { r: 0.6, g: 0.6, b: 0.6 } },
      { name: 'Neutral/40', color: { r: 0.8, g: 0.8, b: 0.8 } },
      { name: 'Neutral/20', color: { r: 0.95, g: 0.95, b: 0.95 } }
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
      { name: 'Neutral/80', color: { r: 0.35, g: 0.35, b: 0.4 } },
      { name: 'Neutral/60', color: { r: 0.55, g: 0.55, b: 0.6 } },
      { name: 'Neutral/40', color: { r: 0.75, g: 0.75, b: 0.8 } },
      { name: 'Neutral/20', color: { r: 0.9, g: 0.9, b: 0.95 } }
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
      { name: 'Neutral/80', color: { r: 0.45, g: 0.45, b: 0.45 } },
      { name: 'Neutral/60', color: { r: 0.65, g: 0.65, b: 0.65 } },
      { name: 'Neutral/40', color: { r: 0.85, g: 0.85, b: 0.85 } },
      { name: 'Neutral/20', color: { r: 0.97, g: 0.97, b: 0.97 } }
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
    { name: 'Heading/H2', fontSize: 24, fontWeight: 700, lineHeight: { value: 32, unit: 'PIXELS' as const } },
    { name: 'Heading/H3', fontSize: 20, fontWeight: 600, lineHeight: { value: 28, unit: 'PIXELS' as const } },
    { name: 'Body/Regular', fontSize: 16, fontWeight: 400, lineHeight: { value: 24, unit: 'PIXELS' as const } },
    { name: 'Body/Small', fontSize: 14, fontWeight: 400, lineHeight: { value: 20, unit: 'PIXELS' as const } },
    { name: 'Caption', fontSize: 12, fontWeight: 400, lineHeight: { value: 16, unit: 'PIXELS' as const } }
  ],
  // Second variation
  [
    { name: 'Heading/H1', fontSize: 36, fontWeight: 800, lineHeight: { value: 44, unit: 'PIXELS' as const } },
    { name: 'Heading/H2', fontSize: 28, fontWeight: 700, lineHeight: { value: 36, unit: 'PIXELS' as const } },
    { name: 'Heading/H3', fontSize: 22, fontWeight: 600, lineHeight: { value: 30, unit: 'PIXELS' as const } },
    { name: 'Body/Regular', fontSize: 16, fontWeight: 400, lineHeight: { value: 24, unit: 'PIXELS' as const } },
    { name: 'Body/Small', fontSize: 14, fontWeight: 400, lineHeight: { value: 20, unit: 'PIXELS' as const } },
    { name: 'Caption', fontSize: 12, fontWeight: 300, lineHeight: { value: 16, unit: 'PIXELS' as const } }
  ],
  // Third variation
  [
    { name: 'Heading/H1', fontSize: 40, fontWeight: 700, lineHeight: { value: 48, unit: 'PIXELS' as const } },
    { name: 'Heading/H2', fontSize: 32, fontWeight: 600, lineHeight: { value: 40, unit: 'PIXELS' as const } },
    { name: 'Heading/H3', fontSize: 24, fontWeight: 600, lineHeight: { value: 32, unit: 'PIXELS' as const } },
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

// Add a new function to apply both styles at once
async function applyStyles() {
  try {
    // Load all required fonts
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    
    // Get the current variations (the most recently shown ones)
    const currentColorVariation = colorPaletteVariations[(colorVariationCount - 1) % colorPaletteVariations.length];
    const currentTextVariation = textStyleVariations[(textVariationCount - 1) % textStyleVariations.length];
    
    // Create color styles
    for (const category of Object.values(currentColorVariation)) {
      for (const colorData of category) {
        const style = figma.createPaintStyle();
        style.name = colorData.name;
        const paint: SolidPaint = {
          type: 'SOLID',
          color: colorData.color
        };
        style.paints = [paint];
      }
    }
    
    // Create text styles
    for (const textData of currentTextVariation) {
      const style = figma.createTextStyle();
      style.name = textData.name;
      style.fontSize = textData.fontSize;
      style.fontName = { 
        family: "Inter", 
        style: textData.fontWeight >= 700 ? "Bold" : 
               textData.fontWeight >= 600 ? "Semi Bold" : 
               textData.fontWeight >= 500 ? "Medium" : "Regular" 
      };
      style.lineHeight = textData.lineHeight;
    }
    
    figma.ui.postMessage({ 
      type: 'success', 
      message: 'All styles applied successfully!' 
    });
  } catch (error) {
    figma.ui.postMessage({ 
      type: 'error', 
      message: 'Error applying styles: ' + error.message 
    });
  }
}

// Update the createDocumentation function to fix text overlaps
async function createDocumentation() {
  try {
    // Load all required fonts first
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
    
    // Get the current variations (the most recently shown ones)
    const currentColorVariation = colorPaletteVariations[(colorVariationCount - 1) % colorPaletteVariations.length];
    const currentTextVariation = textStyleVariations[(textVariationCount - 1) % textStyleVariations.length];
    
    // First, apply all styles to the document
    
    // 1. Create color styles
    for (const category of Object.values(currentColorVariation)) {
      for (const colorData of category) {
        const style = figma.createPaintStyle();
        style.name = colorData.name;
        const paint: SolidPaint = {
          type: 'SOLID',
          color: colorData.color
        };
        style.paints = [paint];
      }
    }
    
    // 2. Create text styles
    for (const textData of currentTextVariation) {
      const style = figma.createTextStyle();
      style.name = textData.name;
      style.fontSize = textData.fontSize;
      style.fontName = { 
        family: "Inter", 
        style: textData.fontWeight >= 700 ? "Bold" : 
               textData.fontWeight >= 600 ? "Semi Bold" : 
               textData.fontWeight >= 500 ? "Medium" : "Regular" 
      };
      style.lineHeight = textData.lineHeight;
    }
    
    // Now create the documentation frame with improved design
    const frame = figma.createFrame();
    frame.name = "Design System Documentation";
    frame.resize(1200, 1600);
    frame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
    
    // Create a header background
    const headerBg = figma.createRectangle();
    headerBg.resize(1200, 160);
    headerBg.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    headerBg.effects = [
      {
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.05 } as RGBA,
        offset: { x: 0, y: 2 },
        radius: 8,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL'
      }
    ];
    frame.appendChild(headerBg);
    
    // Add a title
    const title = figma.createText();
    title.fontName = { family: "Inter", style: "Bold" };
    title.fontSize = 36;
    title.characters = "Design System";
    title.x = 80;
    title.y = 60;
    frame.appendChild(title);
    
    // Add a subtitle with timestamp
    const date = new Date().toLocaleDateString();
    const subtitle = figma.createText();
    subtitle.fontName = { family: "Inter", style: "Regular" };
    subtitle.fontSize = 16;
    subtitle.characters = `Generated on ${date} • Variation ${colorVariationCount}`;
    subtitle.x = 80;
    subtitle.y = 110;
    subtitle.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
    frame.appendChild(subtitle);
    
    // Create a container for the content
    const contentContainer = figma.createFrame();
    contentContainer.name = "Content";
    contentContainer.resize(1040, 1400);
    contentContainer.x = 80;
    contentContainer.y = 200;
    contentContainer.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0 }];
    frame.appendChild(contentContainer);
    
    // Add color section title
    const colorTitle = figma.createText();
    colorTitle.fontName = { family: "Inter", style: "Bold" };
    colorTitle.fontSize = 24;
    colorTitle.characters = "Color Palette";
    colorTitle.x = 0;
    colorTitle.y = 0;
    contentContainer.appendChild(colorTitle);
    
    // Add color section description
    const colorDescription = figma.createText();
    colorDescription.fontName = { family: "Inter", style: "Regular" };
    colorDescription.fontSize = 16;
    colorDescription.characters = "These colors form the foundation of our design system. Use them consistently across all interfaces.";
    colorDescription.x = 0;
    colorDescription.y = 40;
    colorDescription.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }];
    contentContainer.appendChild(colorDescription);
    
    // Create color swatches with improved design
    let yOffset = 100;
    
    for (const [category, colors] of Object.entries(currentColorVariation)) {
      // Create a category container
      const categoryContainer = figma.createFrame();
      categoryContainer.name = category;
      categoryContainer.resize(1040, 140); // Initial height, will be adjusted later
      categoryContainer.x = 0;
      categoryContainer.y = yOffset;
      categoryContainer.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      categoryContainer.cornerRadius = 12;
      categoryContainer.effects = [
        {
          type: 'DROP_SHADOW',
          color: { r: 0, g: 0, b: 0, a: 0.04 } as RGBA,
          offset: { x: 0, y: 2 },
          radius: 6,
          spread: 0,
          visible: true,
          blendMode: 'NORMAL'
        }
      ];
      contentContainer.appendChild(categoryContainer);
      
      // Add category title
      const categoryText = figma.createText();
      categoryText.fontName = { family: "Inter", style: "Semi Bold" };
      categoryText.fontSize = 18;
      categoryText.characters = category.charAt(0).toUpperCase() + category.slice(1);
      categoryText.x = 24;
      categoryText.y = 24;
      categoryContainer.appendChild(categoryText);
      
      // Create a container for swatches
      const swatchesContainer = figma.createFrame();
      swatchesContainer.name = "SwatchesContainer";
      swatchesContainer.resize(992, 200); // Initial height, will be adjusted
      swatchesContainer.x = 24;
      swatchesContainer.y = 60;
      swatchesContainer.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0 }];
      categoryContainer.appendChild(swatchesContainer);
      
      // Calculate how many swatches can fit in a row
      const swatchWidth = 120;
      const swatchSpacing = 16;
      const maxSwatchesPerRow = Math.floor((992 - swatchSpacing) / (swatchWidth + swatchSpacing));
      
      // Position swatches in a grid layout
      let currentRow = 0;
      let currentCol = 0;
      
      for (const colorData of colors) {
        // Create a swatch container
        const swatchContainer = figma.createFrame();
        swatchContainer.name = colorData.name;
        swatchContainer.resize(swatchWidth, 100);
        swatchContainer.x = currentCol * (swatchWidth + swatchSpacing);
        swatchContainer.y = currentRow * 120;
        swatchContainer.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0 }];
        swatchesContainer.appendChild(swatchContainer);
        
        // Create the color swatch
        const swatch = figma.createRectangle();
        swatch.resize(swatchWidth, 60);
        swatch.cornerRadius = 8;
        swatch.fills = [{ type: 'SOLID', color: colorData.color }];
        swatch.x = 0;
        swatch.y = 0;
        
        // Apply the corresponding style to the swatch
        const paintStyles = figma.getLocalPaintStyles();
        const matchingStyle = paintStyles.find(style => style.name === colorData.name);
        if (matchingStyle) {
          swatch.fillStyleId = matchingStyle.id;
        }
        
        // Create the color name label
        const nameLabel = figma.createText();
        nameLabel.fontName = { family: "Inter", style: "Medium" };
        nameLabel.fontSize = 12;
        nameLabel.characters = colorData.name;
        nameLabel.x = 0;
        nameLabel.y = 68;
        nameLabel.fills = [{ type: 'SOLID', color: { r: 0.3, g: 0.3, b: 0.3 } }];
        
        // Create the hex value label
        const hexLabel = figma.createText();
        hexLabel.fontName = { family: "Inter", style: "Regular" };
        hexLabel.fontSize = 12;
        hexLabel.characters = rgbToHex(colorData.color.r, colorData.color.g, colorData.color.b);
        hexLabel.x = 0;
        hexLabel.y = 88;
        hexLabel.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
        
        // Add elements to the container
        swatchContainer.appendChild(swatch);
        swatchContainer.appendChild(nameLabel);
        swatchContainer.appendChild(hexLabel);
        
        // Move to next column or row
        currentCol++;
        if (currentCol >= maxSwatchesPerRow) {
          currentCol = 0;
          currentRow++;
        }
      }
      
      // Calculate the actual height needed for the swatches
      const rowsNeeded = Math.ceil(colors.length / maxSwatchesPerRow);
      const swatchesHeight = rowsNeeded * 120;
      
      // Resize containers to fit content
      swatchesContainer.resize(992, swatchesHeight);
      categoryContainer.resize(1040, swatchesContainer.y + swatchesHeight + 24);
      
      // Update yOffset for next category
      yOffset += categoryContainer.height + 24;
    }
    
    // Add typography section
    const typographyTitle = figma.createText();
    typographyTitle.fontName = { family: "Inter", style: "Bold" };
    typographyTitle.fontSize = 24;
    typographyTitle.characters = "Typography";
    typographyTitle.x = 0;
    typographyTitle.y = yOffset;
    contentContainer.appendChild(typographyTitle);
    
    // Add typography description
    const typographyDescription = figma.createText();
    typographyDescription.fontName = { family: "Inter", style: "Regular" };
    typographyDescription.fontSize = 16;
    typographyDescription.characters = "Our typography system is designed for clarity and readability across all platforms.";
    typographyDescription.x = 0;
    typographyDescription.y = yOffset + 40;
    typographyDescription.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }];
    contentContainer.appendChild(typographyDescription);
    
    yOffset += 100;
    
    // Create typography container
    const typographyContainer = figma.createFrame();
    typographyContainer.name = "Typography";
    typographyContainer.resize(1040, 500); // Initial height, will be adjusted
    typographyContainer.x = 0;
    typographyContainer.y = yOffset;
    typographyContainer.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    typographyContainer.cornerRadius = 12;
    typographyContainer.effects = [
      {
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.04 } as RGBA,
        offset: { x: 0, y: 2 },
        radius: 6,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL'
      }
    ];
    contentContainer.appendChild(typographyContainer);
    
    // Create text style examples with improved design
    let textYOffset = 40;
    
    for (const textData of currentTextVariation) {
      // Calculate row height based on font size
      const rowHeight = Math.max(textData.fontSize * 2, 40);
      
      // Create a row for each text style
      const textRow = figma.createFrame();
      textRow.name = textData.name;
      textRow.resize(992, rowHeight);
      textRow.x = 24;
      textRow.y = textYOffset;
      textRow.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0 }];
      typographyContainer.appendChild(textRow);
      
      // Create style name column
      const styleName = figma.createText();
      styleName.fontName = { family: "Inter", style: "Medium" };
      styleName.fontSize = 14;
      styleName.characters = textData.name;
      styleName.x = 0;
      styleName.y = (rowHeight - 14) / 2; // Center vertically
      styleName.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }];
      textRow.appendChild(styleName);
      
      // Create text example
      const textExample = figma.createText();
      textExample.fontName = { 
        family: "Inter", 
        style: textData.fontWeight >= 700 ? "Bold" : 
               textData.fontWeight >= 600 ? "Semi Bold" : 
               textData.fontWeight >= 500 ? "Medium" : "Regular" 
      };
      textExample.fontSize = textData.fontSize;
      textExample.lineHeight = textData.lineHeight;
      textExample.characters = "The quick brown fox";
      textExample.x = 200;
      textExample.y = (rowHeight - textData.fontSize) / 2; // Center vertically
      
      // Apply the corresponding text style
      const textStyles = figma.getLocalTextStyles();
      const matchingStyle = textStyles.find(style => style.name === textData.name);
      if (matchingStyle) {
        textExample.textStyleId = matchingStyle.id;
      }
      
      textRow.appendChild(textExample);
      
      // Create specs column
      const specs = figma.createText();
      specs.fontName = { family: "Inter", style: "Regular" };
      specs.fontSize = 12;
      specs.characters = `${textData.fontSize}px / ${textData.lineHeight.value}px • Weight: ${textData.fontWeight}`;
      specs.x = 700;
      specs.y = (rowHeight - 12) / 2; // Center vertically
      specs.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
      textRow.appendChild(specs);
      
      // Add a separator line
      if (textData !== currentTextVariation[currentTextVariation.length - 1]) {
        const separator = figma.createLine();
        separator.x = 24;
        separator.y = textYOffset + rowHeight;
        separator.resize(944, 0);
        separator.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
        typographyContainer.appendChild(separator);
      }
      
      textYOffset += rowHeight + 16; // Add spacing between rows
    }
    
    // Adjust typography container height based on content
    typographyContainer.resize(1040, textYOffset + 24);
    
    // Adjust content container height based on all content
    contentContainer.resize(1040, yOffset + typographyContainer.height + 80);
    
    // Adjust frame height based on content
    frame.resize(1200, contentContainer.y + contentContainer.height + 80);
    
    // Add a footer
    const footer = figma.createFrame();
    footer.name = "Footer";
    footer.resize(1200, 60);
    footer.x = 0;
    footer.y = frame.height - 60;
    footer.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    footer.effects = [
      {
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.05 } as RGBA,
        offset: { x: 0, y: -2 },
        radius: 8,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL'
      }
    ];
    frame.appendChild(footer);
    
    // Add footer text
    const footerText = figma.createText();
    footerText.fontName = { family: "Inter", style: "Regular" };
    footerText.fontSize = 12;
    footerText.characters = "Generated with Design System Generator • " + date;
    footerText.x = 80;
    footerText.y = 24;
    footerText.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
    footer.appendChild(footerText);
    
    figma.currentPage.appendChild(frame);
    figma.viewport.scrollAndZoomIntoView([frame]);
    
    figma.ui.postMessage({ 
      type: 'success', 
      message: 'Styles applied and documentation created successfully!' 
    });
  } catch (error) {
    figma.ui.postMessage({ 
      type: 'error', 
      message: 'Error creating documentation: ' + error.message 
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

// Update the message handler
figma.ui.onmessage = (msg) => {
  if (msg.type === 'generate-styles') {
    generateStyles();
  } else if (msg.type === 'apply-styles') {
    applyStyles();
  } else if (msg.type === 'create-documentation') {
    createDocumentation();
  } else if (msg.type === 'close-plugin') {
    figma.closePlugin();
  } else if (msg.type === 'resize') {
    // Handle resize message from UI
    figma.ui.resize(msg.width, msg.height);
  }
};
