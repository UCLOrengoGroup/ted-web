'use client'

import React from 'react'
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from '@chakra-ui/react'
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
// And react-slick as our Carousel Lib
import Slider from 'react-slick'

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

import ImgFig1Url from '../../assets/images/ted-paper-fig1.png'
import ImgFig2Url from '../../assets/images/ted-paper-fig2.png' 
import ImgFig3Url from '../../assets/images/ted-paper-fig3.png' 
import ImgFig4Url from '../../assets/images/ted-paper-fig4.png' 
import ImgFig5Url from '../../assets/images/ted-paper-fig5.png' 

export default function Carousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null)

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '40px' })

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: '214 million AFDB target models',
      text: "Processing 214 million AFDB target sequences",
      image: ImgFig1Url,
    },
    {
      title: 'Domain classification using the CATH hierarchy',
      text: "Top 100 CATH superfamilies in TED.",
      image: ImgFig2Url,
    },
    {
      title: 'High symmetry domains and repeats',
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat lobortis sapien eget posuere.",
      image: ImgFig3Url,
    },
    {
      title: 'Novel domain clusters',
      text: "Etiam sollicitudin lorem lectus, pellentesque tincidunt orci commodo quis. Cras sodales tincidunt bibendum.",
      image: ImgFig4Url,
    },
    {
      title: 'Interacting superfamily pairs',
      text: "Curabitur malesuada nunc rhoncus, tincidunt eros non, congue libero. In vitae luctus magna.",
      image: ImgFig5Url,
    },
  ]

  return (
    <Box position={'relative'} height={'600px'} width={'100%'} overflow={'hidden'}>
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
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={'6xl'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}>
            {/* This is the block you need to change, to customize the caption */}
            <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={3}
                w={'full'}
                maxW={'lg'}
                position="absolute"
                top="50%"
                // transform="translate(0, -10%)"
                >
                <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} backdropFilter={"auto"} backdropBlur={"20px"}>
                  {card.title}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} backdropFilter={"auto"} backdropBlur={"20px"}>
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  )
}
