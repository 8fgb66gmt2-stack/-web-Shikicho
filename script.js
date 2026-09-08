document.addEventListener('DOMContentLoaded',()=>{
 const theme=document.createElement('link');theme.rel='stylesheet';theme.href='imperial.css';document.head.appendChild(theme);
 const ryoryo=document.createElement('link');ryoryo.rel='stylesheet';ryoryo.href='ryoryo.css';document.head.appendChild(ryoryo);
 const archiveFix=document.createElement('link');archiveFix.rel='stylesheet';archiveFix.href='archive-fix.css';document.head.appendChild(archiveFix);
 const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#global-nav');
 if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.textContent=open?'閉じる':'選單'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');nav.setAttribute('aria-expanded','false');menu.textContent='選單'}))}
 const updated=document.querySelector('#last-updated');if(updated){const d=new Date();updated.textContent=`最終更新：帝國暦 ${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`}
 const tabs=[...document.querySelectorAll('.god-tab')],panels=[...document.querySelectorAll('.god-panel')];tabs.forEach(tab=>tab.addEventListener('click',()=>{const season=tab.dataset.season;tabs.forEach(t=>t.classList.toggle('active',t===tab));panels.forEach(p=>p.classList.toggle('active',p.id===`panel-${season}`))}));
 const modal=document.querySelector('#archive-modal'),open=document.querySelector('#archive-open'),close=document.querySelector('#archive-close'),form=document.querySelector('#archive-form'),input=document.querySelector('#archive-password'),content=document.querySelector('#archive-content'),error=document.querySelector('#archive-error');
 const show=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');setTimeout(()=>input.focus(),50)},hide=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
 if(open)open.addEventListener('click',show);if(close)close.addEventListener('click',hide);if(modal)modal.addEventListener('click',e=>{if(e.target===modal)hide()});
 const revealArchive=()=>{
  content.classList.add('unlocked','visible');
  content.innerHTML=`
   <div class="archive-document">
    <div class="archive-stamp">機密指定 / CONFIDENTIAL</div>
    <p class="eyebrow">四季廳・内部記録　ARCHIVE 17-S</p>
    <h3>四季廳異常記録　第一号</h3>
    <p class="archive-meta">件名：春季観測について<br>記録日：帝國暦 237年 04月12日<br>取扱：保全課・春局</p>
    <hr>
    <p>本記録は、春季現人神・花葉雛菊に関する定例観測記録である。</p>
    <p>現時点において、春季神性の巡行は正常。生命促進作用にも顕著な異常は認められない。</p>
    <p>――以上。</p>
    <div class="archive-note"><strong>【追記】</strong><br>上記記録には、旧記録との照合時に不整合が確認された。</div>
    <div class="archive-redacted">████████████████████████<br>████　該当箇所は閲覧制限　████<br>████████████████████████</div>
    <p class="archive-clue"><span>内部備考：</span><br>「春は――無事、此処に、おります」<br><small>※この文言は、現在の公式資料にのみ存在する。</small></p>
    <button type="button" class="archive-next" id="archive-next">次の記録を閲覧する　→</button>
    <div id="archive-next-record" hidden>
      <hr>
      <p class="eyebrow">ARCHIVE 17-S / SUPPLEMENT</p>
      <h4>照合記録・欠落部分</h4>
      <p>帝國暦 232年以前の春季記録を検索したところ、現存する資料の一部に<strong>「花葉雛菊」の記載が存在しない期間</strong>が確認された。</p>
      <p>しかし、同期間の四季巡行表には「春・正常」と記録されている。</p>
      <p class="archive-warning">【警告】<br>春が存在しなかったのか。<br>それとも――存在していたことを、誰かが記録から消したのか。</p>
      <p class="archive-end">記録終端。<br><span>次回閲覧には別途認証を要する。</span></p>
    </div>
   </div>`;
  const next=document.querySelector('#archive-next'),record=document.querySelector('#archive-next-record');
  if(next&&record)next.addEventListener('click',()=>{record.hidden=false;next.hidden=true;record.scrollIntoView({behavior:'smooth',block:'nearest'})});
 };
 if(form)form.addEventListener('submit',e=>{e.preventDefault();const value=input.value.trim();const key=value.normalize('NFKC').replace(/\s+/g,' ').trim().toLowerCase();const accepted=['雛菊','花葉雛菊','春','四季を絶やすこと','四時を絶やすこと勿れ','hinagiku','kayo hinagiku','kayohinagiku','hanaba hinagiku','hanaba-hinagiku','spring','four seasons','preserve the four seasons','do not let the four seasons cease','do not let the four seasons perish'];const acceptedKeys=accepted.map(v=>v.normalize('NFKC').replace(/\s+/g,' ').trim().toLowerCase());if(acceptedKeys.includes(key)){revealArchive();error.textContent='認証成功。機密資料への閲覧権限を確認しました。'}else{content.classList.remove('unlocked','visible');content.innerHTML='';error.textContent='認証失敗。認証キーワードを確認してください。'}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))hide()});
});
