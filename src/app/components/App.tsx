import React, { useState, useEffect, useRef } from 'react';
import '../styles/ui.css';

function App() {
  const [status, setStatus] = useState('');
  const [colors, setColors] = useState([]);
  const [textStyles, setTextStyles] = useState([]);
  const [activeTab, setActiveTab] = useState('colors'); // 'colors' or 'typography'
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGeneratedStyles, setHasGeneratedStyles] = useState(false);
  const [colorVariation, setColorVariation] = useState(0);
  const [textVariation, setTextVariation] = useState(0);
  const [fadeOutStatus, setFadeOutStatus] = useState(false);
  
  // Use a ref to track the timeout
  const statusTimeoutRef = useRef(null);

  const onGenerateStyles = () => {
    setStatus('');
    setIsLoading(true);
    parent.postMessage({ pluginMessage: { type: 'generate-styles' } }, '*');
  };

  const onCreateDocumentation = () => {
    setStatus('');
    setIsLoading(true);
    parent.postMessage({ pluginMessage: { type: 'create-documentation' } }, '*');
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

  useEffect(() => {
    // Adjust plugin size based on content
    const resizePlugin = () => {
      const height = document.body.scrollHeight;
      parent.postMessage({ 
        pluginMessage: { 
          type: 'resize', 
          width: 360, 
          height: Math.min(Math.max(height + 40, 500), 700) 
        } 
      }, '*');
    };

    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message, colors: colorData, textStyles: textStylesData, colorVariation: colorVar, textVariation: textVar } = event.data.pluginMessage;
      
      setIsLoading(false);
      
      if (type === 'styles-generated') {
        if (colorData) {
          setColors(colorData);
          setColorVariation(colorVar);
        }
        if (textStylesData) {
          setTextStyles(textStylesData);
          setTextVariation(textVar);
        }
        setStatusWithFade(`Design styles generated. Review and create documentation when satisfied.`);
        setShowConfirmation(true);
        setHasGeneratedStyles(true);
      } else if (type === 'success') {
        setStatusWithFade(message || 'Operation completed successfully');
      } else if (type === 'error') {
        setStatusWithFade(`Error: ${message}`, true);
      }
      
      // Resize plugin after content changes
      setTimeout(resizePlugin, 100);
    };

    // Initial resize
    resizePlugin();

    // Clean up event listener and timeout on unmount
    return () => {
      window.onmessage = null;
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  // Render color swatches
  const renderColorPalettes = () => {
    if (!colors || colors.length === 0) {
      return (
        <div className="section-empty">
          <p className="empty-state">No colors generated yet.</p>
        </div>
      );
    }

    return (
      <div className="color-palettes">
        {colorVariation > 0 && (
          <div className="variation-badge">Variation {colorVariation}</div>
        )}
        
        {colors.map((palette, index) => (
          <div key={index} className="color-category">
            <h3>{palette.category.charAt(0).toUpperCase() + palette.category.slice(1)}</h3>
            <div className="color-swatches">
              {palette.colors.map((color, colorIndex) => (
                <div key={colorIndex} className="color-swatch">
                  <div 
                    className="swatch" 
                    style={{ backgroundColor: color.hex }}
                    title={color.hex}
                  ></div>
                  <div className="swatch-name">{color.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render text styles
  const renderTextStyles = () => {
    if (!textStyles || textStyles.length === 0) {
      return (
        <div className="section-empty">
          <p className="empty-state">No text styles generated yet.</p>
        </div>
      );
    }

    return (
      <div className="text-styles">
        {textVariation > 0 && (
          <div className="variation-badge">Variation {textVariation}</div>
        )}
        
        {textStyles.map((style, index) => (
          <div key={index} className="text-style-example" style={{
            fontSize: `${style.fontSize}px`,
            fontWeight: style.fontWeight,
            lineHeight: `${style.lineHeight}px`,
          }}>
            <div className="text-style-name">{style.name}</div>
            <div className="text-style-preview">The quick brown fox</div>
          </div>
        ))}
      </div>
    );
  };

  // Render confirmation buttons
  const renderConfirmation = () => {
    if (!showConfirmation) return null;

    return (
      <div className="confirmation-actions">
        {(colors.length > 0 || textStyles.length > 0) && (
          <>
            <button 
              onClick={onGenerateStyles}
              className="confirm-button secondary"
              aria-label="Generate Alternative Styles"
              disabled={isLoading}
            >
              {isLoading ? <><div className="button-spinner"></div> Generating...</> : 'Generate Alternative Styles'}
            </button>
            
            <button 
              onClick={onCreateDocumentation}
              className="confirm-button primary"
              aria-label="Create Documentation"
              disabled={isLoading}
            >
              {isLoading ? <><div className="button-spinner"></div> Creating...</> : 'Apply Styles & Create Documentation'}
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      {status && (
        <div 
          className={`status-message ${status.includes('Error') ? 'error' : 'success'} ${fadeOutStatus ? 'fade-out' : ''}`} 
          role="status" 
          aria-live="polite"
        >
          {status}
        </div>
      )}
      
      {!hasGeneratedStyles && (
        <div className="generate-button-container">
          <button 
            onClick={onGenerateStyles}
            className="generate-button"
            aria-label="Generate Design Styles"
            disabled={isLoading}
          >
            {isLoading ? (
              <><div className="button-spinner"></div> Generating...</>
            ) : (
              'Generate Design Styles'
            )}
          </button>
        </div>
      )}
      
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
          disabled={isLoading}
        >
          Colors
        </button>
        <button 
          className={`tab-button ${activeTab === 'typography' ? 'active' : ''}`}
          onClick={() => setActiveTab('typography')}
          disabled={isLoading}
        >
          Typography
        </button>
      </div>
      
      <div className="content-area">
        {activeTab === 'colors' ? (
          isLoading && colors.length === 0 ? (
            <div className="loading-container">
              <div className="loading-spinner-container">
                <div className="loading-spinner-pulse"></div>
                <div className="loading-spinner"></div>
              </div>
              <p className="loading-text">Generating beautiful colors...</p>
            </div>
          ) : (
            renderColorPalettes()
          )
        ) : (
          isLoading && textStyles.length === 0 ? (
            <div className="loading-container">
              <div className="loading-spinner-container">
                <div className="loading-spinner-pulse"></div>
                <div className="loading-spinner"></div>
              </div>
              <p className="loading-text">Crafting typography styles...</p>
            </div>
          ) : (
            renderTextStyles()
          )
        )}
      </div>
      
      {renderConfirmation()}
    </div>
  );
}

export default App;
