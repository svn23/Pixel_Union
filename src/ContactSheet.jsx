import React, {useEffect, useRef} from 'react';
import {InstagramLogo, WhatsappLogo, ArrowUpRight, X} from '@phosphor-icons/react';
import './contact-sheet.css';

export const INSTAGRAM='https://www.instagram.com/pixel_union_/';
// ponytail: fill with the real number (country code + digits, no spaces) when supplied; empty keeps WhatsApp as "coming soon"
export const WHATSAPP_NUMBER='';
export const WHATSAPP=WHATSAPP_NUMBER?`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Pixel Union! I found you on your website and want to talk about ')}`:'';
export const openContact=()=>document.dispatchEvent(new Event('open-contact'));

export default function ContactSheet(){
  const ref=useRef(null);
  useEffect(()=>{const open=()=>ref.current?.showModal();document.addEventListener('open-contact',open);return()=>document.removeEventListener('open-contact',open)},[]);
  const close=()=>ref.current?.close();
  return <dialog ref={ref} className="contact-sheet" aria-labelledby="sheet-title" onClick={e=>{if(e.target===ref.current)close()}}>
    <div className="sheet-body">
      <button className="sheet-close" onClick={close} aria-label="Close"><X size={20}/></button>
      <span className="eyebrow">PICK YOUR WAY TO SAY HI</span>
      <h2 id="sheet-title">Let’s talk.</h2>
      <p>Shop owner, reel creator, or brand. Tell us what you’re building and we’ll take it from there.</p>
      <div className="sheet-options">
        <a className="sheet-option ig" href={INSTAGRAM} target="_blank" rel="noreferrer" onClick={close}><InstagramLogo size={30} weight="duotone"/><span><strong>Instagram</strong><small>DM @pixel_union_</small></span><ArrowUpRight size={20}/></a>
        {WHATSAPP
          ? <a className="sheet-option wa" href={WHATSAPP} target="_blank" rel="noreferrer" onClick={close}><WhatsappLogo size={30} weight="duotone"/><span><strong>WhatsApp</strong><small>Start a chat</small></span><ArrowUpRight size={20}/></a>
          : <span className="sheet-option wa soon" aria-disabled="true"><WhatsappLogo size={30} weight="duotone"/><span><strong>WhatsApp</strong><small>Coming soon</small></span></span>}
      </div>
    </div>
  </dialog>;
}
