
卷积神经网络(CNN Convolutional Neural Networks) 是深度神经网络的一种

卷积神经网络分层 

- 卷积层 Convolutional layers
- 池化层 pooling layers
  - 最大池化层 maxpooling
- 全连接层 fully-connected layers
  - 全连接（线性）层 linear
- ... others

### Convolutional Layer  卷积层

该网络中直接处理输入图像的第一层是卷积层。

- 卷积层将图像作为输入
- 卷积层由一组卷积滤波器组成
- 每个过滤器提取特定类型的特征 e.g. 高通滤波器通常用于检测对象的边缘。

给定卷积层的输出是一组特征图feature maps（也称为激活图activation maps），它们是原始输入图像的过滤版本。

### Pooling Layer 池化层 

- 池化层接收图像（通常是经过过滤的图像）并输出该图像的缩小版本
- 池化层降低了输入的维度
- 最大池层查看输入图像中的区域（如下图所示的 4x4 像素区域），并选择将该区域中的最大像素值保留在新的缩小尺寸区域中。

``` 
single depth slice

  |1|1|2|4|                                 
  |5|6|7|8|   max pool with 2x2 filters  |6|8|
  |3|2|1|0|   and stride 2  --->         |3|4|
  |1|2|3|4|
```

### Activation Function  激活函数

您可能还注意到，该图显示为“卷积 + ReLu”，ReLu 代表修正线性单元 (ReLU) 激活函数。当输入 x <= 0 时，该激活函数为零；当 x > 0 时，该激活函数与斜率 = 1 成线性。ReLu 和其他激活函数通常放置在卷积层之后，以稍微变换输出，以便更有效地执行反向传播并有效地训练网络。

``` py
import torch.nn as nn
import torch.nn.functional as F

class Net(nn.Module):


  def __init__ (self, n_classes):
  
    super(Net, self).__init__()

    # 1 input image channel(grayscale), 32 out channels/feature maps
    # 5x5 square convolution kernel
    self.conv1 = nn.Conv2d(1, 32, 5)

    # maxpool layer
    # pool with kernel_size = 2, stride = 2
    self.pool = nn.MaxPool2d(2, 2)

    # fully-connected layer
    # 32*4 input size to account for the downsamples image size after pooling num_classes outputs (for n_classes of image data)
    self.fc1 = nn.linear(32 * 4， n_classes)

  # define the feedforward behavior
  def forward(self, x):
    
    # one conv/relu + pool layers
    x = self.pool(F.relu(self.conv1(x)))

    # prep for linear layer by flattening the feature maps into feature vectors
    x = view(x.size(0), -1)
    # linear layer
    x = F.relu(self.fc1(x))

    # final output
    return x
```

Part01 Lesson8 C9 