<h2>
2022 卡塔尔世界杯赛程
<a class="text-sm underline ml-2 text-slate-500" href="/project/world-cup-2022/calendar">(日历版赛程)</a>
</h2>


<ScopeToggle v-slot="{ toggle, value }" :default-value="false">
<ColTitle @click="toggle" :expand="value">规则介绍</ColTitle>

<div v-if="value">

**小组赛**为单循环赛制, 即4支队伍只会和本小组另三位对手进行一次比赛, 所以每只队伍会进行三轮小组赛(E1 代表 E组第1轮比赛). 赢一场得3分, 平一场得1分, 输一场得0分. 同分则比较(1)净胜球, (2)胜负关系, (3)主客场进球数. 每组前两名会出线进入1/8决赛. 


A组第一与B组第二, B组第一与A组第二进行1/8决赛, 以此类推. 在世界杯**决赛阶段**常规90分钟平局将进行上下半场总计30分钟加时赛, 如果依旧平局则进入点球决胜环节. 


世界杯进行中不会再次进行抽签, 即上下半区(ABCD, EFGH)必定会有一只队伍进入世界杯决赛. 赢得决赛将会捧起大力神杯, 但4年之后你得还回来(doge). 并可以在国家队球衣上添加一颗⭐️

</div>

</ScopeToggle>

---

<ScopeToggle v-slot="{ toggle, value }">
<ColTitle @click="toggle" :expand="value">小组赛第一轮</ColTitle>

<div v-if="value">

<!-- ['59:23@内马尔,74:23@内马尔,', '23:45@里奥梅西'] -->
<!-- ['15:23@瓦伦西亚,74:23@内马尔,', '23:45@里奥梅西'] -->
<BattleCard
  :states="['qa', 'ec']" :goals="['', '16@瓦伦西亚(点球),31@瓦伦西亚']" :scores="[0, 2]" g="A1" time="2022-11-21 00:00:00" />
<BattleCard :states="['gb-eng', 'ir']" :goals="['34@贝林厄姆,43@萨卡,45@斯特林,61@萨卡,71@拉什福德,89@格拉利什', '65@塔雷米,103@塔雷米(点球)']" :scores="[6, 2]" g="B1" time="2022-11-21 21:00:00" />

---

<BattleCard :states="['sn', 'nl']" g="A1" :goals="['', '84@加克波,90@克拉森']" :scores="[0, 2]" time="2022-11-22 00:00:00" />
<BattleCard :states="['us', 'gb-wls']" :goals="['36@维阿', '82@贝尔(点球)']" :scores="[1, 1]" g="B1" time="2022-11-22 03:00:00" />
<BattleCard :states="['ar', 'sa']" :goals="['10@梅西(点球)', '48@谢赫里,53@多萨里']" :scores="[1, 2]" g="C1" time="2022-11-22 18:00:00" />
<BattleCard :states="['dk', 'tn']" g="D1" time="2022-11-22 21:00:00" />

---

<BattleCard :states="['mx', 'pl']" g="C1" time="2022-11-23 00:00:00" />
<BattleCard :states="['fr', 'au']" :goals="['26@拉比奥,31@吉鲁,67@姆巴佩,70@吉鲁', '8@古德温']" :scores="[4, 1]" g="D1" time="2022-11-23 03:00:00" />
<BattleCard :states="['ma', 'hr']" g="F1" time="2022-11-23 18:00:00" />
<BattleCard :states="['de', 'jp']" :goals="['32@京多安', '74@堂安律,82@浅野拓磨']" :scores="[1, 2]" g="E1" time="2022-11-23 21:00:00" />


---

<BattleCard :states="['es', 'cr']" :goals="['10@奥尔默,20@阿森西奥,30@托雷斯(点球),53@托雷斯,73@加维拉,89@索莱尔,91@莫拉塔', '']" :scores="[7, 0]" g="E1" time="2022-11-24 00:00:00" />
<BattleCard :states="['be', 'ca']" :goals="['43@巴舒亚伊', '']" :scores="[1, 0]" g="F1" time="2022-11-24 03:00:00" />
<BattleCard :states="['ch', 'cm']" :goals="['47@恩博洛', '']" :scores="[1, 0]" g="G1" time="2022-11-24 18:00:00" />
<BattleCard :states="['uy', 'kr']" g="H1" time="2022-11-24 21:00:00" />

---

<BattleCard :states="['pt', 'gh']" :goals="['64@罗纳尔多(点球),77@菲利克斯,79@莱昂', '72@阿尤,88@布卡里']" :scores="[3, 2]" g="H1" time="2022-11-25 00:00:00" />
<BattleCard :states="['br', 'rs']" :goals="['61@理查利森,72@理查利森', '']" :scores="[2, 0]" g="G1" time="2022-11-25 03:00:00" />

</div>

</ScopeToggle>

---

<ScopeToggle v-slot="{ toggle, value }" :default-value="false">
<ColTitle @click="toggle" :expand="value">小组赛第二轮</ColTitle>

<div v-if="value">

<BattleCard :states="['gb-wls', 'ir']" :goals="['', '97@切什米,100@雷扎伊安']" :scores="[0, 2]" g="B2" time="2022-11-25 18:00:00" />
<BattleCard :states="['qa', 'sn']" :goals="['77@蒙塔里', '40@迪亚,47@迪德希欧,83@迪昂']" :scores="[1, 3]" g="A2" time="2022-11-25 21:00:00" />

---

<BattleCard :states="['nl', 'ec']" :goals="['5@加克波', '48@瓦伦西亚']" :scores="[1, 1]" g="A2" time="2022-11-26 00:00:00" />
<BattleCard :states="['gb-eng', 'us']" g="B2" time="2022-11-26 03:00:00" />
<BattleCard :states="['tn', 'au']" g="D2" time="2022-11-26 18:00:00" />
<BattleCard :states="['pl', 'sa']" g="C2" time="2022-11-26 21:00:00" />

