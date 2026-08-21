import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        control: 'var(--radius-control)',
        panel: 'var(--radius-panel)',
        card: 'var(--radius-card)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        raised: 'var(--elevation-raised)',
        overlay: 'var(--elevation-overlay)',
      },
      maxWidth: {
        reading: 'var(--measure-reading)',
      },
      transitionDuration: {
        quick: 'var(--duration-quick)',
        standard: 'var(--duration-standard)',
      },
      transitionTimingFunction: {
        'brand-out': 'var(--ease-out)',
      },
      colors: {
        // shadcn/ui tokens
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // SSAFYnity semantic tokens
        brand: {
          navy: 'rgb(var(--brand-navy-800) / <alpha-value>)',
          dark: 'rgb(var(--brand-navy-950) / <alpha-value>)',
          DEFAULT: 'rgb(var(--brand-navy-800) / <alpha-value>)',
          hover: 'rgb(var(--brand-navy-950) / <alpha-value>)',
          soft: 'rgb(var(--brand-blue-50) / <alpha-value>)',
        },
        blue: {
          600: 'rgb(var(--brand-navy-800) / <alpha-value>)',
          700: 'rgb(var(--brand-navy-950) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--brand-navy-800) / <alpha-value>)',
          hover: 'rgb(var(--brand-navy-950) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--neutral-0) / <alpha-value>)',
          muted: 'rgb(var(--neutral-50) / <alpha-value>)',
          inverse: 'rgb(var(--brand-navy-950) / <alpha-value>)',
        },
        text: {
          DEFAULT: 'rgb(var(--neutral-950) / <alpha-value>)',
          body: 'rgb(var(--neutral-600) / <alpha-value>)',
          muted: 'rgb(var(--neutral-500) / <alpha-value>)',
          inverse: 'rgb(var(--neutral-0) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'rgb(var(--neutral-200) / <alpha-value>)',
          strong: 'rgb(var(--neutral-300) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config
