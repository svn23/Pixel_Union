import React from 'react';
import {Camera, VideoCamera, DeviceMobile, FilmReel, Microphone, Aperture, Headphones, FilmSlate, Lightbulb, Star, Heart, Play, PushPin, Scissors, Palette, SpeakerHigh, Package, Storefront} from '@phosphor-icons/react';
import './doodles.css';

// Not in Phosphor, so drawn by hand: a simple camera tripod.
const Tripod=({size=64,...p})=><svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="20" y="8" width="24" height="14" rx="2"/><circle cx="32" cy="15" r="3.5"/><path d="M32 22v10M32 32L14 58M32 32l18 26M32 32v26M18 52h28"/></svg>;

const ICONS={camera:Camera,video:VideoCamera,phone:DeviceMobile,reel:FilmReel,mic:Microphone,aperture:Aperture,headphones:Headphones,slate:FilmSlate,bulb:Lightbulb,star:Star,heart:Heart,play:Play,pin:PushPin,scissors:Scissors,palette:Palette,speaker:SpeakerHigh,box:Package,shop:Storefront,tripod:Tripod};

/**
 * Decorative background prop. `over` lifts it above cards so it peeks over a corner.
 * All positioning is passed inline so each placement reads at the call site.
 */
export default function Doodle({icon,size=72,rotate=0,over=false,tone='ink',hideMobile=false,style}){
  const Icon=ICONS[icon];
  return <span className={`doodle${over?' over':''} ${tone}${hideMobile?' desk':''}`} style={{...style,'--r':`${rotate}deg`}} aria-hidden="true"><Icon size={size} weight={over?'duotone':'regular'}/></span>;
}
