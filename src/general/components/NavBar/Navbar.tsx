import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton
} from "@chakra-ui/react";
import { LuCircleUser } from "react-icons/lu";
import {Container} from "@/general/components/ui/Container/Container.tsx";
import { useNavigate } from "react-router-dom";
import {useTokens} from "@/general/hooks/useToken.ts";

const productList = [
    {text: "All products" , href: "/residential-complexes" },
    {text: "Apartments" , href: "/apartments" },
    {text: "Parking" , href: "/parking" },
    {text: "Boxrooms", href: "/boxrooms" },
    {text: "Commerce", href: "/commerce" },
];

const utilList = [
    {text: "Ai-assistant", href: "https://t.me/archiq_agent_bot"}

];

const Navbar = () => {
    const navigate = useNavigate();
    const token = useTokens();
    const isLoggedIn = token.getAccessToken();
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
                        <Link href={'/'} textStyle="StyreneALCBold" fontSize="48px" px={'25px'}>
                            AQ
                        </Link>
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
                        {isLoggedIn ? (
                            <IconButton
                                aria-label="User Profile"
                                variant="ghost"
                                onClick={() => navigate("/user")}
                                fontSize="24px"
                                borderRadius="full"
                            >
                                <LuCircleUser size={'30px'}/>
                            </IconButton>
                        ) : (
                            <Link
                                href="/auth"
                                textStyle="StyreneALCBold"
                                fontSize="16px"
                                _hover={{ textDecoration: "none", color: "blue.600" }}
                            >
                                Войти
                            </Link>
                        )}
                    </Flex>
                </Flex>
            </Box>
        </Container>

    );
};
export default Navbar;
