import { StorybookConfig } from "@storybook/nextjs"
import path from "path"

const config: StorybookConfig = {
  stories: ["../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  webpackFinal: async (config) => {
    // Handle SVG files
    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test

      if (!test) {
        return false
      }

      return test.test(".svg")
    }) as { [key: string]: any }

    imageRule.exclude = /\.svg$/

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })

    // Add PostCSS processing for Tailwind
    const cssRule = config.module?.rules?.find((rule) => {
      if (typeof rule !== 'object' || rule === null) return false
      const ruleObj = rule as any
      return ruleObj.test && ruleObj.test.toString().includes('css')
    })

    if (cssRule && Array.isArray((cssRule as any).use)) {
      const postcssLoaderIndex = (cssRule as any).use.findIndex((loader: any) => 
        loader && typeof loader === 'object' && loader.loader && loader.loader.includes('postcss-loader')
      )
      
      if (postcssLoaderIndex !== -1) {
        (cssRule as any).use[postcssLoaderIndex] = {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              plugins: [
                require('tailwindcss')(path.resolve(__dirname, '../tailwind.config.js')),
                require('autoprefixer'),
              ],
            },
          },
        }
      }
    }

    return config
  }
}

export default config
