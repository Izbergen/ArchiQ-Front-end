import React from 'react';
import { LinksComponent } from '@/general/components/LinksComponent/Links.tsx';
import {HStack, VStack, Center} from '@chakra-ui/react';
import {Container} from "@/general/components/ui/Container/Container.tsx";

const Footer: React.FC = () => {
    const Projects = [
        { subtitle: 'All projects', link: '/allprojects' },
        { subtitle: 'Apartments',   link: '/apartments'   },
        { subtitle: 'Parking',      link: '/parking'      },
        { subtitle: 'Boxrooms',     link: '/boxrooms'     },
        { subtitle: 'Commerce',     link: '/commerce'     },
    ];

    const Contacts = [
        { subtitle: 'Sales office',      link: '/sales'     },
        { subtitle: 'Service centers',   link: '/services'  },
        { subtitle: 'Instagram',         link: '/instagram' },
        { subtitle: 'Telegram',          link: '/telegram'  },
        { subtitle: 'WhatsApp',          link: '/whatsapp'  },
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

                        <LinksComponent title={"AI-Assistant"} />
                        <LinksComponent title={"+7 777 777 77 77"} />
                    </VStack>
                </HStack>

            </Container>
        </Center>
    );
};

export default Footer;
