/* 四季廳・帝國情報建築インターフェース
   Local-only command palette, reading progress and accessible navigation.
   No authentication, external service, or private data is used.
*/
(()=>{'use strict';
if(window.ShikiImperialArchitecture)return;
window.ShikiImperialArchitecture=true;
const pages=[
 {title:'総合行政ポータル',type:'行政窓口',desc:'全行政システムへの総合入口',url:'portal.html'},
 {title:'行政統合管制室',type:'行政窓口',desc:'公開索引・関係図・保存資料',url:'command-center.html'},
 {title:'四季神祇天象儀',type:'神祇・季節',desc:'四柱の現人神と季節行政の観測資料',url:'astrarium.html'},
 {title:'行政情報臺帳',type:'人物・組織',desc:'人物、神籍、組織、施設、公文書',url:'registry.html'},
 {title:'組織・官職データベース',type:'組織',desc:'公開された組織階層と所管情報',url:'organization.html'},
 {title:'法令・官報閲覧室',type:'法令',desc:'法令・官報・公告の公開情報',url:'laws.html'},
 {title:'帝國歴史年表',type:'歴史',desc:'公開史料に基づく年代・出来事',url:'chronicle.html'},
 {title:'行政情報相互参照網',type:'資料探索',desc:'人物・機關・文書の関係を探索',url:'network.html'},
 {title:'統合行政情報検索',type:'検索',desc:'公開索引の横断検索',url:'search.html'},
 {title:'附属資料室',type:'公文書館',desc:'公開資料と封緘記録の閲覧案内',url:'archive.html'},
 {title:'諸廳合同調査室',type:'調査',desc:'既存の合同調査・照合記録',url:'investigation.html'},
 {title:'本廳舎・庁内案内',type:'施設',desc:'四季廳の公開施設・所管案内',url:'facilities.html'},
 {title:'四季廳長官室',type:'機關案内',desc:'長官室の公開案内',url:'chief-office.html'},
 {title:'宮内廳との連携',type:'關係機關',desc:'宮内廳との公開連携情報',url:'miyauchi.html'}
];
const norm=s=>String(s||'').normalize('NFKC').toLocaleLowerCase('ja').replace(/[\s　]/g,'');
const dataItems=()=>{
 const R=window.ShikiRegistryData||{},items=[];
 const add=(arr,type,fn)=>{if(Array.isArray(arr))arr.forEach(x=>{const v=fn(x);if(v&&v.title&&v.url&&v.url!=='#')items.push(v)})};
 add(R.people,'人物',x=>({title:x.name,type:'人物',desc:[x.role,x.unit,x.tags].filter(Boolean).join('／'),url:x.url}));
 add(R.offices,'組織',x=>({title:x.name,type:'組織',desc:[x.scope,x.lead].filter(Boolean).join('／'),url:x.url}));
 add(R.documents,'公文書',x=>({title:x.title,type:'公文書',desc:[x.id,x.class,x.department,x.people,x.event].filter(Boolean).join('／'),url:x.url}));
 add(R.seasons,'神籍',x=>({title:[x.name,x.deity].filter(Boolean).join('・'),type:'神籍',desc:[x.registry,x.power,x.bureau,x.guardian].filter(Boolean).join('／'),url:x.url||x.record}));
 add(R.facilities,'施設',x=>({title:x.name,type:'施設',desc:[x.zone,x.scope].filter(Boolean).join('／'),url:x.url}));
 return items;
};
const init=()=>{
 const body=document.body;if(!body||body.dataset.iaReady==='true')return;
 body.dataset.iaReady='true';
 const main=document.querySelector('main');
 if(main&&!document.querySelector('.skip-link')){
  if(!main.id){let id='shiki-main-content',n=2;while(document.getElementById(id))id='shiki-main-content-'+n++;main.id=id;}
  const skip=document.createElement('a');skip.className='skip-link';skip.href='#'+main.id;skip.textContent='本文へ移動';body.prepend(skip);
 }
 const progress=document.createElement('div');progress.className='shiki-reading-progress';progress.setAttribute('aria-hidden','true');progress.innerHTML='<span></span>';body.prepend(progress);
 const bar=progress.firstElementChild;
 const top=document.createElement('button');top.type='button';top.className='shiki-back-top';top.setAttribute('aria-label','ページ先頭へ戻る');top.textContent='↑';body.append(top);
 let raf=0;
 const update=()=>{
  raf=0;const max=document.documentElement.scrollHeight-window.innerHeight;
  bar.style.width=(max>0?Math.min(100,Math.max(0,window.scrollY/max*100)):0)+'%';
  top.classList.toggle('is-visible',window.scrollY>520);
 };
 const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
 window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);update();
 top.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
 const trigger=document.createElement('button');trigger.type='button';trigger.className='shiki-command-trigger';trigger.innerHTML='<span>情報を探す</span><kbd>Ctrl K</kbd>';trigger.setAttribute('aria-haspopup','dialog');body.append(trigger);
 const layer=document.createElement('div');layer.className='shiki-command-layer';layer.hidden=true;
 layer.innerHTML='<section class="shiki-command-dialog" role="dialog" aria-modal="true" aria-labelledby="shiki-command-title"><header class="shiki-command-head"><strong id="shiki-command-title">四季廳・統合探索端末</strong><button type="button" class="shiki-command-close">閉じる　Esc</button></header><div class="shiki-command-search"><input type="search" autocomplete="off" spellcheck="false" aria-label="人物・組織・公文書・施設・ページを検索" placeholder="名稱・分類・所管・資料番号を入力"><p class="shiki-command-hint">公開ページと公開索引を横断します。Ctrl + K でいつでも開けます。</p></div><div class="shiki-command-results" role="listbox" aria-label="検索結果"></div></section>';
 body.append(layer);
 const input=layer.querySelector('input'),results=layer.querySelector('.shiki-command-results'),close=layer.querySelector('.shiki-command-close');
 let visible=[],active=-1,lastFocus=null;
 const render=()=>{
  const q=norm(input.value),all=[...pages,...dataItems()];
  const found=(q?all.filter(x=>norm([x.title,x.type,x.desc].join(' ')).includes(q)):pages).slice(0,32);
  visible=found;active=found.length?0:-1;results.replaceChildren();
  if(!found.length){const empty=document.createElement('p');empty.className='shiki-command-empty';empty.textContent='該当する公開情報はありません。検索語を変えてください。';results.append(empty);return}
  found.forEach((item,i)=>{
   const a=document.createElement('a');a.href=item.url;a.id='shiki-command-option-'+i;a.setAttribute('role','option');a.setAttribute('aria-selected',String(i===active));
   const kind=document.createElement('small');kind.textContent=item.type;
   const text=document.createElement('div'),strong=document.createElement('strong'),desc=document.createElement('span');strong.textContent=item.title;desc.textContent=item.desc||'';text.append(strong,desc);a.append(kind,text);
   a.addEventListener('mouseenter',()=>setActive(i));results.append(a);
  });
 };
 const setActive=i=>{active=Math.max(0,Math.min(visible.length-1,i));results.querySelectorAll('[role=option]').forEach((a,n)=>a.setAttribute('aria-selected',String(n===active)));results.querySelector('#shiki-command-option-'+active)?.scrollIntoView({block:'nearest'});};
 const open=()=>{lastFocus=document.activeElement;layer.hidden=false;input.value='';render();input.focus();};
 const hide=()=>{layer.hidden=true;lastFocus?.focus?.();trigger.focus();};
 trigger.addEventListener('click',open);close.addEventListener('click',hide);
 layer.addEventListener('click',e=>{if(e.target===layer)hide()});
 input.addEventListener('input',render);
 input.addEventListener('keydown',e=>{
  if(e.key==='ArrowDown'){e.preventDefault();setActive(active+1)}
  else if(e.key==='ArrowUp'){e.preventDefault();setActive(active-1)}
  else if(e.key==='Enter'&&visible[active]){e.preventDefault();location.href=visible[active].url}
  else if(e.key==='Escape'){e.preventDefault();hide()}
 });
 document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(layer.hidden)open();else hide()}
  if(e.key==='Escape'&&!layer.hidden)hide();
 });
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();