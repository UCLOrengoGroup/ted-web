"use client"

import {
  Box,
  Container,
  Heading,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import React from "react"
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
// And react-slick as our Carousel Lib
import Slider from "react-slick"

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

import ImgFig1Url from "../../assets/images/ted-paper-fig1.png"
import ImgFig2Url from "../../assets/images/ted-paper-fig2.png"
import ImgFig3Url from "../../assets/images/ted-paper-fig3.png"
import ImgFig4Url from "../../assets/images/ted-paper-fig4.png"
import ImgFig5Url from "../../assets/images/ted-paper-fig5.png"

export default function Carousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null)

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" })
  const side = useBreakpointValue({ base: "30%", md: "20px" })

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: "214 million AFDB target models",
      text: "Processed into nearly 365 million structural TED domains",
      image: ImgFig1Url,
    },
    {
      title: "Domain classification using the CATH hierarchy",
      text: "TED Domains have been annotated with evolutionary information from CATH superfamilies.",
      image: ImgFig2Url,
    },
    {
      title: "High symmetry domains and repeats",
      text: "Domains with high internal symmetry are identified as part of the novel fold workflow.",
      image: ImgFig3Url,
    },
    {
      title: "Novel domain clusters",
      text: "TED domains are associated with a score that provides a measure of the structural novelty.",
      image: ImgFig4Url,
    },
    {
      title: "Interacting Superfamily Pairs",
      text: "Analysis of the Enrichment of Interacting Superfamily Pairs common to the CATH and TED datasets",
      image: ImgFig5Url,
    },
  ]

  return (
    <Box
      position={"relative"}
      height={"600px"}
      width={"100%"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        position="absolute"
        left={side}
        top={top}
        variant="solid"
        colorScheme="teal"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        position="absolute"
        right={side}
        top={top}
        variant="solid"
        colorScheme="teal"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            position="relative"
          >
            {/* This is the block you need to change, to customize the caption */}
            <Stack
              spacing={3}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${card.image})`}
              height="600px"
            >
              <Container size="container.lg"
                  w={"full"}
                  maxW={"lg"}
                >
                <Box 
                  backdropFilter={"auto"}
                  backdropBlur={"30px"}
                  padding={6}
                  bottom="20%"
                  position="absolute"
                >
                  <Heading
                    fontSize={{ base: "1xl", md: "lg", lg: "lg" }}
                    pb="3"
                  >
                    {card.title}
                  </Heading>
                  <Text
                    fontSize={{ base: "sm", lg: "md" }}
                  >
                    {card.text}
                  </Text>
                </Box>
              </Container>
            </Stack>
          </Box>
        ))}
      </Slider>
    </Box>
  )
}
