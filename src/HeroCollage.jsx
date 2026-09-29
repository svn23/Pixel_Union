import React from 'react';
import {ArrowUpRight} from '@phosphor-icons/react';
import './collage.css';

export default function HeroCollage() {
  return <div className="hero-art creative-collage">
    <div className="art-label">THE INTERNET IS LOUD.<br/><strong>LET’S MAKE YOU HEARD.</strong></div>
    <img className="creative-community" src="/pixel-union-creators-collage.webp" width="1122" height="1402" decoding="async" alt="3D cartoon cameraman, influencer, and shop owner together on a collage of torn newspaper pages" fetchPriority="high"/>
    <span className="collage-tag tag-filmmaker">THE STORYTELLERS <ArrowUpRight size={15}/></span>
    <span className="collage-tag tag-creator">THE CREATORS <ArrowUpRight size={15}/></span>
    <span className="collage-tag tag-business">THE LOCAL HEROES <ArrowUpRight size={15}/></span>
    <span className="collage-caption">DIFFERENT TALENTS. ONE UNION.</span>
  </div>;
}
