(async()=>{
const el=document.querySelector('#published-posts'),md=WorkshopMarkdown;
const topics=title=>/OpenArm/i.test(title)?'Robotics':/chip|infrastructure/i.test(title)?'Hardware & AI':/curriculum/i.test(title)?'Learning':/backend|agentic|context/i.test(title)?'AI engineering':'AI & understanding';
const excerpt=p=>p.excerpt||p.body.replace(/Originally posted on \[LinkedIn\][\s\S]*/,'').replace(/https?:\/\/\S+/g,'').replace(/[#*`]/g,'').trim().slice(0,220).replace(/\s+\S*$/,'')+'…';
try{const r=await fetch('https://bensons-workshop.bensonlee5.chatgpt.site/api/posts',{credentials:'omit'});if(!r.ok)throw Error();const posts=(await r.json()).posts;
el.innerHTML=posts.map(p=>`<a class="note-row" href="/writing/?post=${encodeURIComponent(p.slug)}"><span class="note-index">✧</span><span><span class="note-category">${topics(p.title)} · ${Math.max(1,Math.ceil(p.body.split(/\s+/).length/220))} MIN READ</span><h3>${md.escape(p.title)}</h3><p>${md.escape(excerpt(p))}</p></span><span class="note-arrow">↗</span></a>`).join('')||'<p>No posts yet.</p>';
}catch{el.innerHTML='<p class="journal-load-error">Writing couldn’t be loaded. Please try again, or explore the projects above.</p>'}
if(location.hash.startsWith('#post/'))location.replace('/writing/?post='+encodeURIComponent(decodeURIComponent(location.hash.slice(6))));
})();

