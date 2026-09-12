import Navbar from "@/components/Navbar";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { useState } from "react";

enum PDFTYPES {
  PR = "Personal Resume",
  CV = "Professional CV",
}
enum PDFPATHS {
  PR = "docs/KHB_Resume.pdf",
  CV = "docs/KHB_CCV.pdf",
}
const ResumePage = () => {
  const [pdfTitle, setpdfTitle] = useState(PDFTYPES.CV as string);
  const [pdfPath, setpdfPath] = useState(PDFPATHS.PR);
  const isPR = pdfTitle === PDFTYPES.CV && pdfPath === PDFPATHS.PR;
  const handleToggle = () => {
    if (isPR) {
      setpdfPath(PDFPATHS.CV);
      setpdfTitle(PDFTYPES.PR);
    } else {
      setpdfPath(PDFPATHS.PR);
      setpdfTitle(PDFTYPES.CV);
    }
  };
  return (
    <Container maxW={"container.xl"} height={"container.lg"} pb={6}>
      <Navbar />
      <Flex justifyContent={"center"} width={"full"}>
        <Button
          onClick={handleToggle}
          width={"50%"}
          p={6}
          m={4}
          colorScheme="blue"
        >
          View {pdfTitle}
        </Button>
      </Flex>
      <Box pb={4} h={"full"} w={"full"}>
        <object
          data={`${pdfPath}`}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <p>
            Unable to display PDF file. <a href={`/${pdfPath}`}>Download</a>{" "}
            instead.
          </p>
        </object>
      </Box>
    </Container>
  );
};

export default ResumePage;
