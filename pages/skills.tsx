import Navbar from "@/components/Navbar";
import { Box, Container, Heading } from "@chakra-ui/react";
import Script from "next/script";
import { DevImg } from "./DevImg";

const index = () => {
  const imgWidth = 120;
  const imgHeight = 20;
  const userName = "kiel-h-byrne";
  return (
    <>
      <Navbar />
      <Container maxW={"container.xl"}>
        <Heading p={4} mb={2}>
          Languages & Software
        </Heading>
        <Box>
          <Script src="https://unpkg.com/@codersrank/skills-chart@0.9.21/codersrank-skills-chart.min.js" />
          <Script src="https://unpkg.com/@codersrank/summary@0.9.13/codersrank-summary.min.js" />
          {/* @ts-ignore */}
          <codersrank-summary
            username={userName}
            badges="3"
            branding="false"
            show-avatar="false"
          >
            {/* @ts-ignore */}
          </codersrank-summary>
          {/* @ts-ignore */}
          <codersrank-skills-chart
            username={userName}
            labels
            legend
            tooltip
            svg-width="640"
            svg-height="320"
            active-skills="TypeScript, JavaScript, Python, HTML, JSON, Java, SCSS"
            branding="false"
            max-labels="6"
            sort-by-score
            show-other-skills
          >
            {/* @ts-ignore */}
          </codersrank-skills-chart>
        </Box>
        <DevImg imgWidth={imgWidth} imgHeight={imgHeight} />
      </Container>
    </>
  );
};

export default index;
