import React from 'react';
import { LinksComponent } from '@/general/components/LinksComponent/Links.tsx';
import {HStack, Link, VStack, Center} from '@chakra-ui/react';
import {Container} from "@/general/components/ui/Container/Container.tsx";
import {FONTS} from "@/general/constants";

const Footer: React.FC = () => {
    const Projects = [
        { subtitle: 'All projects', link: '/allprojects' },
        { subtitle: 'apartments',   link: '/apartments'   },
        { subtitle: 'Parking',      link: '/parking'      },
        { subtitle: 'Boxrooms',     link: '/boxrooms'     },
        { subtitle: 'Commerce',     link: '/commerce'     },
    ];

    const Contacts = [
        { subtitle: 'Sales office',      link: '/sales'     },
        { subtitle: 'Service centers',   link: '/services'  },
        { subtitle: 'Instagram',         link: 'https://www.instagram.com/herztard/' },
        { subtitle: 'Telegram',          link: 'https://t.me/herztard'  },
        { subtitle: 'WhatsApp',          link: 'https://wa.me/77762827898'  },
    ];

    const AboutCompany = [
        { subtitle: 'About us', link: '/about'   },
        { subtitle: 'History',  link: '/history' },
    ];

    return (
        <Center bg={'white'}  as="footer"  pt={'80px'} pb={'94px'}>
            <Container>
                <HStack align="start" width={'full'} wrap="wrap" mx={"auto"} justifyContent="space-around" >
                    {/* Projects */}
                    <LinksComponent title="Projects" items={Projects} />

                    {/* Contacts */}
                    <LinksComponent title="Contacts" items={Contacts} />

                    {/* About Company */}
                    <LinksComponent title="About Company" items={AboutCompany} />

                    {/* Address + AI-Assistant */}
                    <VStack align="start" gap={2}>
                        <LinksComponent title={"Almaty, Kazakhstan"} items={[{subtitle: "Ablyaikhan st.", link: ""}]} />
                        <Link href={'https://t.me/archiq_agent_bot'} fontSize={'36px'} color={'#52A0FF'} fontFamily={FONTS.StyreneALC.BOLD}>AI assistance</Link>
                        <LinksComponent title={"+7 777 777 77 77"} />
                    </VStack>
                </HStack>

            </Container>
        </Center>
    );
};

export default Footer;
