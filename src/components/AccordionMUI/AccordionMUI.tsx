import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StepsTitle } from '../StepsTitle/StepsTitle';
import { AccordionMUIProps } from './AccordionMUIProps.types';


const AccordionMUI = ({accTitle,accStep,children,expanded = false, onClick}:AccordionMUIProps) => {
  return (
    <Accordion disableGutters={true} onClick={onClick} sx={{overflowX:'hidden'}} expanded={expanded}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={accStep}
      id={accStep}
    >
      <StepsTitle step={accStep} title={accTitle}/>

    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>

  )
}

export default AccordionMUI