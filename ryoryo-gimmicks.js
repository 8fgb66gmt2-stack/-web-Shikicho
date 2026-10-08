/* =========================================================
   四季廳 / RYORYO ROMAN INTERACTION LAYER
   UIギミック：四時索引・閲覧記録・公文書コマンド・季節追従
   ========================================================= */
document.addEventListener('DOMContentLoaded',()=>{
  const root=document.documentElement;
  const body=document.body;

  const style=document.createElement('style');
  style.id='ryoryo-gimmick-style';
  style.textContent=`
  /* ---- 右端：四時索引 ---- */
  .ry-gimmick-rail{
    position:fixed;right:18px;top:50%;transform:translateY(-50%);
    z-index:9000;width:38px;display:flex;flex-direction:column;
    background:rgba(255,250,240,.92);border:1px solid #c8b69a;
    box-shadow:0 7px 24px rgba(50,35,24,.10);
    backdrop-filter:blur(4px);
  }
  .ry-gimmick-rail:before{
    content:"四時";display:grid;place-items:center;height:35px;
    background:#711d28;color:#fff5e5;font:13px "Shippori Mincho",serif;
    letter-spacing:.1em;border-bottom:1px solid #c8b69a;
  }
  .ry-season-btn{
    width:38px;height:43px;padding:0;border:0;border-bottom:1px solid #ddd2c0;
    background:transparent;color:#5d554d;cursor:pointer;
    display:grid;place-items:center;gap:0;
    font-family:"Shippori Mincho",serif;
  }
  .ry-season-btn:last-child{border-bottom:0}
  .ry-season-btn b{font-size:16px;font-weight:500;line-height:1}
  .ry-season-btn small{font:7px Georgia,serif;letter-spacing:.08em}
  .ry-season-btn:hover{background:#eee6d8;color:#711d28}
  .ry-season-btn.active{background:#263f36;color:#fff5e6}
  .ry-season-btn.spring{border-top:3px solid #d49ba7}
  .ry-season-btn.summer{border-top:3px solid #d5b04d}
  .ry-season-btn.autumn{border-top:3px solid #9a7152}
  .ry-season-btn.winter{border-top:3px solid #9ebec9}

  /* ---- 閲覧記録スタンプ ---- */
  .ry-view-stamp{
    position:fixed;left:50%;top:50%;transform:translate(-50%,-50%) scale(.8) rotate(-6deg);
    z-index:10020;pointer-events:none;opacity:0;
    color:#711d28;border:3px double #711d28;padding:10px 17px;
    background:rgba(255,250,240,.88);
    font:600 13px "Shippori Mincho",serif;letter-spacing:.18em;
  }
  .ry-view-stamp.show{animation:ryStamp .9s ease forwards}
  @keyframes ryStamp{
    0%{opacity:0;transform:translate(-50%,-50%) scale(1.35) rotate(-12deg)}
    20%{opacity:1}
    70%{opacity:.82;transform:translate(-50%,-50%) scale(1) rotate(-6deg)}
    100%{opacity:0;transform:translate(-50%,-50%) scale(.96) rotate(-6deg)}
  }

  /* ---- スクロール進行標 ---- */
  .ry-scroll-progress{
    position:fixed;left:0;top:0;height:3px;width:0;z-index:10030;
    background:linear-gradient(90deg,#d49ba7 0 25%,#d5b04d 25% 50%,#9a7152 50% 75%,#9ebec9 75%);
  }
  .ry-scroll-label{
    position:fixed;left:10px;top:50%;transform:translateY(-50%) rotate(180deg);
    writing-mode:vertical-rl;z-index:8999;color:#8d7759;opacity:.55;
    font:7px Georgia,serif;letter-spacing:.25em;pointer-events:none;
  }

  /* ---- コマンドパレット ---- */
  .ry-command-backdrop{
    position:fixed;inset:0;z-index:10010;display:none;
    background:rgba(22,20,17,.52);backdrop-filter:blur(5px);
  }
  .ry-command-backdrop.open{display:block}
  .ry-command{
    position:absolute;left:50%;top:15%;transform:translateX(-50%);
    width:min(620px,calc(100vw - 30px));background:#fffaf0;
    border:1px solid #9d8661;border-top:4px double #711d28;
    box-shadow:0 25px 80px rgba(20,14,10,.32);
  }
  .ry-command-head{padding:17px 20px 13px;border-bottom:1px solid #d1c2aa}
  .ry-command-head small{display:block;color:#9a7845;font:8px Georgia,serif;letter-spacing:.25em}
  .ry-command-head h2{margin:4px 0 0;color:#4d1b22;font:500 20px "Shippori Mincho",serif}
  .ry-command-input{
    box-sizing:border-box;width:100%;padding:13px 18px;border:0;border-bottom:1px solid #d1c2aa;
    background:#f8f1e4;color:#2b2621;font:13px "Noto Sans JP","Yu Gothic",sans-serif;outline:0;
  }
  .ry-command-list{max-height:45vh;overflow:auto}
  .ry-command-item{
    display:grid;grid-template-columns:55px 1fr auto;align-items:center;
    gap:12px;padding:12px 16px;border-bottom:1px solid #e2d8c8;
    color:#2f2924;background:transparent;cursor:pointer;
  }
  .ry-command-item:hover,.ry-command-item.selected{background:#eee4d2}
  .ry-command-item b{color:#711d28;font:9px Georgia,serif;letter-spacing:.12em}
  .ry-command-item span{font-size:12px}
  .ry-command-item small{color:#8b7a67;font-size:9px}

  /* ---- 季節選択時の環境 ---- */
  body.ry-season-spring{--ry-season-accent:#c98f9c}
  body.ry-season-summer{--ry-season-accent:#c49f39}
  body.ry-season-autumn{--ry-season-accent:#946848}
  body.ry-season-winter{--ry-season-accent:#8aaebc}
  body.ry-season-active .portal-body>.section-title{border-left-color:var(--ry-season-accent)!important}
  body.ry-season-active .ry-gimmick-rail{box-shadow:0 7px 24px rgba(50,35,24,.10),0 0 0 2px color-mix(in srgb,var(--ry-season-accent) 20%,transparent)}
  body.ry-season-active .four-season-wheel{filter:saturate(1.15);opacity:.18}

  /* ---- セクション入場演出 ---- */
  .ry-reveal{
    opacity:0;transform:translateY(18px);
    transition:opacity .65s ease,transform .65s ease;
  }
  .ry-reveal.ry-visible{opacity:1;transform:none}
  @media(prefers-reduced-motion:reduce){
    .ry-reveal{opacity:1;transform:none;transition:none}
    .ry-view-stamp{display:none}
  }

  @media(max-width:900px){
    .ry-gimmick-rail{right:8px;width:34px}
    .ry-season-btn{width:34px;height:38px}
    .ry-season-btn b{font-size:14px}
    .ry-season-btn small{display:none}
  }
  @media(max-width:650px){
    .ry-gimmick-rail{right:7px;top:auto;bottom:12px;transform:none;flex-direction:row;width:auto}
    .ry-gimmick-rail:before{height:37px;padding:0 8px}
    .ry-season-btn{width:38px;height:37px;border-bottom:0;border-right:1px solid #ddd2c0}
    .ry-season-btn:last-child{border-right:0}
    .ry-scroll-label{display:none}
    .ry-command{top:7%}
  }`;
  document.head.appendChild(style);

  /* ---- 四時索引を生成 ---- */
  if(!document.querySelector('.ry-gimmick-rail')){
    const rail=document.createElement('aside');
    rail.className='ry-gimmick-rail';
    rail.setAttribute('aria-label','四季索引');
    rail.innerHTML=[
      ['spring','春','SPRING'],['summer','夏','SUMMER'],
      ['autumn','秋','AUTUMN'],['winter','冬','WINTER']
    ].map(x=>`<button type="button" class="ry-season-btn ${x[0]}" data-season="${x[0]}" title="${x[2]}"><b>${x[1]}</b><small>${x[2]}</small></button>`).join('');
    body.appendChild(rail);

    const seasonNames=['spring','summer','autumn','winter'];
    rail.querySelectorAll('.ry-season-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const season=btn.dataset.season;
        body.classList.remove(...seasonNames.map(x=>'ry-season-'+x),'ry-season-active');
        body.classList.add('ry-season-'+season,'ry-season-active');
        rail.querySelectorAll('.ry-season-btn').forEach(b=>b.classList.toggle('active',b===btn));
        const target=document.querySelector('.gods-section')||document.querySelector('#gods');
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
        const godTab=document.querySelector(`.god-tab[data-season="${season}"]`);
        if(godTab) setTimeout(()=>godTab.click(),420);
        showStamp(season.toUpperCase()+'  /  閲覧記録');
      });
    });
  }

  /* ---- スクロール進行標 ---- */
  const progress=document.createElement('div');
  progress.className='ry-scroll-progress';
  body.appendChild(progress);
  const scrollLabel=document.createElement('div');
  scrollLabel.className='ry-scroll-label';
  scrollLabel.textContent='四季廳　・　PUBLIC RECORDS';
  body.appendChild(scrollLabel);
  const updateProgress=()=>{
    const h=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=(h>0?(scrollY/h)*100:0)+'%';
  };
  addEventListener('scroll',updateProgress,{passive:true});
  updateProgress();

  /* ---- 閲覧スタンプ ---- */
  const stamp=document.createElement('div');
  stamp.className='ry-view-stamp';
  body.appendChild(stamp);
  let stampTimer;
  function showStamp(text){
    stamp.textContent=text;
    stamp.classList.remove('show');
    clearTimeout(stampTimer);
    void stamp.offsetWidth;
    stamp.classList.add('show');
    stampTimer=setTimeout(()=>stamp.classList.remove('show'),950);
  }

  /* ---- セクションの入場 ---- */
  const revealables=[...document.querySelectorAll('.portal-body>.section,.portal-document-head,.official-identity,.official-building,.portal-file-tabs')];
  revealables.forEach(el=>el.classList.add('ry-reveal'));
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('ry-visible');
          io.unobserve(e.target);
        }
      });
    },{threshold:.08,rootMargin:'0px 0px -30px'});
    revealables.forEach(el=>io.observe(el));
  }else revealables.forEach(el=>el.classList.add('ry-visible'));

  /* ---- 公文書閲覧を記録 ---- */
  document.addEventListener('click',e=>{
    const a=e.target.closest('.news-list article a,.file-tab,.related-agency a,.duty-grid article a');
    if(!a)return;
    const label=(a.textContent||'').replace(/\s+/g,' ').trim().slice(0,24);
    if(label) showStamp('閲覧記録　'+label);
  });

  /* ---- 「/」で行政コマンド検索 ---- */
  const navTargets=[
    ['01','新着情報','官報・公告','#news'],
    ['02','四季廳について','機關案内','#about'],
    ['03','政策・施策','四季・現人神','#gods'],
    ['04','組織情報','官制・局課','#departments'],
    ['05','行政業務','施策・事務','#duties'],
    ['06','調達・採用','入札・任用','#procurement'],
    ['07','手続・相談','願届・照會','#contact'],
    ['08','関係機関','關係機關','#related-agencies']
  ];
  const backdrop=document.createElement('div');
  backdrop.className='ry-command-backdrop';
  backdrop.innerHTML=`<div class="ry-command" role="dialog" aria-modal="true" aria-labelledby="ry-command-title">
    <div class="ry-command-head"><small>RYORYO GOVERNMENT / ADMINISTRATIVE INDEX</small><h2 id="ry-command-title">行政情報を探す</h2></div>
    <input class="ry-command-input" id="ry-command-input" type="search" placeholder="項目名を入力　例：神籍 / 組織 / 官報">
    <div class="ry-command-list"></div>
  </div>`;
  body.appendChild(backdrop);
  const cmdInput=backdrop.querySelector('#ry-command-input'),cmdList=backdrop.querySelector('.ry-command-list');
  const renderCommands=(q='')=>{
    const query=q.toLowerCase().trim();
    const filtered=navTargets.filter(x=>!query||x.join(' ').toLowerCase().includes(query));
    cmdList.innerHTML=filtered.length?filtered.map(x=>`<button type="button" class="ry-command-item" data-target="${x[3]}"><b>${x[0]}</b><span>${x[1]}</span><small>${x[2]}</small></button>`).join(''):'<div style="padding:22px;color:#776d63;font-size:12px">該当する行政情報がありません。</div>';
  };
  renderCommands();
  cmdInput.addEventListener('input',()=>renderCommands(cmdInput.value));
  const openCommands=()=>{backdrop.classList.add('open');cmdInput.value='';renderCommands();setTimeout(()=>cmdInput.focus(),30)};
  const closeCommands=()=>backdrop.classList.remove('open');
  cmdList.addEventListener('click',e=>{
    const item=e.target.closest('.ry-command-item');if(!item)return;
    closeCommands();
    const target=document.querySelector(item.dataset.target);
    if(target){target.scrollIntoView({behavior:'smooth',block:'start'});showStamp('行政情報　'+item.querySelector('span').textContent);}
  });
  backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeCommands()});
  document.addEventListener('keydown',e=>{
    if(e.key==='/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')){
      e.preventDefault();openCommands();
    }
    if(e.key==='Escape'&&backdrop.classList.contains('open'))closeCommands();
  });

  /* ---- 四季廳の「閲覧済」状態を sessionStorage に保存 ---- */
  const viewedKey='shiki-ryoryo-viewed';
  const viewed=JSON.parse(sessionStorage.getItem(viewedKey)||'[]');
  const markViewed=target=>{
    if(!target?.id)return;
    if(!viewed.includes(target.id)){viewed.push(target.id);sessionStorage.setItem(viewedKey,JSON.stringify(viewed))}
  };
  const viewedObserver='IntersectionObserver' in window?new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting)markViewed(e.target)})
  },{threshold:.12}):null;
  document.querySelectorAll('.portal-body>.section').forEach(s=>viewedObserver?.observe(s));

  /* ---- 初回訪問だけ「閲覧開始」スタンプ ---- */
  if(!sessionStorage.getItem('shiki-ryoryo-welcome')){
    sessionStorage.setItem('shiki-ryoryo-welcome','1');
    setTimeout(()=>showStamp('四季廳　公開情報網'),900);
  }
});
