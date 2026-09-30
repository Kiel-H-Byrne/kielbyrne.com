import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { trackAudioAction } from "@/lib/gtag";

export const VoiceClip = ({
  imageSrc,
  description,
  audioSrc,
  heading,
}: {
  imageSrc: string;
  description: string;
  audioSrc: string;
  heading: string;
}) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" w={"sm"}>
      <Image src={imageSrc} alt="Voice Clip" />
      <Heading size="md" marginBlock={2}>
        {heading}
      </Heading>
      <Text mb={4}>{description}</Text>
      <audio
        src={audioSrc}
        controls
        onPlay={() =>
          trackAudioAction("play", { title: heading, src: audioSrc })
        }
        onPause={() =>
          trackAudioAction("pause", { title: heading, src: audioSrc })
        }
        onEnded={() =>
          trackAudioAction("complete", { title: heading, src: audioSrc })
        }
      />
    </Box>
  );
};
export const VoiceTalentShowcase = () => {
  const voiceClips = [
    {
      imageSrc: "https://picsum.photos/400/150?s=1",
      description:
        "Clip of many different characters' voices for commercial spots",
      heading: "Characters",
      audioSrc: "/audio/KielByrne_C.mp3",
    },
    {
      imageSrc: "https://picsum.photos/400/150?s=2",
      description: "Clip of narration for children's book",
      heading: "Narrative",
      audioSrc: "/audio/KielByrne_N.mp3",
    },
    {
      imageSrc: "https://picsum.photos/400/150?s=3",
      description:
        "Presentation made for Nelson/Nygaard for the City of New Orleans",
      heading: "Technical Informational",
      audioSrc: "/audio/KielByrne_NN_NORTA.mp3",
    },
  ];

  return (
    <Stack direction={{ base: "column", md: "row" }} overflowX={"scroll"}>
      {voiceClips.map((clip, index) => (
        <VoiceClip
          key={index}
          imageSrc={clip.imageSrc}
          description={clip.description}
          audioSrc={clip.audioSrc}
          heading={clip.heading}
        />
      ))}
    </Stack>
  );
};

export default VoiceTalentShowcase;
