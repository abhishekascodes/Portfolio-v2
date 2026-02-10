"use client";

import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Marquee } from "@/components/marquee";
import { HeroSection } from "@/sections/hero";
import { AboutSection } from "@/sections/about";
import { SkillsSection } from "@/sections/skills";
import { ProjectsSection } from "@/sections/projects";
import { AwardsSection } from "@/sections/awards";
import { ContactSection } from "@/sections/contact";

export default function Home() {
    return (
        <SmoothScroll>
            <Navbar />
            <main>
                <HeroSection />
                <Marquee text="ROBOTICS · OS DEV · AI · IoT · SECURITY · 3D PRINTING" variant="outline" speed={35} />
                <AboutSection />
                <Marquee text="BUILDING FROM BARE METAL" variant="gold" speed={25} />
                <SkillsSection />
                <ProjectsSection />
                <Marquee text="INNOVATE · ENGINEER · CREATE · DISRUPT" variant="default" speed={40} />
                <AwardsSection />
                <ContactSection />
            </main>
            <Footer />
        </SmoothScroll>
    );
}
