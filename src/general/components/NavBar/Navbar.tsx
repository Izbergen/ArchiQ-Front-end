import {
    Box,
    Flex,
    HStack,
    Link,
    Text,
} from "@chakra-ui/react";
import {Container} from "@/general/components/ui/Container/Container.tsx";

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
        <Container
            pt={"4"}
            pb={'5'}
        >
            <Box
                bg="#FFFFf"
                boxShadow="2xl"
                borderRadius="2xl"
                marginBottom={"17px"}
                px={6}

                mx="auto"
                maxW="1600px"
                maxH="90px"
                alignItems="center"
            >
                <Flex alignItems="center" justify="space-between">
                    {/* Center LinksComponent.tsx */}
                    <HStack gap={'20px'}>
                        <Text textStyle="StyreneALCBold" fontSize="48px" px={'25px'}>
                            AQ
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
                    <Flex alignItems="center">
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
                        <Box
                            as="span"
                            width="3px"
                            height="20px"
                            bg="blue.primary"
                            mx={4}
                        />

                        <Link
                            href="/public"
                            textStyle="StyreneALCBold"
                            fontSize="16px"
                            _hover={{ textDecoration: "none", color: "blue.600" }}
                        >
                            Войти
                        </Link>
                    </Flex>
                </Flex>
            </Box>
        </Container>

    );
};
export default Navbar;
