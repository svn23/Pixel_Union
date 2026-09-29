import React from 'react';
import {ArrowUpRight, Asterisk} from '@phosphor-icons/react';
import {openContact} from './ContactSheet.jsx';
import Doodle from './Doodles.jsx';
import './contact-prompt.css';

export default function ContactPrompt() {
  return <section id="contact" className="contact conversation-contact">
    <Asterisk className="contact-asterisk" weight="fill" aria-hidden="true"/><Doodle icon="box" size={110} rotate={12} style={{left:"2%",bottom:"8%"}} hideMobile/><Doodle icon="phone" size={52} rotate={-16} over tone="ink" style={{right:"12%",bottom:"18%"}} hideMobile/><div className="eyebrow">EVERY GOOD CONVERSATION STARTS SOMEWHERE.</div>
    <h2 className="conversation-title" aria-label="Have a query, feedback, or question?">
      <span className="fixed-prompt" aria-hidden="true">Have a</span>
      <span className="word-window" aria-hidden="true"><span className="word-reel">
        <span>query?</span><span>feedback?</span><span>question?</span><span>query?</span>
      </span></span>
    </h2>
    <div className="contact-bottom"><p>We’re all ears. Tell us what’s on your mind.</p><button className="button dark talk-button" onClick={openContact}>Let’s talk <ArrowUpRight size={26}/></button></div>
  </section>;
}
