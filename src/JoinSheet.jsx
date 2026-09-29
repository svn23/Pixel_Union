import React, {useEffect, useRef, useState} from 'react';
import {ArrowUpRight, X, Confetti} from '@phosphor-icons/react';
import {mailForm} from './ContactSheet.jsx';
import './contact-sheet.css';

// ponytail: set to a real form endpoint (Formspree, Google Apps Script, your API) to actually receive entries.
// While empty, the form opens the visitor's mail app with the details addressed to the Pixel Union inbox.
export const JOIN_ENDPOINT='';
export const openJoin=()=>document.dispatchEvent(new Event('open-join'));

const ROLES=['Reel creator / influencer','Videographer / cameraman','Video editor','Graphic designer','Social media manager','Content writer','Photographer','Something else'];

export default function JoinSheet(){
  const ref=useRef(null);
  const [state,setState]=useState('form'); // form | sending | done
  useEffect(()=>{const open=()=>{setState('form');ref.current?.showModal()};document.addEventListener('open-join',open);return()=>document.removeEventListener('open-join',open)},[]);
  const close=()=>ref.current?.close();
  const submit=async e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(e.currentTarget));
    setState('sending');
    if(JOIN_ENDPOINT){try{await fetch(JOIN_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})}catch{}}
    else mailForm('Join the union: '+data.name,{Name:data.name,'Instagram / phone':data.contact,'Looking for':data.role,City:data.city,Portfolio:data.link,About:data.message});
    setState('done');
    setTimeout(close,2600);
  };
  return <dialog ref={ref} className="contact-sheet join-sheet" aria-labelledby="join-title" onClick={e=>{if(e.target===ref.current)close()}}>
    <div className="sheet-body">
      <button className="sheet-close" onClick={close} aria-label="Close"><X size={20}/></button>
      {state==='done'
        ? <div className="join-done"><Confetti size={54} weight="duotone"/><h2>You’re in the loop.</h2><p>Your response was submitted successfully. Your mail app should have opened with the details, just hit send. We’ll reach out if there’s a fit.</p></div>
        : <form onSubmit={submit}>
          <span className="eyebrow">JOIN THE UNION</span>
          <h2 id="join-title">Work with us.</h2>
          <p>Creators, editors, designers, storytellers. Tell us who you are and what you’d love to do.</p>
          <div className="join-grid">
            <label>Your name<input name="name" required autoComplete="name" placeholder="Full name"/></label>
            <label>Instagram or phone<input name="contact" required placeholder="@handle or +91…"/></label>
            <label>What are you looking for?<select name="role" required defaultValue=""><option value="" disabled>Pick a role</option>{ROLES.map(r=><option key={r}>{r}</option>)}</select></label>
            <label>City<input name="city" placeholder="Bhubaneswar, Cuttack, anywhere"/></label>
            <label className="wide">Portfolio / profile link<input name="link" type="url" placeholder="https://"/></label>
            <label className="wide">Tell us a little about you<textarea name="message" rows="3" placeholder="What you make, what you’re great at, what you want next."/></label>
          </div>
          <button className="button dark join-submit" disabled={state==='sending'}>{state==='sending'?'Sending…':'Submit'} <ArrowUpRight size={20}/></button>
        </form>}
    </div>
  </dialog>;
}
