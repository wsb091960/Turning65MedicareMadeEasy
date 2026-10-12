const menu=document.querySelector('.menu-button');
const nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const form=document.querySelector('#starter'),result=document.querySelector('#result'),list=document.querySelector('#checklist');
let checklist=[];
const stageNotes={new:['Confirm when your Medicare enrollment period begins and whether you need to enroll in Parts A and B.','Ask about your Medigap open enrollment timing before choosing a coverage path.'],review:['Gather your current plan documents and any Annual Notice of Change.','Check changes to your doctors, prescriptions, costs, and upcoming enrollment opportunities.'],working:['Ask your employer benefits administrator how your current insurance coordinates with Medicare.','Confirm whether your prescription coverage is creditable and how enrollment could affect your other benefits.']};
const interests={'Medicare Supplement':'Compare standardized benefits, premiums, and eligibility; consider a separate Part D plan.','Medicare Advantage':'Confirm your doctors and hospital, drug coverage, medical out-of-pocket limit, and plan rules.','Prescription drug coverage':'List your prescriptions and dosages; compare formulary coverage and preferred pharmacy costs.','Dental coverage':'Check your dentist, waiting periods, covered services, and annual benefit maximums.'};
form.addEventListener('submit',e=>{e.preventDefault();const selected=[...form.querySelectorAll('input:checked')].map(x=>x.value);checklist=[...stageNotes[form.stage.value],'Bring your doctors’ names, preferred pharmacy, and a list of medications and dosages.','Think about your monthly budget, travel plans, and the care you expect to need.',...selected.map(x=>interests[x]),'Review official plan documents and confirm availability in your county before enrolling.'];list.replaceChildren(...checklist.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));form.hidden=true;result.hidden=false;result.focus()});
document.querySelector('#reset').addEventListener('click',()=>{result.hidden=true;form.hidden=false;form.querySelector('select').focus()});
document.querySelector('#download').addEventListener('click',()=>{const text='TURNING 65 MEDICARE MADE EASY\nYour Medicare conversation checklist\n\n'+checklist.map((x,i)=>`${i+1}. ${x}`).join('\n\n')+'\n\nPreparation guidance only. Not a plan recommendation or enrollment.\nLearn more: https://www.medicare.gov\n';const url=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download='Turning65_Medicare_Conversation_Checklist.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
document.querySelector('#year').textContent=new Date().getFullYear();
// Each tab group owns only its direct tab list and panels, keeping nested states independent.
const tabGroups=new Map();
document.querySelectorAll('[data-tabs]').forEach(group=>{
 const tablist=group.querySelector(':scope > [role="tablist"]');
 const tabs=[...tablist.querySelectorAll('[role="tab"]')];
 const panels=tabs.map(tab=>document.getElementById(tab.getAttribute('aria-controls')));
 function activate(index,focus=false){
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;panels[i].hidden=i!==index});
  if(focus) tabs[index].focus();
 }
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activate(index));
  tab.addEventListener('keydown',event=>{
   let next;
   if(event.key==='ArrowRight')next=(index+1)%tabs.length;
   else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=tabs.length-1;
   else return;
   event.preventDefault();activate(next,true);
  });
 });
 activate(0);tabGroups.set(group.dataset.tabs,{tabs,panels,activate});
});
function revealCoverageHash(){
 const key=location.hash.slice(1);
 const coverage=tabGroups.get('coverage');
 const index=coverage.panels.findIndex(panel=>panel.id===key||panel.contains(document.getElementById(key)));
 if(index<0)return;
 coverage.activate(index);
 const inner=tabGroups.get(coverage.panels[index].id);
 const sub=inner.panels.findIndex(panel=>panel.id===key);
 if(sub>=0)inner.activate(sub);
 document.getElementById(key).scrollIntoView({block:'start'});
}
window.addEventListener('hashchange',revealCoverageHash);
if(location.hash)revealCoverageHash();
