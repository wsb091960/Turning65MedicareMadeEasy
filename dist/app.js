const menu=document.querySelector('.menu-button');
const nav=document.querySelector('#nav');
if(menu&&nav){
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
}
document.querySelectorAll('.tabset').forEach(group=>{
  const list=[...group.children].find(child=>child.matches('[role="tablist"]'));
  const tabs=list?[...list.querySelectorAll(':scope > [role="tab"]')]:[];
  const panels=[...group.children].filter(child=>child.matches('[role="tabpanel"]'));
  if(!tabs.length||tabs.length!==panels.length)return;
  function activate(index,moveFocus=false){
    tabs.forEach((tab,i)=>{const active=i===index;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;panels[i].hidden=!active});
    if(moveFocus)tabs[index].focus();
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>activate(index));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;
      else if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index+tabs.length-1)%tabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=tabs.length-1;
      else return;
      event.preventDefault();activate(next,true);
    });
  });
  activate(0);
});
const dialog=document.querySelector('#request-dialog');
document.querySelectorAll('[data-open-request]').forEach(button=>button.addEventListener('click',()=>{if(dialog&&!dialog.open)dialog.showModal()}));
document.querySelectorAll('[data-close-request]').forEach(button=>button.addEventListener('click',()=>dialog?.close()));
dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
document.querySelectorAll('[data-show-tab]').forEach(button=>button.addEventListener('click',()=>{
  const id='tab-'+button.dataset.showTab;
  document.getElementById(id)?.click();
  document.getElementById('details')?.scrollIntoView({behavior:'smooth',block:'start'});
  if(nav?.classList.contains('open')){nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}
}));
const year=document.querySelector('#year');
if(year)year.textContent=new Date().getFullYear();
