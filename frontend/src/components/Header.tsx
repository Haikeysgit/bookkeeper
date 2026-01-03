import {
    Flex,
    Heading,
    HStack,
    Text,
    Box,
    Container,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Avatar,
    IconButton,
    InputGroup,
    InputLeftElement,
    Input,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { Bell, Search, Settings, LogOut, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
    userName?: string;
}

const Header = ({ userName }: HeaderProps) => {
    const { logout, user } = useAuth0();
    const displayName = userName || user?.name || user?.email || 'User';

    const handleSignOut = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return (
        <Box
            as="header"
            position="sticky"
            top={0}
            zIndex={100}
            bgGradient="linear(to-r, brand.500, purple.600, pink.500)"
            boxShadow="lg"
            h="80px"
        >
            {/* Glass Overlay */}
            <Box
                w="full"
                h="full"
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                borderBottom="1px solid"
                borderColor="whiteAlpha.200"
            >
                <Container maxW="container.xl" h="full">
                    <Flex h="full" alignItems="center" justifyContent="space-between">
                        {/* Logo Section */}
                        <HStack spacing={4} as={motion.div} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <Box
                                bg="white"
                                w={10}
                                h={10}
                                borderRadius="xl"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                boxShadow="0 0 20px rgba(255,255,255,0.3)"
                            >
                                <Text
                                    bgGradient="linear(to-br, brand.500, purple.600)"
                                    bgClip="text"
                                    fontWeight="900"
                                    fontSize="2xl"
                                >
                                    B
                                </Text>
                            </Box>
                            <Heading size="md" color="white" fontWeight="700" letterSpacing="tight">
                                Book<Text as="span" opacity={0.8} fontWeight="400">Keeper</Text>
                            </Heading>
                        </HStack>

                        {/* Search Bar (Hidden on mobile) */}
                        <InputGroup maxW="320px" display={{ base: 'none', md: 'block' }}>
                            <InputLeftElement pointerEvents="none">
                                <Search size={18} color="rgba(255,255,255,0.7)" />
                            </InputLeftElement>
                            <Input
                                placeholder="Search library..."
                                variant="filled"
                                bg="whiteAlpha.200"
                                border="1px solid"
                                borderColor="whiteAlpha.300"
                                color="white"
                                _placeholder={{ color: 'whiteAlpha.700' }}
                                _hover={{ bg: 'whiteAlpha.300' }}
                                _focus={{ bg: 'whiteAlpha.300', borderColor: 'whiteAlpha.500' }}
                                borderRadius="full"
                            />
                        </InputGroup>


                        {/* Right Section */}
                        <HStack spacing={6}>
                            {/* Notifications */}
                            <Box position="relative" cursor="pointer">
                                <IconButton
                                    aria-label="Notifications"
                                    icon={<Bell size={22} />}
                                    variant="ghost"
                                    color="white"
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                    borderRadius="full"
                                />
                                <Badge
                                    position="absolute"
                                    top={1}
                                    right={1}
                                    bg="red.500"
                                    color="white"
                                    borderRadius="full"
                                    boxSize="18px"
                                    fontSize="10px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    border="2px solid"
                                    borderColor="transparent"
                                >
                                    3
                                </Badge>
                            </Box>

                            {/* User Profile */}
                            <Menu>
                                <MenuButton
                                    as={motion.button}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    cursor="pointer"
                                >
                                    <HStack spacing={3} bg="whiteAlpha.200" p={1.5} pr={4} borderRadius="full" border="1px solid" borderColor="whiteAlpha.300">
                                        <Avatar
                                            size="sm"
                                            name={displayName}
                                            src={user?.picture}
                                            border="2px solid white"
                                        />
                                        <Text color="white" fontWeight="600" fontSize="sm" display={{ base: 'none', md: 'block' }}>
                                            {displayName.split(' ')[0]}
                                        </Text>
                                        <ChevronDown size={14} color="white" />
                                    </HStack>
                                </MenuButton>
                                <MenuList
                                    boxShadow="2xl"
                                    borderRadius="xl"
                                    p={2}
                                    borderColor="gray.100"
                                    zIndex={100}
                                >
                                    <Box px={4} py={3}>
                                        <Text fontWeight="bold" color="gray.800">{displayName}</Text>
                                        <Text fontSize="xs" color="gray.500">{user?.email}</Text>
                                    </Box>
                                    <MenuDivider />
                                    <MenuItem icon={<Settings size={16} />} borderRadius="lg">Settings</MenuItem>
                                    <MenuItem icon={<Bell size={16} />} borderRadius="lg">Notifications</MenuItem>
                                    <MenuDivider />
                                    <MenuItem
                                        icon={<LogOut size={16} />}
                                        color="red.600"
                                        onClick={handleSignOut}
                                        borderRadius="lg"
                                        _hover={{ bg: 'red.50' }}
                                    >
                                        Sign Out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </HStack>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
};

export default Header;
