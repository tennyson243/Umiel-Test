import { useTheme } from "@emotion/react";
import { Slide } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { MessageText, PromotionsContainer } from "./PromotionCont";

const messages = [
  "Umiel - La nature dans chaque goutte, chaque pot, chaque instant.",
  "Umiel - Le secret sucré de la nature, capturé pour votre santé.",
  "Umiel - L'essence de la ruche, la quintessence de votre bien-être.",
  "Umiel - La puissance de la nature, emballée dans chaque produit.",
  "Umiel - Une douceur naturelle, une confiance envers la ruche.",
];

const Promotion = () => {
  const theme = useTheme();
  const containerRef = useRef();
  const [show, setShow] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
    const intervalId = setInterval(() => {
      // get next message
      setMessageIndex((i) => (i + 1) % messages.length);

      // slide the message in
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <PromotionsContainer
      ref={containerRef}
      overflow='hidden'
      backgroundColor={theme.palette.primary.main}
    >
      <Slide
        direction={show ? "left" : "right"}
        in={show}
        container={containerRef.current}
        timeout={{
          enter: 500,
          exit: 100,
        }}
      >
        <Box display='flex' justifyContent='center' alignItems='center'>
          <MessageText>{messages[messageIndex]}</MessageText>
        </Box>
      </Slide>
    </PromotionsContainer>
  );
};

export default Promotion;
