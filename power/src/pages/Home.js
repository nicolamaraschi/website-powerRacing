// Timeline.js
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './Home.css';

const events = [
    { 
        year: 1980, 
        title: 'Fondazione del primo team', 
        description: 'Il fondatore avvia l\'attività sia in officina che sui campi di gara.',
        image: '/timeline1.jpeg' // Modificato per accedere direttamente a public
    },
    { 
        year: 1992, 
        title: 'Primi successi nel Campionato Italiano Renault Clio', 
        description: 'I risultati iniziano a farsi notare nel campionato.',
        image: '/timeline2.jpeg' // Modificato per accedere direttamente a public
    },
    { 
        year: 1994, 
        title: 'Vittorie nelle categorie Preparatori e Squadre', 
        description: 'Riconoscimenti significativi nelle gare.',
        image: '/timeline3.jpeg' // Modificato per accedere direttamente a public
    },
    { 
        year: 1996, 
        title: 'Debutto nella Formula Renault Elf Campus', 
        description: 'Inizio della preparazione dei motori per competizioni ufficiali.',
        image: '/timeline4.jpeg' // Modificato per accedere direttamente a public
    },
    { 
        year: 1998, 
        title: 'Riorganizzazione dell\'officina', 
        description: 'Due ampie strutture dedicate a officina e preparazione motori.',
        image: '/timeline5.jpeg' // Modificato per accedere direttamente a public
    },
];

const Home = () => {
    return (
        <VerticalTimeline>
            {events.map((event, index) => (
                <VerticalTimelineElement
                    key={index}
                    date={event.year}
                    iconStyle={{ background: '#3f51b5', color: '#fff' }}
                    contentStyle={{ background: '#f3f3f3', color: '#000' }}
                    contentArrowStyle={{ borderRight: '7px solid  #f3f3f3' }}
                >
                    <h3 className="vertical-timeline-element-title">{event.title}</h3>
                    <p>{event.description}</p>
                    <img 
                        src={event.image} 
                        alt={event.title} 
                        style={{ width: '100%', borderRadius: '5px', marginTop: '10px' }} 
                    />
                </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
    );
};

export default Home;
