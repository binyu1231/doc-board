---
title: 增强图像对比度
---


## 灰度直方归一化

适用于：灰度级主要在0~150之间，造成图像对比度较低，可用直方图归一化将图像灰度级拉伸到0~255,使其更清晰。

``` py
cv2.normalize(src, dst, 0, 255, cv2.NORM_MINMAX, cv2.CV_8U)

# cv2.normalize(src[, dst[, alpha[, beta[, norm_type[, dtype[, mask]]]]]]) → dst
#
# src-输入数组
# dst-输出数组，支持原地运算
# alpha-range normalization模式的最小值
# beta-range normalization模式的最大值，不用于norm normalization(范数归一化)模式。
# normType-归一化的类型，可以有以下的取值：
#    NORM_MINMAX:数组的数值被平移或缩放到一个指定的范围，线性归一化，一般较常用。
#    NORM_INF: 此类型的定义没有查到，根据OpenCV 1的对应项，可能是归一化数组的C-范数(绝对值的最大值)
#    NORM_L1 :  归一化数组的L1-范数(绝对值的和)
#    NORM_L2: 归一化数组的(欧几里德)L2-范数
# dtype-dtype为负数时，输出数组的type与输入数组的type相同；否则，输出数组与输入数组只是通道数相同，而tpye=CV_MAT_DEPTH(dtype).
# mask-操作掩膜，用于指示函数是否仅仅对指定的元素进行操作。

```

``` py

```