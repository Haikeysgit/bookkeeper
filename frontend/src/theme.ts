import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const colors = {
    brand: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6', // blue-500
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
    },
    purple: {
        500: '#a855f7',
        600: '#9333ea', // purple-600
        700: '#7e22ce',
    },
    pink: {
        500: '#ec4899', // pink-500
    },
    surface: {
        bg: '#F7FAFC',
        card: '#FFFFFF',
    },
    premium: {
        gradient: 'linear-gradient(to right, #3b82f6, #9333ea, #ec4899)', // Blue -> Purple -> Pink
        gradientHover: 'linear-gradient(to right, #2563eb, #7e22ce, #db2777)',
    },
};

const components = {
    Button: {
        baseStyle: {
            fontWeight: '600',
            borderRadius: 'xl',
            _focus: {
                boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
            },
        },
        variants: {
            solid: (props: any) => ({
                bgGradient: props.colorScheme === 'brand' ? 'linear(to-r, brand.500, purple.600)' : undefined,
                color: 'white',
                _hover: {
                    bgGradient: props.colorScheme === 'brand' ? 'linear(to-r, brand.600, purple.700)' : undefined,
                    transform: 'translateY(-1px)',
                    boxShadow: 'lg',
                },
                _active: {
                    transform: 'translateY(0)',
                    boxShadow: 'md',
                },
                transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
            }),
            ghost: {
                _hover: {
                    bg: 'brand.50',
                    color: 'brand.600',
                },
            },
            gradient: {
                bgGradient: 'linear(to-r, brand.500, purple.600, pink.500)',
                color: 'white',
                _hover: {
                    filter: 'brightness(1.1)',
                    transform: 'translateY(-1px)',
                    boxShadow: 'xl',
                },
                _active: {
                    transform: 'translateY(0)',
                },
            }
        },
        defaultProps: {
            colorScheme: 'brand',
        },
    },
    Card: {
        baseStyle: {
            container: {
                borderRadius: '2xl',
                boxShadow: 'xl',
                bg: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid',
                borderColor: 'whiteAlpha.300',
                transition: 'all 0.3s ease',
                _hover: {
                    transform: 'translateY(-4px)',
                    boxShadow: '2xl',
                    borderColor: 'brand.200',
                },
            },
        },
    },
    Heading: {
        baseStyle: {
            color: 'gray.800',
            letterSpacing: '-0.02em',
        },
    },
};

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode('gray.50', 'gray.900')(props),
            color: 'gray.700',
            backgroundImage: mode(
                'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.05) 0%, rgba(255, 255, 255, 0) 90%)',
                'none'
            )(props),
            backgroundAttachment: 'fixed',
        },
    }),
};

const theme = extendTheme({ config, colors, fonts: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif" }, components, styles });

export default theme;
