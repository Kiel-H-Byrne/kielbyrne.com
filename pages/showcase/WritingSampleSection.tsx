import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export const WritingSampleSection = () => {
  const writingSamples = [
    {
      title:
        "Unleash Your Child's Creativity with ChatGPT: My Experience Helping My Son Write His First Book!",
      description:
        "I documented the experience of helping my 9 year old Son use ChatGPT to help him write and publish his first book! #ai #parenting #writing #aiconsulting",
      imageUrl:
        "https://res.cloudinary.com/practicaldev/image/fetch/s--hp3sWC9l--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/88b84km32qu6yqbxpq3f.jpeg",
      link: "https://dev.to/tdotholla/unleash-your-childs-creativity-with-chatgpt-my-experience-helping-my-son-write-his-first-book-3d5n",
    },
    // {
    //     title: "Article 2",
    //     description: "Description of Article 2 goes here.",
    //     imageUrl: "article_2_image.jpg",
    //     link: "https://example.com/article-2",
    // },
  ];

  return (
    <Box p={4}>
      <SimpleGrid columns={2} spaceX={4}>
        {writingSamples.map((sample, index) => (
          <Box key={index} borderWidth="1px" borderRadius="md">
            <Image
              src={sample.imageUrl}
              alt={sample.title}
              height="200"
              objectFit="cover"
            />
            <Box p={4}>
              <Heading as="h3" size="md" mb={2}>
                {sample.title}
              </Heading>
              <Text mb={4}>{sample.description}</Text>
              <Link
                href={sample.link}
                color="blue.500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Article
              </Link>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default WritingSampleSection;
