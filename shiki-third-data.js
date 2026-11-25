/* 四季廳・第三次大型擴張 共通公開データ
 * 既存の本廳舎・官報・護衛警備局・附属資料室の公開記載を索引化。
 * 未掲載の数値・人事・神域固有名は追加せず、原資料への参照を保持する。
 */
window.ShikiRegistryData = {
  seasons: [
    {id:"spring",name:"春",roman:"SPRING",meaning:"芽吹",deity:"花葉 雛菊",alias:"",registry:"SHK-SPR-001",power:"生命促進",bureau:"春局",director:"京極 馨",guardian:"花葉 さくら",scope:"春季行政・巡行・保全",law:"四季祭祀法・四季廳設置法",url:"index.html#panel-spring",record:"record15.html",status:"正常巡行",note:"春季神性循環に関する寄託補遺記録が附属資料室に収蔵されています。"},
    {id:"summer",name:"夏",roman:"SUMMER",meaning:"繁栄",deity:"葉桜 瑠璃",alias:"",registry:"SHK-SUM-001",power:"生命使役",bureau:"夏局",director:"九鬼 湊",guardian:"葉桜 あやめ",scope:"夏季行政・巡行・保全",law:"四季祭祀法・四季廳設置法",url:"index.html#panel-summer",record:"gazette.html#notice-2370715",status:"正常巡行",note:"附属神域・霊脈調整に伴ふ夏祭の儀令が官報に掲載されています。"},
    {id:"autumn",name:"秋",roman:"AUTUMN",meaning:"実り",deity:"祝月 杏莉",alias:"",registry:"SHK-AUT-001",power:"生命腐敗",bureau:"秋局",director:"日向 瑞穂",guardian:"阿佐美 竜胆",scope:"秋季行政・巡行・保全",law:"四季祭祀法・現人神保護法",url:"index.html#panel-autumn",record:"record19.html",status:"正常巡行",note:"現人神の保護記録は閲覧区分に応じて附属資料室で管理されています。"},
    {id:"winter",name:"冬",roman:"WINTER",meaning:"鎮護",deity:"森林 太郎",alias:"薄氷宮 幸仁",registry:"SHK-WIN-001",power:"生命凍結",bureau:"冬局",director:"石田 雅向",guardian:"雪柳 残雪",scope:"冬季行政・巡行・保全",law:"四季祭祀法・皇室典範・四季廳設置法",url:"index.html#panel-winter",record:"record18.html",status:"正常巡行",note:"皇太子護衛を含む関係記録は護衛警備局の公開案内を参照してください。"}
  ],
  offices: [
    {id:"chief",name:"長官室",group:"統括",lead:"花葉 春月",scope:"四季行政全般の統轄。帝國政府・宮内廳・各局との調整。",related:"四季廳全局・帝國政府・宮内廳",url:"chief-office.html",docs:["constitution.html","miyauchi.html"]},
    {id:"spring",name:"春局",group:"季節行政",lead:"京極 馨",scope:"春季行政・巡行・保全。",related:"花葉 雛菊・花葉 さくら",url:"index.html#departments",docs:["gazette.html#notice-2370820","record15.html"]},
    {id:"summer",name:"夏局",group:"季節行政",lead:"九鬼 湊",scope:"夏季行政・巡行・保全。",related:"葉桜 瑠璃・葉桜 あやめ",url:"index.html#departments",docs:["gazette.html#notice-2370715"]},
    {id:"autumn",name:"秋局",group:"季節行政",lead:"日向 瑞穂",scope:"秋季行政・巡行・保全。",related:"祝月 杏莉・阿佐美 竜胆",url:"index.html#departments",docs:["record19.html"]},
    {id:"winter",name:"冬局",group:"季節行政",lead:"石田 雅向",scope:"冬季行政・巡行・保全。",related:"森林 太郎／薄氷宮 幸仁・雪柳 残雪",url:"index.html#departments",docs:["record18.html","security.html"]},
    {id:"conservation",name:"保全課",group:"専門行政",lead:"本廳所管",scope:"四季循環・神域・霊脈その他の保全。",related:"四季四局",url:"index.html#departments",docs:["constitution.html","archive.html"]},
    {id:"external",name:"外事課",group:"専門行政",lead:"本廳所管",scope:"外部機関・地方機関・対外事案の連絡調整。",related:"関係行政機關",url:"index.html#departments",docs:["miyauchi.html"]},
    {id:"ritual",name:"四季祭祀課",group:"専門行政",lead:"本廳所管",scope:"祭祀儀礼・神域行事・記録の統括。",related:"四季四局・神域保全",url:"index.html#departments",docs:["gazette.html#notice-2370715","archive.html"]},
    {id:"palace",name:"宮内課",group:"専門行政",lead:"南海 美哉臣",scope:"皇室・宮内廳との連絡および共同事務。",related:"宮内廳",url:"miyauchi.html",docs:["miyauchi.html","constitution.html"]},
    {id:"security",name:"護衛警備局",group:"専門行政",lead:"公開組織案内を参照",scope:"現人神特殊警備、「賊」対策、神祇災害時の合同警備。",related:"四季四局・國家治安機構",url:"security.html",docs:["security.html","national-security/"]},
    {id:"records",name:"附属資料室",group:"記録・閲覧",lead:"資料室管理",scope:"公開行政資料・寄託資料・神祇記録の保存および閲覧。",related:"帝國大學文科附属資料室",url:"archive.html",docs:["archive.html","record15.html","record17.html","record18.html","record19.html"]}
  ],
  people: [
    {name:"花葉 春月",role:"四季廳長官",unit:"長官室",tags:"統括・著者名義照合",url:"chief-office.html",related:"record17.html"},
    {name:"花葉 雛菊",role:"春の現人神",unit:"春局",tags:"SHK-SPR-001・生命促進",url:"index.html#panel-spring",related:"record15.html"},
    {name:"葉桜 瑠璃",role:"夏の現人神",unit:"夏局",tags:"SHK-SUM-001・生命使役",url:"index.html#panel-summer",related:"gazette.html#notice-2370715"},
    {name:"祝月 杏莉",role:"秋の現人神",unit:"秋局",tags:"SHK-AUT-001・生命腐敗",url:"index.html#panel-autumn",related:"record19.html"},
    {name:"森林 太郎",role:"冬の現人神／薄氷宮 幸仁",unit:"冬局",tags:"SHK-WIN-001・皇太子",url:"index.html#panel-winter",related:"security.html"},
    {name:"京極 馨",role:"春局局長",unit:"春局",tags:"春季行政・巡行・保全",url:"gazette.html#notice-2370820",related:"index.html#departments"},
    {name:"九鬼 湊",role:"夏局局長",unit:"夏局",tags:"夏季行政・巡行・保全",url:"index.html#departments",related:"index.html#panel-summer"},
    {name:"日向 瑞穂",role:"秋局局長",unit:"秋局",tags:"秋季行政・巡行・保全",url:"index.html#departments",related:"index.html#panel-autumn"},
    {name:"石田 雅向",role:"冬局局長",unit:"冬局",tags:"冬季行政・巡行・保全",url:"index.html#departments",related:"index.html#panel-winter"},
    {name:"花葉 さくら",role:"春の現人神護衛官",unit:"春局・護衛",tags:"東欧史・ヴラド三世研究",url:"index.html#guards",related:"record15.html"},
    {name:"葉桜 あやめ",role:"夏の現人神護衛官",unit:"夏局・護衛",tags:"警備・神祇災害對策",url:"index.html#guards",related:"security.html"},
    {name:"阿佐美 竜胆",role:"秋の現人神護衛官",unit:"秋局・護衛",tags:"護衛・保全",url:"index.html#guards",related:"record19.html"},
    {name:"雪柳 残雪",role:"冬の現人神護衛官",unit:"冬局・護衛",tags:"皇族警護・冬局連携",url:"index.html#guards",related:"record17.html"},
    {name:"南海 美哉臣",role:"宮内課長",unit:"宮内課",tags:"宮内廳連携・帝國大學非常勤教授",url:"miyauchi.html",related:"constitution.html"},
    {name:"菊嘉 則宗",role:"名誉局長・四季廳次官",unit:"護衛警備局",tags:"行政統括・四季廳全体との調整",url:"security.html",related:"index.html#departments"},
    {name:"道誉 山茶花",role:"護衛警備局長",unit:"護衛警備局",tags:"局務統理・合同警備指揮",url:"security.html",related:"national-security/"},
    {name:"姫鶴 羅馬",role:"護衛警備局副局長",unit:"護衛警備局",tags:"現場運用・警備體制調整",url:"security.html",related:"national-security/"},
    {name:"九条 翠月",role:"特殊対賊部隊「豪猪」隊長",unit:"國家治安機構",tags:"警察・特殊対賊部隊",url:"national-security/personnel/index.html",related:"national-security/index.html"}
  ],
  documents: [
    {id:"SH-ARCHIVE-015",number:"第十五號",title:"春季神性循環・補遺記録",class:"封緘指定",date:"帝國暦二三六年",department:"四季廳附属資料室",people:"花葉 雛菊・花葉 春月・花葉 さくら",event:"春季神性波動乖離",url:"record15.html",summary:"春季神性波動の乖離と、公開巡行記録との異同を記録した寄託資料。"},
    {id:"SH-ARCHIVE-016",number:"第十六號",title:"資料未登録",class:"目録未登録",date:"",department:"帝國大學文科附属資料室",people:"",event:"人物相関照合",url:"archive.html",summary:"関連記録の存在が附属資料室の公開目録に記載されています。"},
    {id:"SH-ARCHIVE-017",number:"第十七號",title:"著者名義照合記録",class:"一般公開",date:"",department:"四季廳附属資料室",people:"花葉 春月・大窪 晶与・雪柳 残雪",event:"『ヴラド・ドラクラ』著者名義照合",url:"record17.html",summary:"帝國大學側と四季廳側に残る著者名義の異同を照合した記録。"},
    {id:"SH-ARCHIVE-018",number:"第十八號",title:"春季巡行欠落記録",class:"一般公開",date:"帝國暦二三六年",department:"四季廳附属資料室",people:"花葉 雛菊・花葉 春月・雪柳 残雪",event:"春季神性波動乖離",url:"record18.html",summary:"公開行政記録の正常判定と寄託資料の欠落期間を対照した追補記録。"},
    {id:"SH-ARCHIVE-019",number:"第十九號",title:"別冊保護記録",class:"関係者限定",date:"帝國暦二三六年",department:"四季廳・護衛官記録",people:"花葉 雛菊・花葉 春月",event:"春の現人神の保護",url:"record19.html",summary:"春の現人神に関する保護記録。詳細な私的記録は本人の要請により非公開。"},
    {id:"SH-GAZETTE-2370902",number:"官報 237.09.02",title:"四時神性波動に於ける氣候影響調査の開示",class:"一般公開",date:"帝國暦237.09.02",department:"四季廳・帝國大學共同研究",people:"帝國大學農學部・理學部",event:"共同研究開示",url:"gazette.html#notice-2370902",summary:"帝國大學農學部・理學部との共同研究の開示に関する公告。"},
    {id:"SH-GAZETTE-2370820",number:"官報 237.08.20",title:"春局局長就任公告",class:"一般公開",date:"帝國暦237.08.20",department:"春局",people:"京極 馨",event:"人事",url:"gazette.html#notice-2370820",summary:"春局局長に京極馨氏が正式就任した旨の公告。"},
    {id:"SH-GAZETTE-2370715",number:"官報 237.07.15",title:"夏祭執行の儀令開示",class:"一般公開",date:"帝國暦237.07.15",department:"四季祭祀課",people:"葉桜 瑠璃",event:"夏祭・霊脈調整",url:"gazette.html#notice-2370715",summary:"附属神域・霊脈調整に伴ふ夏祭の執行に関する公告。"}
  ],
  facilities: [
    {id:"chief",name:"長官室",zone:"統括区域",scope:"四季廳長官による四季行政全般の統轄・機關間調整。",url:"chief-office.html",related:"花葉 春月"},
    {id:"general",name:"総務・本廳事務",zone:"統括区域",scope:"本廳の行政運営および各局間の庶務。公開組織図・官報を参照。",url:"index.html#departments",related:"総務課"},
    {id:"season",name:"四季四局",zone:"季節行政区域",scope:"春・夏・秋・冬それぞれの季節行政、巡行および保全。",url:"index.html#departments",related:"京極 馨・九鬼 湊・日向 瑞穂・石田 雅向"},
    {id:"ritual",name:"四季祭祀課",zone:"祭祀・保全区域",scope:"祭祀儀礼、神域行事および執行記録の統括。",url:"gazette.html",related:"夏祭執行公告"},
    {id:"conservation",name:"保全課",zone:"祭祀・保全区域",scope:"四季循環、神域、霊脈その他の保全。",url:"index.html#duties",related:"四季四局"},
    {id:"palace",name:"宮内課",zone:"機關連絡区域",scope:"皇室・宮内廳との連絡および共同事務。",url:"miyauchi.html",related:"南海 美哉臣"},
    {id:"security",name:"護衛警備局",zone:"警備区域",scope:"現人神特殊警備、「賊」対策および神祇災害時の合同警備。",url:"security.html",related:"現人神護衛官"},
    {id:"archive",name:"附属資料室",zone:"記録閲覧区域",scope:"公開行政資料・寄託資料・神祇記録の保存および閲覧。",url:"archive.html",related:"第十五號・第十七號・第十八號・第十九號"}
  ]
};
