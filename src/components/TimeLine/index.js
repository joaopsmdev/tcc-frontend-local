import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';


export default function TestTimeline(props) {
  return (
    <Timeline position="alternate">
      <TimelineItem >
        <TimelineSeparator>
          <TimelineDot color={props.color} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{props.sentimento}</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color={props.color2} />
        </TimelineSeparator>
        <TimelineContent>{props.data}</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
