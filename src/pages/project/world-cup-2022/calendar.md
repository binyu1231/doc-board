---
title: 赛程日历
---

## 日历版赛程

小组赛比赛时间固定为每天的 `00:00`, `03:00`, `18:00`, `21:00`. 比如11月21日揭幕战: 卡塔尔VS厄瓜多尔在第一行则表示21日`00:00`进行比赛. 英格兰VS伊朗在第四行则表示21日`21:00`进行比赛.

淘汰赛比赛时间为 `03:00`,`23:00`

<BattleCalendar 
  first-date-string="2022-11-21 00:00:00" 
  :race-config="[
    'qa0:ec2,,,gb-eng6:ir2@Nov. 第1轮',
    'sn0:nl2,us1:gb-wls1,ar1:sa2,dk0:tn0',
    'mx0:pl0,fr4:au1,ma0:hr0,de1:jp2',
    'es7:cr0,be1:ca0,ch1:cm0,uy0:kr0',
    'pt3:gh2,br2:rs0,gb-wls0:ir2,qa1:sn3@第2轮', // 第二轮
    'nl1:ec1,gb-eng0:us0,tn0:au1,pl2:sa0',
    'fr2:dk1,ar2:mx0,jp0:cr1,be0:ma2',
    // ---
    'hr4:ca1,es1:de1,cm3:rs3,kr2:gh3',
    'br1:ch0,pt2:uy0,nl2:qa0,ec1:sn2@第3轮', // 第三轮
    'gb-wls0:gb-eng3,ir0:us1,tn0:fr1,au1:dk0',
    'pl0:ar2,sa1:mx2,hr0:be0,ca1:ma2@Dec.',
    'jp2:es1,cr2:de4,kr2:pt1,gh0:uy2',
    'cm1:br0,rs2:ch3,,nl3:us1@1/8决赛', // 1/8
    ',ar2:au1,,fr3:pl1',
    // ---
    ',gb-eng3:sn0,,jp1:hr1',
    ',br4:kr1,,ma0:es0',
    ',pt6:ch1,,',
    '',
    ',,,hr1:br1@1/4决赛', // 1/4
    ',nl2:ar2,,ma1:pt0',
    ',gb-eng1:fr2,,',
    // ---
    '',
    '',
    ',ar3:hr0,,@半决赛', // 1/2
    ',fr2:ma0,,',
    '',
    ',,,hr2:ma1@季军赛', // 季军赛
    ',,,ar3:fr3@决赛', // 决赛
    // ---
  ]"
/>