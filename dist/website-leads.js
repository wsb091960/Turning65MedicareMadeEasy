(() => {
  const form=document.getElementById('website-lead-form');
  if(!form) return;
  const message=document.getElementById('website-lead-message');
  const startedAt=Math.floor(Date.now()/1000);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button=form.querySelector('button[type=submit]');
    button.disabled=true;
    message.textContent='Sending your request…';
    const data=new FormData(form);
    const payload={first_name:data.get('first_name'),last_name:data.get('last_name'),
      phone:data.get('phone'),email:data.get('email'),zip_code:data.get('zip_code'),
      state:data.get('state'),preferred_contact:data.get('preferred_contact'),
      interests:data.getAll('interests'),consent:data.get('consent')==='on',
      website:data.get('website'),started_at:startedAt};
    try {
      const response=await fetch('https://wsbco-crm.onrender.com/api/website/leads',{
        method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      if(!response.ok) throw new Error('Unable to submit');
      message.textContent='Thank you! Your request has been received.';
      form.reset();
    } catch(error) {
      message.textContent='We could not send your request. Please try again later.';
    } finally {button.disabled=false;}
  });
})();
