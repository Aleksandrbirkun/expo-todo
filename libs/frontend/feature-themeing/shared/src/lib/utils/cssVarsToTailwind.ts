import { readFileSync } from 'fs';
import {  resolve } from 'path';

/**
 * Dynamically extracts color CSS variables from global.css and generates Tailwind color configuration
 */
export function createTailwindColorsFromCssVars(cssFilePath?: string) {
  // Find the monorepo root by going up from current working directory
  let projectRoot = process.cwd();
  // If we're in apps/web, go up two levels to get to the monorepo root
  if (projectRoot.includes('/apps/')) {
    projectRoot = resolve(projectRoot, '../..');
  }
  const defaultPath = resolve(projectRoot, 'libs/frontend/feature-themeing/shared/src/lib/global.css');
  const filePath = cssFilePath || defaultPath;
  
  try {
    const cssContent = readFileSync(filePath, 'utf-8');
    
    // Extract all CSS variables that appear to be colors (excluding fonts, shadows, etc.)
    const colorVarRegex = /--([a-zA-Z-]+):\s*(?:#[0-9a-fA-F]{3,8}|hsl\([^)]+\)|rgb\([^)]+\)|[a-zA-Z]+);/g;
    
    const colorVars: string[] = [];
    let match;
    
    while ((match = colorVarRegex.exec(cssContent)) !== null) {
      const varName = match[1];
      
      // Skip non-color variables
      if (!varName.includes('font') && 
          !varName.includes('shadow') && 
          !varName.includes('radius') && 
          !varName.includes('tracking') && 
          !varName.includes('spacing')) {
        colorVars.push(varName);
      }
    }
    
    // Remove duplicates and sort
    const uniqueColorVars = [...new Set(colorVars)].sort();
    
    // Build the Tailwind colors object
    const colors: Record<string, any> = {};
    
    for (const varName of uniqueColorVars) {
      const cssVarRef = `var(--${varName})`;
      
      // Handle compound color names (e.g., "primary-foreground", "card-foreground")
      if (varName.includes('-')) {
        const parts = varName.split('-');
        const baseColor = parts[0];
        const variant = parts.slice(1).join('-');
        
        // If this is a foreground variant, create nested structure
        if (variant === 'foreground') {
          if (!colors[baseColor]) {
            colors[baseColor] = {
              DEFAULT: `var(--${baseColor})`,
              foreground: cssVarRef,
            };
          } else if (typeof colors[baseColor] === 'string') {
            // Convert string to object if needed
            colors[baseColor] = {
              DEFAULT: colors[baseColor],
              foreground: cssVarRef,
            };
          } else {
            colors[baseColor].foreground = cssVarRef;
          }
        } else {
          // Handle other compound names like "sidebar-primary"
          if (!colors[baseColor]) {
            colors[baseColor] = {};
          }
          if (typeof colors[baseColor] === 'string') {
            const existingValue = colors[baseColor];
            colors[baseColor] = { DEFAULT: existingValue };
          }
          colors[baseColor][variant] = cssVarRef;
        }
      } else {
        // Simple color name
        if (!colors[varName]) {
          colors[varName] = cssVarRef;
        }
      }
    }
    
    return colors;
  } catch (error) {
    console.error('Error reading CSS file:', error);
    return {};
  }
}
