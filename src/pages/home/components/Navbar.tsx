import {
    Box,
    Flex,
    HStack,
    Link,
    Text,
} from "@chakra-ui/react";
const productList = [
    {text: "All products" , href: "/products" },
    {text: "Apartments" , href: "/apartments" },
    {text: "Parking" , href: "/parking" },
    {text: "Boxrooms", href: "/boxrooms" },
    {text: "Commerce", href: "/commerce" },
];
const utilList = [
    {text: "About company", href: "/about"},
    {text: "Contacts", href: "/contacts"},
    {text: "Ai-assistant", href: "/ai-assistant"}

];

const Navbar = () => {
    return (
        <Box
            bg="white"
            boxShadow="lg"
            borderRadius="2xl"
            py={4}
            px={6}
            my={17}
            mx="auto"
            maxW="1600px"
            maxH="90px"
        >
            <Flex align="center" justify="space-between">
                {/* Logo */}


                {/* Center Links */}
                <HStack gap={'20px'}>
                    <Text textStyle="StyreneALCBold" fontSize="48px" px={'25px'}>
                        ARCHIQ
                    </Text>
                    {productList.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            textStyle="StyreneALCBold"
                            fontSize="16px"
                            _hover={{ textDecoration: "none", color: "blue.600" }}
                        >
                            {item.text}
                        </Link>
                    ))}
                </HStack>

                {/* Right Utilities + Divider + Login */}
                <Flex align="center">
                    <HStack gap={'20px'}>
                        {utilList.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                textStyle="StyreneALCBold"
                                fontSize="16px"
                                _hover={{ textDecoration: "none", color: "blue.600" }}
                            >
                                {item.text}
                            </Link>
                        ))}
                    </HStack>

                    {/* Vertical Rule */}
                    {/*<Divider*/}
                    {/*    orientation="vertical"*/}
                    {/*    height="24px"*/}
                    {/*    mx={6}*/}
                    {/*    borderColor="gray.300"*/}
                    {/*/>*/}
                    <Box
                        as="span"
                        width="3px"
                        height="20px"
                        bg="blue.600"
                        mx={4}
                    />

                    <Link
                        href="/"
                        textStyle="StyreneALCBold"
                        fontSize="16px"
                        _hover={{ textDecoration: "none", color: "blue.600" }}
                    >
                        Войти
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};
export default Navbar;
