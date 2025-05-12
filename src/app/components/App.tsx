import React, { useState, useEffect, useRef } from 'react';
import '../styles/ui.css';

function App() {
  const [status, setStatus] = useState('');
  const [colors, setColors] = useState([]);
  const [textStyles, setTextStyles] = useState([]);
  const [activeTab, setActiveTab] = useState('colors'); // 'colors', 'typography', 'shadows', 'spacing', 'grids', 'sizing'
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const [fadeOutStatus, setFadeOutStatus] = useState(false);
  
  // Color input states
  const [primaryColor, setPrimaryColor] = useState('#18A0FB');
  const [neutralColor, setNeutralColor] = useState('#333333');
  const [successColor, setSuccessColor] = useState('#21B619');
  const [warningColor, setWarningColor] = useState('#FFCC00');
  const [errorColor, setErrorColor] = useState('#E51F1F');
  const [infoColor, setInfoColor] = useState('#0D8CE9');
  
  // Shadow tokens
  const [shadows, setShadows] = useState([
    { name: 'Small', x: 0, y: 2, blur: 4, spread: 0, color: 'rgba(0,0,0,0.1)' },
    { name: 'Medium', x: 0, y: 4, blur: 8, spread: 0, color: 'rgba(0,0,0,0.1)' },
    { name: 'Large', x: 0, y: 8, blur: 16, spread: 0, color: 'rgba(0,0,0,0.1)' },
    { name: 'XLarge', x: 0, y: 16, blur: 24, spread: 0, color: 'rgba(0,0,0,0.1)' }
  ]);
  
  // Spacing tokens
  const [spacingTokens, setSpacingTokens] = useState([
    { name: 'XS', value: 4 },
    { name: 'S', value: 8 },
    { name: 'M', value: 16 },
    { name: 'L', value: 24 },
    { name: 'XL', value: 32 },
    { name: '2XL', value: 48 },
    { name: '3XL', value: 64 }
  ]);
  
  // Grid tokens
  const [gridTokens, setGridTokens] = useState([
    { name: 'Default', columns: 12, gutter: 16, margin: 24 }
  ]);
  
  // Use a ref to track the timeout
  const statusTimeoutRef = useRef(null);

  // Add new state variables for typography customization
  const [baseSize, setBaseSize] = useState(16);
  const [lineHeightMultiplier, setLineHeightMultiplier] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);

  const onCreateDocumentation = () => {
    setStatus('');
    setIsLoading(true);
    
    // Create text styles based on typography settings
    const textStyles = [
      {
        name: 'Heading/H1',
        fontSize: Math.round(baseSize * 2),
        fontWeight: 700,
        lineHeight: { value: Math.round(baseSize * 2 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Heading/H2',
        fontSize: Math.round(baseSize * 1.75),
        fontWeight: 700,
        lineHeight: { value: Math.round(baseSize * 1.75 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Heading/H3',
        fontSize: Math.round(baseSize * 1.5),
        fontWeight: 600,
        lineHeight: { value: Math.round(baseSize * 1.5 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Heading/H4',
        fontSize: Math.round(baseSize * 1.25),
        fontWeight: 600,
        lineHeight: { value: Math.round(baseSize * 1.25 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Heading/H5',
        fontSize: Math.round(baseSize * 1.125),
        fontWeight: 600,
        lineHeight: { value: Math.round(baseSize * 1.125 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Heading/H6',
        fontSize: baseSize,
        fontWeight: 600,
        lineHeight: { value: Math.round(baseSize * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Body/Regular',
        fontSize: baseSize,
        fontWeight: 400,
        lineHeight: { value: Math.round(baseSize * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Body/Small',
        fontSize: Math.round(baseSize * 0.875),
        fontWeight: 400,
        lineHeight: { value: Math.round(baseSize * 0.875 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Caption',
        fontSize: Math.round(baseSize * 0.75),
        fontWeight: 400,
        lineHeight: { value: Math.round(baseSize * 0.75 * lineHeightMultiplier), unit: 'PIXELS' as const }
      }
    ];
    
    // Prepare the data object with all style information
    const styleData = {
      customColors: {
        primary: primaryColor,
        neutral: neutralColor,
        success: successColor,
        warning: warningColor,
        error: errorColor,
        info: infoColor
      },
      shadows,
      spacingTokens,
      gridTokens,
      textStyles
    };
    
    // Send a message to only create documentation
    parent.postMessage({ 
      pluginMessage: { 
        type: 'create-documentation',
        ...styleData
      } 
    }, '*');
  };
  
  // Function to handle setting status with auto-fade
  const setStatusWithFade = (message, isError = false) => {
    // Clear any existing timeout
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
    }
    
    // Reset fade state
    setFadeOutStatus(false);
    
    // Set the new status
    setStatus(message);
    
    // Don't auto-fade error messages
    if (!isError && message) {
      // Start fade out after 3 seconds
      statusTimeoutRef.current = setTimeout(() => {
        setFadeOutStatus(true);
        
        // Clear the status after the fade animation completes
        statusTimeoutRef.current = setTimeout(() => {
          setStatus('');
          setFadeOutStatus(false);
        }, 500); // Match this to the CSS transition duration
      }, 3000);
    }
  };

  // Create a function to handle color changes
  const handleColorChange = (color, type = 'primary') => {
    // Update the appropriate state based on the color type
    switch (type) {
      case 'primary':
        setPrimaryColor(color);
        break;
      case 'neutral':
        setNeutralColor(color);
        break;
      case 'success':
        setSuccessColor(color);
        break;
      case 'warning':
        setWarningColor(color);
        break;
      case 'error':
        setErrorColor(color);
        break;
      case 'info':
        setInfoColor(color);
        break;
      default:
        setPrimaryColor(color);
    }
    
    // Generate colors immediately when any color changes
    parent.postMessage({ 
      pluginMessage: { 
        type: 'generate-custom-colors',
        colors: {
          primary: type === 'primary' ? color : primaryColor,
          neutral: type === 'neutral' ? color : neutralColor,
          success: type === 'success' ? color : successColor,
          warning: type === 'warning' ? color : warningColor,
          error: type === 'error' ? color : errorColor,
          info: type === 'info' ? color : infoColor
        }
      } 
    }, '*');
  };

  // Add a function to update typography styles based on customization
  const updateTypographyStyles = (baseSize, lineHeightMultiplier, letterSpacing) => {
    // Create a new array of text styles with updated values
    const updatedStyles = [
      {
        name: 'Heading 1',
        fontSize: Math.round(baseSize * 2.5),
        fontWeight: 700,
        lineHeight: { 
          value: Math.round(baseSize * 2.5 * lineHeightMultiplier), 
          unit: 'PIXELS' 
        },
        letterSpacing: letterSpacing,
        fontFamily: 'Inter'
      },
      {
        name: 'Heading 2',
        fontSize: Math.round(baseSize * 2),
        fontWeight: 700,
        lineHeight: { 
          value: Math.round(baseSize * 2 * lineHeightMultiplier), 
          unit: 'PIXELS' 
        },
        letterSpacing: letterSpacing,
        fontFamily: 'Inter'
      },
      {
        name: 'Heading 3',
        fontSize: Math.round(baseSize * 1.5),
        fontWeight: 600,
        lineHeight: { 
          value: Math.round(baseSize * 1.5 * lineHeightMultiplier), 
          unit: 'PIXELS' 
        },
        letterSpacing: letterSpacing,
        fontFamily: 'Inter'
      },
      {
        name: 'Heading 4',
        fontSize: Math.round(baseSize * 1.25),
        fontWeight: 600,
        lineHeight: { 
          value: Math.round(baseSize * 1.25 * lineHeightMultiplier), 
          unit: 'PIXELS' 
        },
        letterSpacing: letterSpacing,
        fontFamily: 'Inter'
      },
      {
        name: 'Heading 5',
        fontSize: Math.round(baseSize * 1.125),
        fontWeight: 600,
        lineHeight: { 
          value: Math.round(baseSize * 1.125 * lineHeightMultiplier), 
          unit: 'PIXELS' 
        },
        letterSpacing: letterSpacing,
        fontFamily: 'Inter'
      },
      {
        name: 'Heading 6',
        fontSize: Math.round(baseSize),
        fontWeight: 600,
        lineHeight: { 
          value: Math.round(baseSize * lineHeightMultiplier), 
          unit: 'PIXELS' 
        },
        letterSpacing: letterSpacing,
        fontFamily: 'Inter'
      },
      {
        name: 'Body',
        fontSize: baseSize,
        fontWeight: 400,
        lineHeight: { 
          value: Math.round(baseSize * lineHeightMultiplier), 
          unit: 'PIXELS' 
        },
        letterSpacing: letterSpacing,
        fontFamily: 'Inter'
      },
      {
        name: 'Body Small',
        fontSize: Math.round(baseSize * 0.875),
        fontWeight: 400,
        lineHeight: { 
          value: Math.round(baseSize * 0.875 * lineHeightMultiplier), 
          unit: 'PIXELS' 
        },
        letterSpacing: letterSpacing,
        fontFamily: 'Inter'
      },
      {
        name: 'Caption',
        fontSize: Math.round(baseSize * 0.75),
        fontWeight: 400,
        lineHeight: { 
          value: Math.round(baseSize * 0.75 * lineHeightMultiplier), 
          unit: 'PIXELS' 
        },
        letterSpacing: letterSpacing,
        fontFamily: 'Inter'
      }
    ];
    
    setTextStyles(updatedStyles);
  };

  useEffect(() => {
    // Adjust plugin size based on content
    const resizePlugin = () => {
      parent.postMessage({ 
        pluginMessage: { 
          type: 'resize', 
          width: 720,
          height: 640
        } 
      }, '*');
    };

    // Message handler function
    const handleMessage = (event) => {
      const { type, message, colors: colorData, textStyles: textStylesData, shadows: shadowData, spacing: spacingData, grids: gridData } = event.data.pluginMessage;
      
      setIsLoading(false);
      
      if (type === 'styles-generated') {
        if (colorData) {
          setColors(colorData);
        }
        if (textStylesData) {
          setTextStyles(textStylesData);
        } else {
          // If no text styles were provided, generate them based on current settings
          updateTypographyStyles(baseSize, lineHeightMultiplier, letterSpacing);
        }
        if (shadowData) {
          setShadows(shadowData);
        }
        if (spacingData) {
          setSpacingTokens(spacingData);
        }
        if (gridData) {
          setGridTokens(gridData);
        }
      } else if (type === 'documentation-created') {
        setStatusWithFade('Documentation created successfully!');
        setShowConfirmation(false);
      } else if (type === 'styles-applied') {
        setStatusWithFade(message || 'Styles applied successfully!');
      } else if (type === 'error') {
        setStatusWithFade(message || 'An error occurred', true);
      }
    };

    // This is how we read messages sent from the plugin controller
    window.addEventListener('message', handleMessage);
    
    // Call resize on mount
    resizePlugin();

    // Notify the plugin that the UI is loaded
    parent.postMessage({ pluginMessage: { type: 'ui-loaded' } }, '*');
    
    // Clean up event listener on unmount to prevent memory leaks
    return () => {
      window.removeEventListener('message', handleMessage);
      
      // Clear any pending timeouts
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  // Add a new function to apply only the styles
  const onApplyAllStyles = () => {
    setStatus('');
    setIsLoading(true);
    
    // Create text styles based on typography settings
    const textStyles = [
      {
        name: 'Heading/H1',
        fontSize: Math.round(baseSize * 2),
        fontWeight: 700,
        lineHeight: { value: Math.round(baseSize * 2 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Heading/H2',
        fontSize: Math.round(baseSize * 1.75),
        fontWeight: 700,
        lineHeight: { value: Math.round(baseSize * 1.75 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Heading/H3',
        fontSize: Math.round(baseSize * 1.5),
        fontWeight: 600,
        lineHeight: { value: Math.round(baseSize * 1.5 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Heading/H4',
        fontSize: Math.round(baseSize * 1.25),
        fontWeight: 600,
        lineHeight: { value: Math.round(baseSize * 1.25 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Heading/H5',
        fontSize: Math.round(baseSize * 1.125),
        fontWeight: 600,
        lineHeight: { value: Math.round(baseSize * 1.125 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Heading/H6',
        fontSize: baseSize,
        fontWeight: 600,
        lineHeight: { value: Math.round(baseSize * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Body/Regular',
        fontSize: baseSize,
        fontWeight: 400,
        lineHeight: { value: Math.round(baseSize * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Body/Small',
        fontSize: Math.round(baseSize * 0.875),
        fontWeight: 400,
        lineHeight: { value: Math.round(baseSize * 0.875 * lineHeightMultiplier), unit: 'PIXELS' as const }
      },
      {
        name: 'Caption',
        fontSize: Math.round(baseSize * 0.75),
        fontWeight: 400,
        lineHeight: { value: Math.round(baseSize * 0.75 * lineHeightMultiplier), unit: 'PIXELS' as const }
      }
    ];
    
    // Prepare the data object with all style information
    const styleData = {
      customColors: {
        primary: primaryColor,
        neutral: neutralColor,
        success: successColor,
        warning: warningColor,
        error: errorColor,
        info: infoColor
      },
      shadows,
      spacingTokens,
      gridTokens,
      textStyles
    };
    
    // Send a message to apply only the styles
    parent.postMessage({ 
      pluginMessage: { 
        type: 'apply-styles',
        ...styleData
      } 
    }, '*');
  };

  // Add a new function to handle applying color styles
  const onApplyColorStyles = () => {
    setStatus('');
    setIsLoading(true);
    parent.postMessage({ 
      pluginMessage: { 
        type: 'apply-styles',
        customColors: {
          primary: primaryColor,
          neutral: neutralColor,
          success: successColor,
          warning: warningColor,
          error: errorColor,
          info: infoColor
        }
      } 
    }, '*');
  };

  // Render color palettes
  const renderColorPalettes = () => {
    if (!colors || colors.length === 0) {
      return (
        <div className="section-empty">
          <p className="empty-state">No colors generated yet.</p>
        </div>
      );
    }

    return (
      <div className="color-section">
        <div className="color-section-inner">
          <div className="color-customizer">
            <h3>CUSTOMIZE COLORS</h3>
            <div className="color-inputs">
              <div className="color-input-group">
                <label htmlFor="primaryColor">Primary Color</label>
                <div className="color-input-wrapper">
                  <input 
                    type="color" 
                    id="primaryColor" 
                    value={primaryColor}
                    onChange={(e) => handleColorChange(e.target.value, 'primary')}
                  />
                  <input 
                    type="text" 
                    value={primaryColor}
                    onChange={(e) => handleColorChange(e.target.value, 'primary')}
                    placeholder="#RRGGBB"
                    className="color-text-input"
                  />
                </div>
              </div>
              
              <div className="color-input-group">
                <label htmlFor="neutralColor">Neutral Color</label>
                <div className="color-input-wrapper">
                  <input 
                    type="color" 
                    id="neutralColor" 
                    value={neutralColor}
                    onChange={(e) => handleColorChange(e.target.value, 'neutral')}
                  />
                  <input 
                    type="text" 
                    value={neutralColor}
                    onChange={(e) => handleColorChange(e.target.value, 'neutral')}
                    placeholder="#RRGGBB"
                    className="color-text-input"
                  />
                </div>
              </div>
              
              <div className="semantic-colors-section">
                <h4>Semantic Colors</h4>
                
                <div className="color-input-group">
                  <label htmlFor="successColor">Success</label>
                  <div className="color-input-wrapper">
                    <input 
                      type="color" 
                      id="successColor" 
                      value={successColor}
                      onChange={(e) => handleColorChange(e.target.value, 'success')}
                    />
                    <input 
                      type="text" 
                      value={successColor}
                      onChange={(e) => handleColorChange(e.target.value, 'success')}
                      placeholder="#RRGGBB"
                      className="color-text-input"
                    />
                  </div>
                </div>
                
                <div className="color-input-group">
                  <label htmlFor="warningColor">Warning</label>
                  <div className="color-input-wrapper">
                    <input 
                      type="color" 
                      id="warningColor" 
                      value={warningColor}
                      onChange={(e) => handleColorChange(e.target.value, 'warning')}
                    />
                    <input 
                      type="text" 
                      value={warningColor}
                      onChange={(e) => handleColorChange(e.target.value, 'warning')}
                      placeholder="#RRGGBB"
                      className="color-text-input"
                    />
                  </div>
                </div>
                
                <div className="color-input-group">
                  <label htmlFor="errorColor">Error</label>
                  <div className="color-input-wrapper">
                    <input 
                      type="color" 
                      id="errorColor" 
                      value={errorColor}
                      onChange={(e) => handleColorChange(e.target.value, 'error')}
                    />
                    <input 
                      type="text" 
                      value={errorColor}
                      onChange={(e) => handleColorChange(e.target.value, 'error')}
                      placeholder="#RRGGBB"
                      className="color-text-input"
                    />
                  </div>
                </div>
                
                <div className="color-input-group">
                  <label htmlFor="infoColor">Info</label>
                  <div className="color-input-wrapper">
                    <input 
                      type="color" 
                      id="infoColor" 
                      value={infoColor}
                      onChange={(e) => handleColorChange(e.target.value, 'info')}
                    />
                    <input 
                      type="text" 
                      value={infoColor}
                      onChange={(e) => handleColorChange(e.target.value, 'info')}
                      placeholder="#RRGGBB"
                      className="color-text-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="palette-display">
            <h3>COLOR PALETTE</h3>
            <div className="palette-scroll-area">
        {colors.map((palette, index) => (
          <div key={index} className="color-category">
                  <h4>{palette.category.charAt(0).toUpperCase() + palette.category.slice(1)}</h4>
            <div className="color-swatches">
              {palette.colors.map((color, colorIndex) => (
                <div key={colorIndex} className="color-swatch">
                  <div 
                    className="swatch" 
                    style={{ backgroundColor: color.hex }}
                    title={color.hex}
                  ></div>
                  <div className="swatch-name">{color.name}</div>
                        <div className="swatch-hex">{color.hex}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="action-bar">
          <button 
            className="confirm-button primary"
            onClick={onApplyColorStyles}
            disabled={isLoading}
          >
            {isLoading ? <><div className="button-spinner"></div> Applying...</> : 'Apply Color Styles to Figma'}
          </button>
        </div>
      </div>
    );
  };

  // Render text styles
  const renderTextStyles = () => {
    if (!textStyles || textStyles.length === 0) {
      return (
        <div className="section-empty">
          <p className="empty-state">No typography styles generated yet.</p>
        </div>
      );
    }

    return (
      <div className="typography-section">
        <div className="typography-section-inner">
          <div className="typography-customizer">
            <h3>CUSTOMIZE TYPOGRAPHY</h3>
            
            <div className="typography-inputs">
              <div className="typography-input-group">
                <label htmlFor="baseSize">Base Size</label>
                <div className="typography-input-wrapper">
                  <input 
                    type="number" 
                    id="baseSize" 
                    min="12" 
                    max="20" 
                    value={baseSize}
                    onChange={(e) => {
                      const newSize = parseInt(e.target.value);
                      setBaseSize(newSize);
                      updateTypographyStyles(newSize, lineHeightMultiplier, letterSpacing);
                    }}
                    className="typography-input"
                  />
                  <span className="typography-unit">px</span>
                </div>
              </div>
              
              <div className="typography-input-group">
                <label htmlFor="lineHeight">Line Height</label>
                <div className="typography-input-wrapper">
                  <input 
                    type="range" 
                    id="lineHeight" 
                    min="1" 
                    max="2" 
                    step="0.05" 
                    value={lineHeightMultiplier}
                    onChange={(e) => {
                      const newLineHeight = parseFloat(e.target.value);
                      setLineHeightMultiplier(newLineHeight);
                      updateTypographyStyles(baseSize, newLineHeight, letterSpacing);
                    }}
                    className="typography-input"
                  />
                  <span className="typography-unit">{lineHeightMultiplier.toFixed(2)}×</span>
                </div>
              </div>
              
              <div className="typography-input-group">
                <label htmlFor="letterSpacing">Letter Spacing</label>
                <div className="typography-input-wrapper">
                  <input 
                    type="range" 
                    id="letterSpacing" 
                    min="-0.05" 
                    max="0.1" 
                    step="0.01" 
                    value={letterSpacing}
                    onChange={(e) => {
                      const newLetterSpacing = parseFloat(e.target.value);
                      setLetterSpacing(newLetterSpacing);
                      updateTypographyStyles(baseSize, lineHeightMultiplier, newLetterSpacing);
                    }}
                    className="typography-input"
                  />
                  <span className="typography-unit">{letterSpacing.toFixed(2)}px</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="typography-display">
            <h3>TYPOGRAPHY STYLES</h3>
            <div className="typography-scroll-area">
        {textStyles.map((style, index) => (
                <div key={index} className="typography-preview">
                  <div className="typography-preview-header">
                    <div className="typography-name">{style.name}</div>
                    <div className="typography-specs">
                      <div className="typography-spec">
                        <svg className="typography-spec-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 7V4H20V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 20H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{style.fontSize}px</span>
                      </div>
                      <div className="typography-spec">
                        <svg className="typography-spec-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{style.lineHeight.value}px</span>
                      </div>
                      <div className="typography-spec">
                        <svg className="typography-spec-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{style.fontWeight >= 700 ? 'Bold' : style.fontWeight >= 600 ? 'Semi Bold' : style.fontWeight >= 500 ? 'Medium' : 'Regular'}</span>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="typography-sample" 
                    style={{ 
            fontSize: `${style.fontSize}px`,
            fontWeight: style.fontWeight,
                      lineHeight: `${style.lineHeight.value}px`,
                      letterSpacing: `${style.letterSpacing}px`,
                      fontFamily: 'Inter'
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="action-bar">
          <button 
            className="confirm-button primary"
            onClick={() => {
              setStatus('');
              setIsLoading(true);
              parent.postMessage({ 
                pluginMessage: { 
                  type: 'apply-styles',
                  textStyles: textStyles
                } 
              }, '*');
            }}
            disabled={isLoading}
          >
            {isLoading ? <><div className="button-spinner"></div> Applying...</> : 'Apply Typography Styles to Figma'}
          </button>
        </div>
      </div>
    );
  };

  // Render shadows
  const renderShadows = () => {
    return (
      <div className="shadow-section">
        <div className="shadow-section-inner">
        <div className="shadow-customizer">
            <h3>CUSTOMIZE SHADOWS</h3>
            <div className="shadow-inputs">
              {shadows.map((shadow, index) => (
                <div key={index} className="shadow-input-group">
                  <div className="shadow-input-header">
                    <label>{shadow.name}</label>
                  </div>
                  <div className="shadow-input-controls">
                    <div className="shadow-input-row">
                      <div className="shadow-input-field">
                        <label className="shadow-input-label">X</label>
                        <input 
                          type="number" 
                          value={shadow.x}
                          className="shadow-input shadow-input-small"
                          onChange={(e) => {
                            const newShadows = [...shadows];
                            newShadows[index].x = parseInt(e.target.value);
                            setShadows(newShadows);
                          }}
                        />
                      </div>
                      <div className="shadow-input-field">
                        <label className="shadow-input-label">Y</label>
                        <input 
                          type="number" 
                          value={shadow.y}
                          className="shadow-input shadow-input-small"
                          onChange={(e) => {
                            const newShadows = [...shadows];
                            newShadows[index].y = parseInt(e.target.value);
                            setShadows(newShadows);
                          }}
                        />
                      </div>
                      <div className="shadow-input-field">
                        <label className="shadow-input-label">Blur</label>
                        <input 
                          type="number" 
                          value={shadow.blur}
                          className="shadow-input shadow-input-small"
                          onChange={(e) => {
                            const newShadows = [...shadows];
                            newShadows[index].blur = parseInt(e.target.value);
                            setShadows(newShadows);
                          }}
                        />
                      </div>
                      <div className="shadow-input-field">
                        <label className="shadow-input-label">Spread</label>
                        <input 
                          type="number" 
                          value={shadow.spread}
                          className="shadow-input shadow-input-small"
                          onChange={(e) => {
                            const newShadows = [...shadows];
                            newShadows[index].spread = parseInt(e.target.value);
                            setShadows(newShadows);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="shadow-display">
            <h3>SHADOW TOKENS</h3>
            <div className="shadow-grid">
              {shadows.map((shadow, index) => (
                <div key={index} className="shadow-item">
                  <div 
                    className="shadow-preview" 
                    style={{ 
                      boxShadow: `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
                    }}
                  ></div>
                  <div className="shadow-details">
                    <span className="shadow-name">{shadow.name}</span>
                    <span className="shadow-specs">
                      {shadow.x}px {shadow.y}px {shadow.blur}px {shadow.spread}px
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        <div className="action-bar">
          <button 
            className="confirm-button primary"
            onClick={() => {
              setStatus('');
              setIsLoading(true);
              parent.postMessage({ 
                pluginMessage: { 
                  type: 'apply-styles',
                  shadows: shadows
                } 
              }, '*');
            }}
            disabled={isLoading}
          >
            {isLoading ? <><div className="button-spinner"></div> Applying...</> : 'Apply Shadow Tokens to Figma'}
          </button>
        </div>
      </div>
    );
  };

  // Render spacing
  const renderSpacing = () => {
    return (
      <div className="spacing-section">
        <div className='spacing-section-inner'>
        <h3>SPACING TOKENS</h3>
        <div className="spacing-tokens-container">
          <div className="spacing-visual-container">
            {spacingTokens.map((token, index) => (
              <div key={index} className="spacing-token-row">
                <div className="spacing-token-info">
                  <div className="spacing-token-name">{token.name}</div>
                  <div className="spacing-token-value">{token.value}px</div>
                </div>
                <div className="spacing-token-visual">
                  <div 
                    className="spacing-visual-bar" 
                    style={{ width: `${Math.min(token.value * 4, 200)}px` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
        <div className="action-bar">
          <button 
            className="confirm-button primary"
            onClick={() => {
              setStatus('');
              setIsLoading(true);
              parent.postMessage({ 
                pluginMessage: { 
                  type: 'apply-styles',
                  spacingTokens: spacingTokens
                } 
              }, '*');
            }}
            disabled={isLoading}
          >
            {isLoading ? <><div className="button-spinner"></div> Applying...</> : 'Apply Spacing Tokens to Figma'}
          </button>
        </div>
      </div>
    );
  };

  // Render grids
  const renderGrids = () => {
    return (
      <div className="grids-section">
        <div className="grids-section-inner">
        <div className="grid-customizer">
            <h3>CUSTOMIZE GRIDS</h3>
            <div className="grid-inputs">
              {gridTokens.map((grid, index) => (
                <div key={index} className="grid-input-group">
                  <label>{grid.name}</label>
                  <div className="grid-input-row">
                    <div className="grid-input-field">
                      <label>Columns</label>
                      <input 
                        type="number" 
                        value={grid.columns}
                        onChange={(e) => {
                          const newGrids = [...gridTokens];
                          newGrids[index].columns = parseInt(e.target.value);
                          setGridTokens(newGrids);
                        }}
                      />
                    </div>
                    <div className="grid-input-field">
                      <label>Gutter</label>
                      <input 
                        type="number" 
                        value={grid.gutter}
                        onChange={(e) => {
                          const newGrids = [...gridTokens];
                          newGrids[index].gutter = parseInt(e.target.value);
                          setGridTokens(newGrids);
                        }}
                      />
                      <span className="grid-unit">px</span>
                    </div>
                    <div className="grid-input-field">
                      <label>Margin</label>
                      <input 
                        type="number" 
                        value={grid.margin}
                        onChange={(e) => {
                          const newGrids = [...gridTokens];
                          newGrids[index].margin = parseInt(e.target.value);
                          setGridTokens(newGrids);
                        }}
                      />
                      <span className="grid-unit">px</span>
                    </div>
                  </div>
          </div>
        ))}
            </div>
          </div>
          <div className="grids-display">
            <h3>GRID TOKENS</h3>
            <div className="grids-scroll-area">
              {gridTokens.map((grid, index) => (
                <div key={index} className="grid-item">
                  <div className="grid-preview">
                    <div className="grid-visualization">
                      {Array.from({ length: grid.columns }).map((_, i) => (
                        <div key={i} className="grid-column"></div>
                      ))}
                    </div>
                  </div>
                  <div className="grid-details">
                    <span className="grid-name">{grid.name}</span>
                    <span className="grid-specs">
                      {grid.columns} columns / {grid.gutter}px gutter / {grid.margin}px margin
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        <div className="action-bar">
          <button 
            className="confirm-button primary"
            onClick={() => {
              setStatus('');
              setIsLoading(true);
              parent.postMessage({ 
                pluginMessage: { 
                  type: 'apply-styles',
                  gridTokens: gridTokens
                } 
              }, '*');
            }}
            disabled={isLoading}
          >
            {isLoading ? <><div className="button-spinner"></div> Applying...</> : 'Apply Grid Tokens to Figma'}
          </button>
        </div>
      </div>
    );
  };

  // Render confirmation button
  const renderConfirmation = () => {
    if (!showConfirmation) return null;

    return (
      <div className="confirmation-actions">
        {(colors.length > 0 || textStyles.length > 0) && (
            <button 
              onClick={onCreateDocumentation}
              className="confirm-button primary"
              aria-label="Create Documentation"
              disabled={isLoading}
            >
              {isLoading ? <><div className="button-spinner"></div> Creating...</> : 'Apply Styles & Create Documentation'}
            </button>
        )}
      </div>
    );
  };

  // Render active tab content
  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner-container">
            <div className="loading-spinner-pulse"></div>
            <div className="loading-spinner"></div>
          </div>
          <p className="loading-text">
            {activeTab === 'colors' ? 'Generating beautiful colors...' :
             activeTab === 'typography' ? 'Crafting typography styles...' :
             activeTab === 'shadows' ? 'Creating shadow tokens...' :
             activeTab === 'spacing' ? 'Defining spacing tokens...' :
             'Building grid systems...'}
          </p>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'colors':
        return renderColorPalettes();
      case 'typography':
        return renderTextStyles();
      case 'shadows':
        return renderShadows();
      case 'spacing':
        return renderSpacing();
      case 'grids':
        return renderGrids();
      default:
        return renderColorPalettes();
    }
  };

  return (
    <div className="container">
      {/* Logo and Header Section */}
      <div className="plugin-header">
        <div className="logo-container">
          <svg className="plugin-logo" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#18A0FB" />
            <path d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 28C17.7909 28 16 26.2091 16 24C16 21.7909 17.7909 20 20 20C22.2091 20 24 21.7909 24 24C24 26.2091 22.2091 28 20 28Z" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div className="header-text">
          <h1 className="plugin-title">Design System Generator</h1>
          <p className="plugin-description">Create consistent design systems</p>
        </div>
        <div className="header-buttons">
          <button 
            className="style-button"
            onClick={onApplyAllStyles}
            disabled={isLoading}
            title="Apply all styles to Figma"
          >
            {isLoading ? <div className="button-spinner"></div> : 
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 8.5L8 14L2.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="button-text">Apply Styles</span>
            </>}
          </button>
          <button 
            className="doc-button"
            onClick={onCreateDocumentation}
            disabled={isLoading}
            title="Generate documentation for all styles"
          >
            {isLoading ? <div className="button-spinner"></div> : 
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2.5V13.5C2 13.7761 2.22386 14 2.5 14H13.5C13.7761 14 14 13.7761 14 13.5V4.5C14 4.36739 13.9473 4.24021 13.8536 4.14645L11.8536 2.14645C11.7598 2.05268 11.6326 2 11.5 2H2.5C2.22386 2 2 2.22386 2 2.5Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11.5 2V4.5H14" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 7.5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M5 10.5H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="doc-button-text">Generate Documentation</span>
            </>}
          </button>
        </div>
      </div>
      
      {status && (
        <div 
          className={`status-message ${status.includes('Error') ? 'error' : 'success'} ${fadeOutStatus ? 'fade-out' : ''}`} 
          role="status" 
          aria-live="polite"
        >
          {status}
        </div>
      )}
      
      <div className="tabs-container">
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
          disabled={isLoading}
        >
            Colours
        </button>
        <button 
          className={`tab-button ${activeTab === 'typography' ? 'active' : ''}`}
          onClick={() => setActiveTab('typography')}
          disabled={isLoading}
        >
          Typography
        </button>
          <button 
            className={`tab-button ${activeTab === 'shadows' ? 'active' : ''}`}
            onClick={() => setActiveTab('shadows')}
            disabled={isLoading}
          >
            Shadows
          </button>
          <button 
            className={`tab-button ${activeTab === 'spacing' ? 'active' : ''}`}
            onClick={() => setActiveTab('spacing')}
            disabled={isLoading}
          >
            Spacings
          </button>
          <button 
            className={`tab-button ${activeTab === 'grids' ? 'active' : ''}`}
            onClick={() => setActiveTab('grids')}
            disabled={isLoading}
          >
            Grids
          </button>
        </div>
      </div>
      
      <div className="content-area">
        {renderTabContent()}
      </div>
      
      {renderConfirmation()}
    </div>
  );
}

export default App;