
## 特征可视化

过滤器是权重值网络

卷积层的第一层可能容易观察过滤器的权重和图像来推理，网络学习的经验。但通过更复杂的层级之后，尤其是叠加了池化层和激活函数后，图像已经失去了可以推理的含义。

Lesson 8 Concept 24: Notebook: Feature Viz for FashionMNIST


### 最后一层特征可视化

#### Nearest neighbors in feature space 特征空间中的最近邻

我们通常将它们与 MSE 或 L1 距离等度量进行比较。这些图像可能具有也可能不具有相似的像素，而最近邻像素图像则具有相似的像素；相反，它们具有非常相似的内容，这些内容是特征向量提取出来的。


#### Dimensionality reduction 降维

假设我们有一个 CNN，它生成 256 维向量（包含 256 个值的列表）。在这种情况下，我们的任务是将这个 256 维向量减少为 2 维，然后可以在 x-y 轴上绘制。已经开发了一些用于压缩此类数据的技术。

##### PCA Principal Component Analysis

一种是 PCA（主成分分析），它采用高维向量并将其压缩为二维。它通过查看特征空间并创建两个变量（x，y）来实现这一点，这两个变量是这些特征的函数；这两个变量希望尽可能不同，这意味着生成的 x 和 y 最终将原始特征数据分布分开尽可能大的余量。

##### t-SNE

，它代表 t 分布随机邻居嵌入。这是一种非线性降维，旨在以将相似数据紧密聚集在一起并分离不同数据的方式分离数据。

下图是手写数字经过 t-SNE 方法得到的可视化效果。每个簇对应数据集中的每种类型的数字！

![](./i/t-sne-mnist.png)


### 其他特征可视化技术

#### Occlusion Experiments  闭塞实验

遮挡是指遮挡或遮盖图像或对象的一部分。例如，如果你正在看一个人，但他的脸在一本书后面；此人的脸被隐藏（遮挡）。通过遮挡图像的选择性部分并查看网络如何响应，可以在特征可视化中使用遮挡。


遮挡实验的过程如下：

- 在将图像的一部分输入经过训练的 CNN 之前，先对其进行屏蔽
- 为每个蒙版图像绘制班级分数热图
- 将遮罩区域滑动到不同位置并重复步骤 1 和 2。


结果应该是一个热图，将图像的预测类别显示为图像的哪一部分被遮挡的函数。原因是，如果部分遮挡图像的类别分数与真实类别不同，则遮挡区域可能非常重要！


#### Saliency Maps  显着图

显着图旨在通过计算类别分数相对于图像像素的梯度来显示这些重要的图片。梯度是变化的度量，因此，类别分数相对于图像像素的梯度是当像素稍微变化时图像的类别分数变化多少的度量。

#### Guided Backpropagation  引导反向传播



与构建显着性图的过程类似，您可以计算网络中中层神经元相对于输入像素的梯度。引导反向传播查看输入图像中的每个像素，并询问：如果我们稍微改变它的像素值，网络中特定神经元或层的输出将如何变化。如果预期输出变化很大，那么经历变化的像素对于该特定层很重要。

这与测量输入和输出之间的误差并将其通过网络传播回来的反向传播步骤非常相似。引导反向传播准确地告诉我们我们所观察到的图像块的哪些部分激活了特定的神经元/层。


> 可能是最符合直觉的方法