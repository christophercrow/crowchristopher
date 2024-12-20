import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ScrollContainer, ScrollPage, Animator, batch, Sticky, Fade, MoveIn, ZoomIn } from 'react-scroll-motion';
import { Link } from 'react-router-dom';
import Cursor from "../../components/Cursor"; // Reintroduce your custom cursor component




export default function MyJourney() {
  // Animation presets
  const FadeInUp = batch(Sticky(), Fade(), MoveIn(0, 100));
  const FadeInFromLeft = batch(Sticky(), Fade(), MoveIn(-100, 0));
  const FadeInFromRight = batch(Sticky(), Fade(), MoveIn(100, 0));
  const ZoomFadeIn = batch(Sticky(), Fade(), ZoomIn());

  // Interactive state for the welcome message
  const [showMore, setShowMore] = useState(false);

  // State to determine if tablet or not (optional)
  const [tablet, setTablet] = useState(false);

  useEffect(() => {
    function handleResize() {
      setTablet(window.innerWidth < 1024);
    }
    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <JourneyWrapper>
      <HomeLink to="/">← Home</HomeLink>
      <ScrollContainer>

        {/* Interactive Welcome */}
        <ScrollPage>
          <Animator animation={ZoomFadeIn}>
            <WelcomeWrapper>
              <WelcomeTitle>
                Hey there, <NameHighlight>I'm Chris</NameHighlight>.
              </WelcomeTitle>
              <WelcomeText>
                Welcome to my digital scrapbook. Think of this as a guided tour through my evolution from a curious fifth-grader tinkering with hardware to a future-minded cybersecurity enthusiast.
              </WelcomeText>
              {!showMore && (
                <ShowMoreButton onClick={() => setShowMore(true)}>
                  Want to learn more about me before we begin? Click here!
                </ShowMoreButton>
              )}
              {showMore && (
                <MoreInfo>
                  <p>Fun Fact: My first "OMG computers are awesome" moment came when I saw the inside of a PC tower and realized it was like a puzzle waiting to be solved.</p>
                  <p>Keep scrolling, and I'll show you how that spark turned into a journey across astrophysics, programming, and cybersecurity.</p>
                </MoreInfo>
              )}
              <InstructionText>Just scroll down to start the story ↓</InstructionText>
            </WelcomeWrapper>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        {/* Introduction */}
        <ScrollPage>
          <Animator animation={ZoomFadeIn}>
            <SectionText>
              <Highlight>In the fifth grade, my world changed forever</Highlight> when I helped my father build his very own computer, bridging circuits and silicon into something magical.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        <ScrollPage>
          <Animator animation={FadeInUp}>
            <SectionText>
              As each <GradHighlight>cable clicked into place</GradHighlight>, I saw more than parts; I saw an intricate tapestry of logic and possibility.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        <ScrollPage>
          <Animator animation={FadeInFromLeft}>
            <SectionText>
              Soon, I became inseparable from our family computer, <GradHighlight>navigating the internet</GradHighlight> like a curious traveler, hungry for knowledge and inspired by the ways technology empowers us.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        {/* Early Security Realization */}
        <ScrollPage>
          <Animator animation={FadeInFromRight}>
            <SectionText>
              In those early days, I stumbled upon Wireshark, using it playfully in old Call of Duty lobbies. But beneath the thrill, I discovered something profound: our digital footprints are surprisingly visible.  
              That revelation sparked a growing awareness of <GradHighlight>internet security</GradHighlight> and privacy.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        {/* Middle School Tech Growth */}
        <ScrollPage>
          <Animator animation={FadeInUp}>
            <SectionText>
              By middle school, still without my own PC, I cherished my humble laptop. Determined to shield my online presence, I explored network protocols, set up an OpenVPN instance, and learned how data slides through hidden passages of the web.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        <ScrollPage>
          <Animator animation={FadeInFromLeft}>
            <SectionText>
              Experimenting with a <GradHighlight>dual-boot of Linux and Windows</GradHighlight>, I embraced the beauty of system diversity and the freedom it granted me as a budding technologist.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        {/* High School Decision */}
        <ScrollPage>
          <Animator animation={FadeInFromRight}>
            <SectionText>
              Approaching high school felt like standing at a crossroads: Should I pursue college, devote myself to sports, or just follow the tides of normality?
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />
        
        <ScrollPage>
          <Animator animation={FadeInUp}>
            <SectionText>
              Then I discovered the <GradHighlight>North Carolina School of Science and Mathematics (NCSSM)</GradHighlight>. Its reputation as the nation's top public high school felt distant and unattainable, yet I dared to dream.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />
        
        <ScrollPage>
          <Animator animation={ZoomFadeIn}>
            <SectionText>
              To my astonishment, I was accepted—proof that even a rural student, with a calculus class of barely five peers, could find a place in a realm of intellectual brilliance.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        {/* NCSSM & Astrophysics */}
        <ScrollPage>
          <Animator animation={FadeInFromLeft}>
            <SectionText>
              At NCSSM, I encountered the elegance of physics. An initial placement in Pre-Calculus stung my pride, but I transformed that setback into motivation, self-studying calculus, and blazing through AP exams with relentless determination.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        <ScrollPage>
          <Animator animation={FadeInFromRight}>
            <SectionText>
              Soon, I navigated higher-level math and <GradHighlight>fell headfirst into astrophysics</GradHighlight>. Each formula and concept revealed layers of the universe, leaving me mesmerized and eager to explore cosmic mysteries.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        {/* Programming Introduction */}
        <ScrollPage>
          <Animator animation={FadeInUp}>
            <SectionText>
              My advanced physics courses nudged me into programming—C++, R, and especially Python—tools that let me model phenomena, manipulate data, and give life to abstract equations.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        <ScrollPage>
          <Animator animation={ZoomFadeIn}>
            <SectionText>
              With Python's gentle syntax and vast libraries, I learned to <GradHighlight>bridge knowledge and computation</GradHighlight>, turning scattered numbers into vivid insights.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        {/* College at UNC */}
        <ScrollPage>
          <Animator animation={FadeInFromLeft}>
            <SectionText>
              At the University of North Carolina at Chapel Hill, I encountered a structured academic environment that felt stifling—much of the curriculum overlapped with what I'd already mastered.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        <ScrollPage>
          <Animator animation={FadeInFromRight}>
            <SectionText>
              This struggle led to a revelation: I had ADHD. Understanding this allowed me to seek proper strategies and accommodations, unlocking a new era of confidence and focus.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        {/* Research with Dr. Rodriguez */}
        <ScrollPage>
          <Animator animation={FadeInUp}>
            <SectionText>
              Armed with newfound clarity, I approached professors about research and connected with <GradHighlight>Dr. Carl Rodriguez</GradHighlight>, whose astrophysics research enthralled me.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        <ScrollPage>
          <Animator animation={FadeInFromLeft}>
            <SectionText>
              After proving my coding abilities, I joined his lab as a sophomore. Unlike typical undergraduate roles, I was entrusted with an independent project investigating the mass gap between neutron stars and black holes.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        <ScrollPage>
          <Animator animation={FadeInFromRight}>
            <SectionText>
              In this realm of data analysis, GitHub repositories, and HPC clusters, I refined my Bash scripting, learned to build robust pipelines, and contributed to COSMIC, a powerful Python package simulating large binary star populations.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        {/* Return to Cybersecurity */}
        <ScrollPage>
          <Animator animation={FadeInUp}>
            <SectionText>
              Meanwhile, my original fascination with computing quietly re-emerged. Between astrophysical simulations and research deadlines, I found myself curious about the <GradHighlight>secure foundations of our digital world</GradHighlight>.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        <ScrollPage>
          <Animator animation={ZoomFadeIn}>
            <SectionText>
              Revisiting Nmap, Wireshark, and Burp Suite felt like reuniting with old friends. I set up a home server, experimented with cyber labs, and learned both red and blue team strategies to understand vulnerabilities from every angle.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        {/* Future in Cybersecurity */}
        <ScrollPage>
          <Animator animation={FadeInFromLeft}>
            <SectionText>
              Now, as I near the completion of my astrophysics degree, I turn my gaze from the stars to the servers, from cosmic evolution to network security.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        <ScrollPage>
          <Animator animation={FadeInFromRight}>
            <SectionText>
              I will blend the analytical precision I honed modeling binary star systems with the tactical ingenuity demanded by modern cybersecurity, eager to protect the digital infrastructure we rely on.
            </SectionText>
          </Animator>
        </ScrollPage>

        <ScrollPage />

        {/* Socials Page */}
        <ScrollPage>
          <Animator animation={FadeInUp}>
            <SocialsWrapper>
              <SectionText style={{marginBottom: '2rem'}}>
                <GradHighlight>Connect with Me</GradHighlight>
              </SectionText>
              <SocialLink href="https://www.linkedin.com/in/christopher-crow-915288240/" target="_blank">LinkedIn</SocialLink>
              <SocialLink href="mailto:cecrow@unc.edu">Email</SocialLink>
            </SocialsWrapper>
          </Animator>
        </ScrollPage>

      </ScrollContainer>
      {!tablet && <Cursor />} {/* Show custom cursor if not tablet */}
    </JourneyWrapper>
  );
}

const JourneyWrapper = styled.div`
  background: #111;
  color: #f0f0f0;
  font-family: 'Space Grotesk', sans-serif;
  position: relative;
`;

const HomeLink = styled(Link)`
  position: fixed;
  top: 1rem;
  left: 1rem;
  color: #f0f0f0;
  text-decoration: none;
  z-index: 999;
  font-size: 1.2rem;

  &:hover {
    color: #FF9A8B;
  }
`;

/* Welcome Section */
const WelcomeWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const WelcomeText = styled.p`
  font-size: 1.4rem;
  line-height: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NameHighlight = styled.span`
  background: linear-gradient(45deg, #F78CA0, #F9748F, #FD868C, #FE9A8B);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const ShowMoreButton = styled.button`
  background: #222;
  color: #f0f0f0;
  border: 2px solid #f0f0f0;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background: #444;
  }
`;

const MoreInfo = styled.div`
  font-size: 1.2rem;
  line-height: 1.75rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InstructionText = styled.p`
  font-size: 1rem;
  color: #888;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const SectionText = styled.p`
  font-size: 1.4rem;
  margin: 0 auto;
  width: 70%;
  text-align: center;
  line-height: 2.1rem;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    width: 85%;
  }
`;

const Highlight = styled.span`
  background: linear-gradient(45deg, #F78CA0, #F9748F, #FD868C, #FE9A8B);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
`;

const GradHighlight = styled.span`
  background: linear-gradient(45deg, #84fab0, #8fd3f4);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
`;

const SocialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SocialLink = styled.a`
  color: #f0f0f0;
  text-decoration: none;
  font-size: 1.5rem;
  margin: 0.5rem 0;

  &:hover {
    color: #8fd3f4;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
