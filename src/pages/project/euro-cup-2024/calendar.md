---
title: 赛程日历
---

## 日历版赛程

比赛时间固定为每天的 `14:00`, `17:00`, `20:00`. 比如06月14日揭幕战: 德国VS苏格兰在第三行则表示14日`20:00`进行比赛.


<BattleCalendar 
  first-date-string="2024-06-10 00:00:00" 
  :race-config="[
    '@六月',
    '',
    '',
    '',
    ',,de0:gb-sct0,@第1轮',
    'hu0:ch0,es0:hr0,it0:al0,',
    'pl0:nl0,si0:dk0,rs0:gb-eng0,',
    'ro0:ua0,be0:sk0,at0:fr0,',
    ',tr0:ge0,pt0:cz0,',
    // ---
    'hr0:al0,de0:hu0,gb-sct0:ch0,@第2轮',
    'si0:rs0,dk0:gb-eng0:,es0:it0,',
    'sk0:ua0,pl0:at0:,nl0:fr0,',
    'ge0:cz0,tr0:pt0:,be0:ro0,',
    // ---
    ',ch0:de0,gb-sct0:hu0,,@第3轮12:00',
    ',al0:es0,hr0:it0,,',
    'fr0:pl0,nl0:at0,dk0:rs0,gb-eng0:si0@9:00/12:00',
    'sk0:ro0,ua0:be0,ge0:pt0,cz0:tr0',
    '',
    '',
    ',tbd,tbd,@16强赛 9/12',
    ',tbd,tbd,',
    ',tbd,tbd,@七月',
    ',tbd,tbd,@',
    '',
    '',
    ',tbd,tbd,@8强赛 9/12',
    ',tbd,tbd,',
    '',
    '',
    ',,tbd,@半决赛 12:00',
    ',,tbd,',
    '',
    '',
    '',
    ',,tbd,@决赛 12:00',
  ]"
/>