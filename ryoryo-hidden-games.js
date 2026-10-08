/* =========================================================
   四季廳 / HIDDEN GAME CABINET
   公開情報網の裏側にある、小さな遊戯室。
   発見経路：
   ・紋章を7回クリック
   ・標語を5回クリック
   ========================================================= */
(()=>{
  const boot=()=>{
    if(document.querySelector('.ry-hidden-games')) return;
    const body=document.body;

    const css=document.createElement('style');
    css.id='ry-hidden-games-style';
    css.textContent=`
      .ry-hidden-games{position:fixed;inset:0;z-index:11000;display:none;background:rgba(18,16,14,.62);backdrop-filter:blur(7px)}
      .ry-hidden-games.open{display:block}
      .ry-game-cabinet{position:absolute;left:50%;top:7%;transform:translateX(-50%);width:min(760px,calc(100vw - 26px));max-height:86vh;overflow:auto;background:#fffaf0;color:#2d2823;border:1px solid #a98b55;border-top:5px double #711d28;box-shadow:0 28px 100px rgba(0,0,0,.38)}
      .ry-game-head{padding:18px 22px 15px;border-bottom:1px solid #d6c7ae;display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
      .ry-game-meta{position:absolute;left:0;right:0;bottom:0;display:flex;gap:0;border-top:1px solid #d6c7ae;background:#f2eadd;font:8px "Noto Sans JP","Yu Gothic",sans-serif;letter-spacing:.08em;color:#74685c}
      .ry-game-meta span{padding:6px 12px;border-right:1px solid #d6c7ae}
      .ry-game-meta span:last-child{color:#243c35}
      .ry-game-head{position:relative;padding-bottom:48px}
      .ry-game-card:after{content:"STATUS  /  使用可";position:absolute;left:17px;bottom:10px;color:#837563;font:8px Georgia,serif;letter-spacing:.09em}
      .ry-game-card em{bottom:27px}
      .ry-game-kicker{font:9px Georgia,serif;letter-spacing:.22em;color:#8a7650}
      .ry-game-head h2{margin:5px 0 4px;font:500 23px "Shippori Mincho","Yu Mincho",serif;letter-spacing:.08em;color:#54131d}
      .ry-game-head p{margin:0;font-size:11px;color:#73695f;line-height:1.7}
      .ry-game-close{width:32px;height:32px;border:1px solid #bea983;background:#f8f0df;color:#54131d;cursor:pointer;font-size:16px;line-height:1}
      .ry-game-body{padding:20px 22px 25px}
      .ry-game-jurisdiction{display:flex;flex-wrap:wrap;gap:0;margin:-4px 0 16px;border:1px solid #cbb99a;background:#f3ecdf;font:9px "Shippori Mincho","Yu Mincho",serif;letter-spacing:.1em;color:#5e554b}
      .ry-game-jurisdiction span{padding:7px 11px;border-right:1px solid #cbb99a}
      .ry-game-jurisdiction span:first-child{color:#54131d;font-weight:600}
      .ry-game-jurisdiction span:last-child{border-right:0;color:#243c35}
      .ry-game-menu{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
      .ry-game-card{position:relative;min-height:164px;padding:17px;border:1px solid #cbb99a;background:#fcf7ed;text-align:left;cursor:pointer;transition:.18s ease}
      .ry-game-card:hover{transform:translateY(-2px);background:#f1e5d1;border-color:#9e8150;box-shadow:0 8px 20px rgba(55,33,15,.08)}
      .ry-game-card b{display:block;color:#8a202d;font:9px Georgia,serif;letter-spacing:.15em;margin-bottom:9px}
      .ry-game-card strong{display:block;font:500 16px "Shippori Mincho","Yu Mincho",serif;letter-spacing:.06em;margin-bottom:8px}
      .ry-game-card span{display:block;color:#6f665d;font-size:11px;line-height:1.75}
      .ry-game-card em{position:absolute;right:12px;bottom:10px;color:#9d7b42;font:10px Georgia,serif;font-style:normal}
      .ry-game-hint{margin:15px 0 0;padding:10px 12px;border-left:3px solid #243c35;background:#f1eadf;color:#665d54;font-size:10px;line-height:1.8}
      .ry-game-panel[hidden]{display:none}
      .ry-game-panel h3{margin:0 0 7px;font:500 20px "Shippori Mincho","Yu Mincho",serif;color:#54131d}
      .ry-game-panel .ry-game-note{margin:0 0 15px;color:#726960;font-size:11px;line-height:1.8}
      .ry-memory-status{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:10px 12px;border:1px solid #d2c1a3;background:#f7efe2;margin-bottom:13px;font-size:11px}
      .ry-memory-seq{font-family:Georgia,serif;letter-spacing:.12em;color:#8a202d}
      .ry-memory-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;max-width:480px;margin:0 auto}
      .ry-memory-btn{aspect-ratio:1;border:1px solid #b8a17a;background:#fbf6eb;cursor:pointer;color:#2d2823;font:500 22px "Shippori Mincho","Yu Mincho",serif;transition:.15s}
      .ry-memory-btn:hover{background:#eee2cc}
      .ry-memory-btn.flash{background:#243c35;color:#fff8ea;transform:scale(.98)}
      .ry-memory-btn.correct{background:#8a202d;color:#fff8ea}
      .ry-memory-btn.wrong{background:#e8cfc9;animation:ry-shake .25s linear 2}
      @keyframes ry-shake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
      .ry-game-result{margin-top:14px;min-height:25px;color:#54131d;font-family:"Shippori Mincho","Yu Mincho",serif;letter-spacing:.05em}
      .ry-collect-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}
      .ry-collect-stage{position:relative;overflow:hidden;height:360px;border:1px solid #cbb99a;background:linear-gradient(#f7efe1,#eee4d4)}
      .ry-season-field{position:absolute;inset:0;pointer-events:none}
      .ry-falling-item{position:absolute;pointer-events:auto;display:grid;place-items:center;width:38px;height:38px;border-radius:50%;border:1px solid rgba(84,19,29,.28);background:#fffaf0;box-shadow:0 3px 9px rgba(50,30,15,.12);cursor:pointer;font-size:20px;user-select:none}
      .ry-falling-item:hover{transform:scale(1.12)}
      .ry-collect-score{font:600 12px Georgia,serif;color:#243c35}
      .ry-collect-timer{font:600 12px Georgia,serif;color:#8a202d}
      .ry-collect-start,.ry-decode-submit{border:1px solid #752b2d;background:#752b2d;color:#fffaf3;padding:10px 16px;cursor:pointer;font-family:inherit;letter-spacing:.08em}
      .ry-decode-box{padding:14px;border:1px solid #d1c1a5;background:#f7efe2}
      .ry-decode-code{font:500 25px Georgia,serif;letter-spacing:.28em;text-align:center;color:#54131d;padding:13px 8px;border-bottom:1px solid #c8b696;margin-bottom:12px}
      .ry-decode-choices{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
      .ry-decode-choice{border:1px solid #c4b18f;background:#fffaf0;padding:12px 6px;cursor:pointer;font:500 16px "Shippori Mincho",serif;color:#2d2823}
      .ry-decode-choice:hover,.ry-decode-choice.selected{background:#243c35;color:#fffaf0}
      .ry-secret-stamp{margin-top:13px;padding:12px;border:1px double #8a202d;background:#fff7ea;color:#54131d;font:500 13px "Shippori Mincho",serif;line-height:1.8}
      .ry-hidden-footer{display:flex;justify-content:space-between;gap:14px;align-items:center;margin-top:17px;padding-top:12px;border-top:1px solid #d6c7ae;font-size:10px;color:#85796b}
      .ry-game-back{border:0;background:transparent;color:#8a202d;cursor:pointer;font:11px "Shippori Mincho",serif}
      .ry-game-discover{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:10990;opacity:.18;font:8px Georgia,serif;letter-spacing:.2em;color:#8a7650;pointer-events:none}
      .ry-game-reopen{position:fixed;left:12px;bottom:12px;z-index:9005;border:1px solid #b9985b;background:rgba(255,250,240,.93);color:#54131d;padding:7px 10px;font:10px "Shippori Mincho",serif;letter-spacing:.08em;cursor:pointer;box-shadow:0 4px 12px rgba(50,35,24,.1)}
      .ry-game-reopen:hover{background:#f0e5d1}
      @media(max-width:700px){
        .ry-game-cabinet{top:3%;max-height:92vh}
        .ry-game-menu{grid-template-columns:1fr}
        .ry-game-card{min-height:120px}
        .ry-game-body{padding:17px}
        .ry-memory-grid{gap:7px}
        .ry-collect-stage{height:320px}
      }
      @media(prefers-reduced-motion:reduce){
        .ry-memory-btn,.ry-game-card{transition:none}
        .ry-memory-btn.wrong{animation:none}
      }
    `;
    document.head.appendChild(css);

    const overlay=document.createElement('div');
    overlay.className='ry-hidden-games';
    overlay.innerHTML=`
      <div class="ry-game-cabinet" role="dialog" aria-modal="true" aria-labelledby="ry-game-title">
        <div class="ry-game-head">
          <div class="ry-game-meta"><span>官廳符號　SHIKI-04</span><span>系統區分　帝國官務</span><span>通信狀態　正常</span></div>
          <div>
            <div class="ry-game-kicker">HINOMOTO IMPERIAL GOVERNMENT / SHIKI CHO</div>
            <h2 id="ry-game-title">日ノ本帝國 四季廳・官務端末</h2>
            <p>本端末は帝國官務網の内部系統に属します。四季神祇行政に関する官務処理、文書照合その他の庁務補助に使用します。</p>
          </div>
          <button class="ry-game-close" type="button" aria-label="閉じる">×</button>
        </div>
        <div class="ry-game-body"><div class="ry-game-jurisdiction"><span>日ノ本帝國</span><span>四季神祇行政</span><span>勅命行政機關</span></div>
          <div class="ry-game-menu">
            <button class="ry-game-card" type="button" data-game="memory">
              <b>官務訓練 01 / 四時照合</b><strong>四時官務・順序照合</strong>
              <span>官務標準に基づき、四時の巡行順を記憶し、同一順序にて標章を照合してください。</span><em>SEQUENCE CHECK</em>
            </button>
            <button class="ry-game-card" type="button" data-game="collect">
              <b>官務訓練 02 / 標章受納</b><strong>季節標章・受納査定</strong>
              <span>四季標章を所定時間内に受納し、定数に達した時点で処理を終了してください。</span><em>MARK COLLECTION</em>
            </button>
            <button class="ry-game-card" type="button" data-game="decode">
              <b>官務訓練 03 / 文書審査</b><strong>秘匿文書・四時分類審査</strong>
              <span>文書に付された四時符を審査し、帝國官務規程における正規分類順を確定してください。</span><em>DOCUMENT CHECK</em>
            </button>
          </div>
          <div class="ry-game-hint">官務履歷：<span id="ry-game-record">未記録</span>　／　本端末における処理履歷は、この端末内の記録簿にのみ保存されます。</div>

          <section class="ry-game-panel" data-panel="memory" hidden>
            <button class="ry-game-back" type="button">← 官務目錄へ</button>
            <h3>四時官務・順序照合</h3>
            <p class="ry-game-note">四時標章を記憶し、同一順序にて照合します。正常処理後、次の審査段階へ移行します。</p>
            <div class="ry-memory-status"><span>審査階次 <b id="ry-memory-level">一</b></span><span class="ry-memory-seq" id="ry-memory-seq">順番を準備中</span></div>
            <div class="ry-memory-grid" id="ry-memory-grid"></div>
            <div class="ry-game-result" id="ry-memory-result"></div>
          </section>

          <section class="ry-game-panel" data-panel="collect" hidden>
            <button class="ry-game-back" type="button">← 官務目錄へ</button>
            <h3>季節標章・受納査定</h3>
            <p class="ry-game-note">「春」「夏」「秋」「冬」の標章を受納してください。制限時間30秒、受納定数15件。</p>
            <div class="ry-collect-head"><span class="ry-collect-score" id="ry-collect-score">受納件数 0 / 15</span><span class="ry-collect-timer" id="ry-collect-timer">00:30</span></div>
            <div class="ry-collect-stage" id="ry-collect-stage"><div class="ry-season-field" id="ry-season-field"></div></div>
            <button class="ry-collect-start" id="ry-collect-start" type="button">受納開始</button>
            <div class="ry-game-result" id="ry-collect-result"></div>
          </section>

          <section class="ry-game-panel" data-panel="decode" hidden>
            <button class="ry-game-back" type="button">← 官務目錄へ</button>
            <h3>秘匿文書・四時分類審査</h3>
            <p class="ry-game-note">付與された四時分類符を確認し、規程上の順序に従って標章を選択してください。</p>
            <div class="ry-decode-box">
              <div class="ry-decode-code" id="ry-decode-code">春 → 夏 → 秋 → 冬</div>
              <div class="ry-decode-choices" id="ry-decode-choices"></div>
              <div style="text-align:center;margin-top:12px"><button class="ry-decode-submit" id="ry-decode-submit" type="button">分類審査</button></div>
            </div>
            <div class="ry-game-result" id="ry-decode-result"></div>
          </section>

          <div class="ry-hidden-footer"><span>接續先：日ノ本帝國 四季廳 官務端末　｜　官廳符號：SHIKI-04</span><button class="ry-game-close ry-game-close-text" type="button">閉じる</button></div>
        </div>
      </div>
    `;
    body.appendChild(overlay);

    const discover=document.createElement('div');
    discover.className='ry-game-discover';
    discover.textContent='公開情報網にない内部事務端末';
    body.appendChild(discover);

    const recordsKey='shiki-hidden-game-records';
    const records=JSON.parse(localStorage.getItem(recordsKey)||'[]');
    const saveRecord=(name)=>{
      if(!records.includes(name)){
        records.push(name);
        localStorage.setItem(recordsKey,JSON.stringify(records));
      }
      const el=overlay.querySelector('#ry-game-record');
      if(el) el.textContent=records.length+' 件';
    };
    overlay.querySelector('#ry-game-record').textContent=records.length?records.length+' 件':'未記録';

    const open=()=>{
      overlay.classList.add('open');
      openMenu();
      try{sessionStorage.setItem('shiki-hidden-games-found','1')}catch(_){}
    };
    const close=()=>{overlay.classList.remove('open');stopCollect()};
    const openMenu=()=>{
      overlay.querySelectorAll('.ry-game-panel').forEach(p=>p.hidden=true);
      overlay.querySelector('.ry-game-menu').hidden=false;
      stopCollect();
    };
    const openPanel=(name)=>{
      overlay.querySelector('.ry-game-menu').hidden=true;
      overlay.querySelectorAll('.ry-game-panel').forEach(p=>p.hidden=p.dataset.panel!==name);
      if(name==='memory')startMemory();
      if(name==='decode')startDecode();
    };

    overlay.querySelectorAll('.ry-game-close').forEach(b=>b.addEventListener('click',close));
    overlay.querySelectorAll('.ry-game-card').forEach(b=>b.addEventListener('click',()=>openPanel(b.dataset.game)));
    overlay.querySelectorAll('.ry-game-back').forEach(b=>b.addEventListener('click',openMenu));
    overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))close()});

    /* GAME I: 四時記憶 */
    const symbols=[
      {k:'spring',char:'春'}, {k:'summer',char:'夏'},
      {k:'autumn',char:'秋'}, {k:'winter',char:'冬'},
    ];
    let memSeq=[],memPos=0,memLocked=false,memLevel=1;
    const memGrid=overlay.querySelector('#ry-memory-grid');
    const memResult=overlay.querySelector('#ry-memory-result');
    const memLevelEl=overlay.querySelector('#ry-memory-level');
    const memSeqEl=overlay.querySelector('#ry-memory-seq');
    const makeMemoryGrid=()=>{
      memGrid.innerHTML=symbols.map((s,i)=>`<button type="button" class="ry-memory-btn" data-k="${s.k}" aria-label="${s.char}">${s.char}</button>`).join('');
      memGrid.querySelectorAll('.ry-memory-btn').forEach(btn=>btn.addEventListener('click',()=>memoryClick(btn)));
    };
    const flashSequence=()=>{
      memLocked=true;
      memSeqEl.textContent='順番を記憶してください';
      memGrid.querySelectorAll('.ry-memory-btn').forEach(b=>b.classList.remove('flash','correct','wrong'));
      memSeq.forEach((k,i)=>{
        setTimeout(()=>{
          const b=memGrid.querySelector(`[data-k="${k}"]`);
          if(!b)return;
          b.classList.add('flash');
          setTimeout(()=>b.classList.remove('flash'),380);
        },500+i*650);
      });
      setTimeout(()=>{
        memLocked=false;
        memPos=0;
        memSeqEl.textContent='提示順に四時標章を照合してください';
      },500+memSeq.length*650);
    };
    const startMemory=()=>{
      memLevel=1;
      memLevelEl.textContent='一';
      memResult.textContent='';
      makeMemoryGrid();
      nextMemoryRound();
    };
    const nextMemoryRound=()=>{
      const order=[...symbols].sort(()=>Math.random()-.5).slice(0,Math.min(4,2+memLevel));
      memSeq=order.map(x=>x.k);
      memSeqEl.textContent='順番を記憶中…';
      flashSequence();
    };
    const memoryClick=btn=>{
      if(memLocked)return;
      const expected=memSeq[memPos];
      if(btn.dataset.k!==expected){
        btn.classList.add('wrong');setTimeout(()=>btn.classList.remove('wrong'),500);
        memResult.textContent='照合失敗。もう一度この段位から。';
        saveRecord('四時官務・順序照合');
        setTimeout(()=>nextMemoryRound(),700);
        return;
      }
      btn.classList.add('correct');
      setTimeout(()=>btn.classList.remove('correct'),250);
      memPos++;
      if(memPos>=memSeq.length){
        if(memLevel>=3){
          memResult.innerHTML='照合成功。<strong>「四時ヲ絶ヤス事勿レ。」</strong>　閲覧記録を登録しました。';
          saveRecord('四時官務・順序照合');
          memLocked=true;
        }else{
          memLevel++;
          memLevelEl.textContent=['一','二','三','四'][memLevel-1];
          memResult.textContent='正解。次の段位へ。';
          setTimeout(nextMemoryRound,650);
        }
      }
    };

    /* GAME II: 花葉集め */
    let collectTimer=null,collectTick=null,collectScore=0;
    const field=overlay.querySelector('#ry-season-field');
    const scoreEl=overlay.querySelector('#ry-collect-score');
    const timerEl=overlay.querySelector('#ry-collect-timer');
    const collectResult=overlay.querySelector('#ry-collect-result');
    const startCollect=()=>{
      stopCollect();
      collectScore=0;let left=30;
      scoreEl.textContent='受納件数 0 / 15';timerEl.textContent='00:30';collectResult.textContent='';
      field.innerHTML='';
      const spawn=()=>{
        const item=document.createElement('button');
        item.type='button';item.className='ry-falling-item';
        const s=symbols[Math.floor(Math.random()*symbols.length)];
        item.textContent=s.char;item.setAttribute('aria-label',s.char+'を拾う');
        item.style.left=(4+Math.random()*86)+'%';item.style.top=(4+Math.random()*82)+'%';
        item.addEventListener('click',()=>{
          collectScore++;
          scoreEl.textContent='奉納数 '+collectScore+' / 15';
          item.remove();
          if(collectScore>=15){
            collectResult.textContent='受納定数到達。官務處理を完了し、記録簿への登錄を終了しました。';
            saveRecord('季節標章・受納査定');
            stopCollect();
          }
        },{once:true});
        field.appendChild(item);
        setTimeout(()=>item.isConnected&&item.remove(),1900);
      };
      for(let i=0;i<8;i++)setTimeout(spawn,i*180);
      collectTimer=setInterval(()=>{
        left--;timerEl.textContent='00:'+(left<10?'0':'')+left;
        spawn();
        if(left<=0){
          stopCollect();
          if(collectScore<15)collectResult.textContent='受納定数未達。官務手續を再執行してください。';
        }
      },1000);
    };
    const stopCollect=()=>{
      clearInterval(collectTimer);collectTimer=null;
      clearInterval(collectTick);collectTick=null;
      if(field)field.innerHTML='';
    };
    overlay.querySelector('#ry-collect-start').addEventListener('click',startCollect);

    /* GAME III: 四時暗号 */
    const decodeCode=overlay.querySelector('#ry-decode-code');
    const decodeChoices=overlay.querySelector('#ry-decode-choices');
    const decodeResult=overlay.querySelector('#ry-decode-result');
    const decodeSubmit=overlay.querySelector('#ry-decode-submit');
    let decodeAnswer=[],decodePick=[];
    const startDecode=()=>{
      decodePick=[];
      const order=[...symbols].sort(()=>Math.random()-.5);
      decodeAnswer=order.map(x=>x.k);
      decodeCode.textContent=order.map(x=>x.char).join('　→　');
      decodeChoices.innerHTML=order.map((x,i)=>`<button type="button" class="ry-decode-choice" data-k="${x.k}">${x.char}</button>`).join('');
      decodeResult.textContent='';
      decodeChoices.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{
        if(decodePick.includes(btn.dataset.k))return;
        decodePick.push(btn.dataset.k);btn.classList.add('selected');
      }));
    };
    decodeSubmit.addEventListener('click',()=>{
      if(decodePick.length!==decodeAnswer.length){decodeResult.textContent='四つすべて選んでください。';return}
      if(decodePick.join('|')===decodeAnswer.join('|')){
        decodeResult.innerHTML='<div class="ry-secret-stamp">審査成立・分類確定。<br>文書番號：四季廳秘-001　｜　取扱區分：秘　｜　官務履歷：登錄済</div>';
        saveRecord('秘匿文書・四時分類審査');
      }else{
        decodeResult.textContent='分類順序不一致。帝國官務規程に照らし、再審査してください。';
      }
    });

    /* 発見用トリガー */
    let discoveryClicks=0,discoveryTimer=null;
    const bindDiscovery=(selector,limit)=>{
      document.querySelectorAll(selector).forEach(el=>{
        let pressTimer=null;
        const register=()=>{
          clearTimeout(discoveryTimer);
          discoveryClicks++;
          discoveryTimer=setTimeout(()=>{discoveryClicks=0},2500);
          if(discoveryClicks>=limit){
            discoveryClicks=0;
            clearTimeout(pressTimer);
            open();
          }
        };
        el.addEventListener('click',e=>{
          register();
          if(overlay.classList.contains('open')) e.preventDefault();
        });
        el.addEventListener('pointerdown',()=>{
          clearTimeout(pressTimer);
          pressTimer=setTimeout(()=>{
            discoveryClicks=0;
            open();
          },1800);
        });
        ['pointerup','pointercancel','pointerleave'].forEach(type=>{
          el.addEventListener(type,()=>clearTimeout(pressTimer));
        });
      });
    };
    // ロゴ3回、または標語3回。ロゴ長押しでも開く。
    bindDiscovery('.brand-mark,.brand',3);
    bindDiscovery('.motto',3);

    let discovered=false;
    try{discovered=sessionStorage.getItem('shiki-hidden-games-found')==='1'}catch(_){}
    if(discovered){
      const mini=document.createElement('button');
      mini.type='button';
      mini.className='ry-game-reopen';
      mini.textContent='内部端末';
      mini.title='内部事務補助端末を開く';
      mini.addEventListener('click',open);
      body.appendChild(mini);
    }

    window.shikiHiddenGames={open,close};
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();