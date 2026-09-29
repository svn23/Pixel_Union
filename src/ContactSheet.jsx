import React, {useEffect, useRef, useState} from 'react';
import {InstagramLogo, WhatsappLogo, EnvelopeSimple, ArrowUpRight, X, Confetti} from '@phosphor-icons/react';
import './contact-sheet.css';

export const INSTAGRAM='https://www.instagram.com/pixel_union_/';
export const EMAIL='pixelunion55@gmail.com';
// ponytail: fill with the real number (country code + digits, no spaces) when supplied; empty keeps WhatsApp as "coming soon"
export const WHATSAPP_NUMBER='';
export const WHATSAPP=WHATSAPP_NUMBER?'https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent('Hi Pixel Union! I found you on your website and want to talk about '):'';
export const MAILTO='mailto:'+EMAIL+'?subject='+encodeURIComponent('Let’s talk — enquiry from the Pixel Union website');
export const openContact=()=>document.dispatchEvent(new Event('open-contact'));

// Opens the visitor's mail app with the form contents. Works with no backend.
export const mailForm=(subject,data)=>{
  const body=Object.entries(data).filter(([,v])=>v).map(([k,v])=>k+': '+v).join('\n');
  window.location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
};

const NEEDS=['Reels and short video for my business','Creator or influencer collaboration','Social media content and management','A campaign or product launch','Photos and product shoot','Not sure yet, let’s talk'];

export default function ContactSheet(){
  const ref=useRef(null);
  const [state,setState]=useState('pick'); // pick | form | done
  useEffect(()=>{const open=()=>{setState('pick');ref.current?.showModal()};document.addEventListener('open-contact',open);return()=>document.removeEventListener('open-contact',open)},[]);
  const close=()=>ref.current?.close();
  const submit=e=>{
    e.preventDefault();
    const d=Object.fromEntries(new FormData(e.currentTarget));
    mailForm('Business enquiry: '+(d.business||d.name),{Business:d.business,Name:d.name,'Phone / WhatsApp':d.phone,Email:d.email,City:d.city,'Looking for':d.need,'About the business':d.message});
    setState('done');
    setTimeout(close,3000);
  };
  return <dialog ref={ref} className="contact-sheet" aria-labelledby="sheet-title" onClick={e=>{if(e.target===ref.current)close()}}>
    <div className="sheet-body">
      <button className="sheet-close" onClick={close} aria-label="Close"><X size={20}/></button>
      {state==='done' && <div className="join-done"><Confetti size={54} weight="duotone"/><h2>Brief received.</h2><p>Your response was submitted successfully. Your mail app should have opened with the details, just hit send. We’ll get back to you soon.</p></div>}
      {state==='pick' && <>
        <span className="eyebrow">PICK YOUR WAY TO SAY HI</span>
        <h2 id="sheet-title">Let’s talk.</h2>
        <p>Shop owner, brand, or business of any size. Tell us what you’re building and we’ll take it from there.</p>
        <div className="sheet-options">
          <a className="sheet-option ig" href={INSTAGRAM} target="_blank" rel="noreferrer" onClick={close}><InstagramLogo size={30} weight="duotone"/><span><strong>Instagram</strong><small>DM @pixel_union_</small></span><ArrowUpRight size={20}/></a>
          <a className="sheet-option mail" href={MAILTO} onClick={close}><EnvelopeSimple size={30} weight="duotone"/><span><strong>Email</strong><small>{EMAIL}</small></span><ArrowUpRight size={20}/></a>
          {WHATSAPP
            ? <a className="sheet-option wa" href={WHATSAPP} target="_blank" rel="noreferrer" onClick={close}><WhatsappLogo size={30} weight="duotone"/><span><strong>WhatsApp</strong><small>Start a chat</small></span><ArrowUpRight size={20}/></a>
            : <span className="sheet-option wa soon" aria-disabled="true"><WhatsappLogo size={30} weight="duotone"/><span><strong>WhatsApp</strong><small>Coming soon</small></span></span>}
        </div>
        <button className="button dark sheet-brief" onClick={()=>setState('form')}>Send us a business brief <ArrowUpRight size={20}/></button>
      </>}
      {state==='form' && <form onSubmit={submit}>
        <span className="eyebrow">FOR BUSINESS OWNERS</span>
        <h2 id="sheet-title">Tell us about your business.</h2>
        <p>A few details and we’ll come back with ideas on how creators and content can work for you.</p>
        <div className="join-grid">
          <label>Business name<input name="business" required placeholder="Your shop, brand or company"/></label>
          <label>Your name<input name="name" required autoComplete="name" placeholder="Who should we talk to?"/></label>
          <label>Phone / WhatsApp<input name="phone" type="tel" required autoComplete="tel" placeholder="+91…"/></label>
          <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@business.com"/></label>
          <label>City<input name="city" placeholder="Bhubaneswar, Cuttack, anywhere"/></label>
          <label>What are you looking for?<select name="need" required defaultValue=""><option value="" disabled>Pick one</option>{NEEDS.map(n=><option key={n}>{n}</option>)}</select></label>
          <label className="wide">About your business<textarea name="message" rows="3" placeholder="What you sell, who your customers are, and what you want more of."/></label>
        </div>
        <div className="sheet-form-actions"><button type="button" className="text-link" onClick={()=>setState('pick')}>Back</button><button className="button dark join-submit">Send brief <ArrowUpRight size={20}/></button></div>
      </form>}
    </div>
  </dialog>;
}