---

<BattleCard :states="['fr', 'dk']" g="D2" time="2022-11-27 00:00:00" />
<BattleCard :states="['ar', 'mx']" g="C2" time="2022-11-27 03:00:00" />
<BattleCard :states="['jp', 'au']" g="D2" time="2022-11-27 18:00:00" />
<BattleCard :states="['pl', 'cr']" g="E2" time="2022-11-27 21:00:00" />

---

<BattleCard :states="['hr', 'ca']" g="F2" time="2022-11-28 00:00:00" />
<BattleCard :states="['es', 'de']" g="E2" time="2022-11-28 03:00:00" />
<BattleCard :states="['jp', 'au']" g="G2" time="2022-11-28 18:00:00" />
<BattleCard :states="['cm', 'rs']" g="E2" time="2022-11-28 21:00:00" />

---

<BattleCard :states="['br', 'ch']" g="G2" time="2022-11-29 00:00:00" />
<BattleCard :states="['pt', 'uy']" g="H2" time="2022-11-29 03:00:00" />

</div>

</ScopeToggle>

---

<ScopeToggle v-slot="{ toggle, value }" :default-value="false">
<ColTitle @click="toggle" :expand="value">小组赛第三轮</ColTitle>


第三轮两场小组赛会同时开始

<div v-if="value">

<BattleCard :states="['nl', 'qa']" g="A3" time="2022-11-29 23:00:00" />
<BattleCard :states="['ec', 'sn']" g="A3" time="2022-11-29 23:00:00" />

---

<BattleCard :states="['gb-wls', 'gb-eng']" g="B3" time="2022-11-30 03:00:00" />
<BattleCard :states="['ir', 'us']" g="B3" time="2022-11-30 03:00:00" />
<BattleCard :states="['tn', 'fr']" g="D3" time="2022-11-30 23:00:00" />
<BattleCard :states="['au', 'dk']" g="D3" time="2022-11-30 23:00:00" />

---

<BattleCard :states="['pl', 'ar']" g="C3" time="2022-12-01 03:00:00" />
<BattleCard :states="['sa', 'mx']" g="C3" time="2022-12-01 03:00:00" />
<BattleCard :states="['hr', 'be']" g="F3" time="2022-12-01 23:00:00" />
<BattleCard :states="['ca', 'ma']" g="F3" time="2022-12-01 23:00:00" />

---

<BattleCard :states="['jp', 'es']" g="E3" time="2022-12-02 03:00:00" />
<BattleCard :states="['cr', 'de']" g="E3" time="2022-12-02 03:00:00" />
<BattleCard :states="['kr', 'pt']" g="H3" time="2022-12-02 23:00:00" />
<BattleCard :states="['gh', 'uy']" g="H3" time="2022-12-02 23:00:00" />

---

<BattleCard :states="['cm', 'br']" g="G3" time="2022-12-03 03:00:00" />
<BattleCard :states="['rs', 'ch']" g="G3" time="2022-12-03 03:00:00" />

</div>

</ScopeToggle>

---

<ScopeToggle v-slot="{ toggle, value }" :default-value="false">
<ColTitle @click="toggle" :expand="value">1/8 决赛</ColTitle>

<div v-if="value">

<BattleCard :states="['', '']" g="1/8" time="2022-12-03 23:00:00" />

---

<BattleCard :states="['', '']" g="1/8" time="2022-12-04 03:00:00" />
<BattleCard :states="['', '']" g="1/8" time="2022-12-04 23:00:00" />

---

<BattleCard :states="['', '']" g="1/8" time="2022-12-05 03:00:00" />
<BattleCard :states="['', '']" g="1/8" time="2022-12-05 23:00:00" />

---

<BattleCard :states="['', '']" g="1/8" time="2022-12-06 03:00:00" />
<BattleCard :states="['', '']" g="1/8" time="2022-12-06 23:00:00" />

---

<BattleCard :states="['', '']" g="1/8" time="2022-12-07 03:00:00" />

</div>

</ScopeToggle>

---

<ScopeToggle v-slot="{ toggle, value }" :default-value="false">
<ColTitle @click="toggle" :expand="value">1/4 决赛</ColTitle>

与1/8决赛相隔一天

<div v-if="value">


<BattleCard :states="['', '']" g="1/4" time="2022-12-09 23:00:00" />

---

<BattleCard :states="['', '']" g="1/4" time="2022-12-10 03:00:00" />
<BattleCard :states="['', '']" g="1/4" time="2022-12-10 23:00:00" />

---

<BattleCard :states="['', '']" g="1/4" time="2022-12-11 03:00:00" />

</div>

</ScopeToggle>

---

<ScopeToggle v-slot="{ toggle, value }" :default-value="false">
<ColTitle @click="toggle" :expand="value">半决赛</ColTitle>

与1/8决赛相隔三天

<div v-if="value">

<BattleCard :states="['', '']" g="1/2" time="2022-12-14 03:00:00" />

---

<BattleCard :states="['', '']" g="1/2" time="2022-12-15 03:00:00" />

</div>

</ScopeToggle>

---

<ScopeToggle v-slot="{ toggle, value }" :default-value="false">
<ColTitle @click="toggle">决赛</ColTitle>

<div v-if="value">

#### 季军赛 

<BattleCard :states="['', '']" g="*" time="2022-12-17 23:00:00" />

---

#### 决赛

<BattleCard :states="['', '']" g="*" time="2022-12-18 23:00:00" />

</div>

</ScopeToggle>
