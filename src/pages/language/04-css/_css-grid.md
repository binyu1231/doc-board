
``` css
// 坐标定义
.corrdinates-grid {
    display: grid;

    grid-template-columns: auto 1fr;
    grid-template-rows: 
        auto
        1fr
        auto;
}

.grid-item-01 {
    // 用坐标定位栅格项目的位置， 从1开始
    grid-column: 1;
    grid-row: 1;
}

// 具名定义
#named-grid {
    display: grid;
    // 每一个字符串代表一行，每个字符串中的单词数量必须相同。每个单词代表一个区域
    grid-template-areas: 
        "title stats"
        "score stats"
        "board board"
        "ctrls ctrls";

    // 还需要使用 `grid-template-columns` `grid-template-columns` 定义栅格区域的尺寸
    grid-template-columns: auto 1fr;
    grid-template-rows:
        auto
        auto
        1fr
        auto;
}

#named-grid-title { grid-area: title }


```



