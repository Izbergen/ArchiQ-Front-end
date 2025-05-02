import Header from "./_general/components/header.tsx"
import {Container} from "@/general/components/ui/Container/Container.tsx";
import SDUPNG from '@/general/assets/colors/sdu.png'
import Banner from "@/pages/project/_general/components/Banner.tsx";
export default function ProjectPage() {
    return (
        <Container>
            <Header project={{title: "Project", about_link:"hello", gallery_link: "hello", pdf_link:"hello"}}/>
            <Banner url={SDUPNG}></Banner>
        </Container>

    );
};

