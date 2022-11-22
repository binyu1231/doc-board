``` py
from PIL import Image

im = Image.open('./test-image.jpg')

# width, height = im.size
size = (600, 400)
nearestIm = im.resize(size)
nearestIm.save('test-image.pillow.nearest.jpg')

samples = [Image.NEAREST, Image.BILINEAR, Image.BICUBIC, Image.LANCZOS, Image.BOX, Image.HAMMING]
for sample in samples:
  im = Image.open('./test-image.jpg')
  newIm = im.resize(size, resample=sample)
  newIm.save('test-image.pillow.' + str(sample) + '.jpg')


print(im.size)

# im.thumbnail(600, 400)

```