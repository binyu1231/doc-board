### 读取图片

``` py
img = cv2.imread("512_512.png")

cv2.imshow("Test", img)

if cv2.waitKey(0):
  cv2.destroyAllWindows()
```

### 读取视频流

``` py
import cv2

cap = cv2.VideoCapture('video.mp4')
fps = cap.get(cv2.CAP_PROP_FPS)

print("%s", fps)

while True:
  ret, frame1 = cap.read()
  cv2.imshow("Video Original", frame1)
  if cv2.waitKey(int(1000/fps)) & 0xFF == ord('q'):
    break

cap.release()
cv2.destroyAllWindows()
```

## 图像处理