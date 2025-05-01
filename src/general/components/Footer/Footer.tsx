import React from 'react';
import { LinksComponent } from '@/general/components/LinksComponent/Links.tsx';
import {HStack, VStack,  Box} from '@chakra-ui/react';

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
        <Box bg={'white'}  as="footer"  minH={"401px"} maxW={"1500px"} mx={'auto'} display={'flex'} flexDirection={"column"} justifyContent={'center'}>
            <HStack align="start" width={'full'} wrap="wrap" mx={"auto"} justifyContent="space-between" >
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
        </Box>
    );
};

export default Footer;
