colab.research.google.com
连线
确认有GPU执行 - 变更执行阶段

https://pastebin.com/XrzCeATA

``` bash
!pip install --upgrade fastapi==0.90.0
!git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
!git clone https://github.com/yfszzx/stable-diffusion-webui-images-browser /content/stable-diffusion-webui/extensions/stable-diffusion-webui-images-browser
!curl -Lo chilloutmixni.safetensors https://huggingface.co/nolanaatama/chomni/resolve/main/chomni.safetensors
!curl -Lo ulzzang-6500.pt https://huggingface.co/nolanaatama/chomni/resolve/main/ulzzang-6500.pt
!curl -Lo koreanDollLikeness_v10.safetensors https://huggingface.co/duthanhduoc/chilloutmix-set/resolve/main/koreanDollLikeness_v10.safetensors
!curl -Lo japaneseDollLikeness_v10.safetensors https://huggingface.co/aimainia/japaneseDollLikeness_v10/blob/main/japaneseDollLikeness_v10.safetensors
!mkdir /content/stable-diffusion-webui/models/Lora
!mv "/content/koreanDollLikeness_v10.safetensors" "/content/stable-diffusion-webui/models/Lora"
!mv "/content/japaneseDollLikeness_v10.safetensors" "/content/stable-diffusion-webui/models/Lora"
!mv "/content/chilloutmixni.safetensors" "/content/stable-diffusion-webui/models/Stable-diffusion"
!mv "/content/ulzzang-6500.pt" "/content/stable-diffusion-webui/embeddings"
%cd /content/stable-diffusion-webui
!git checkout 91c8d0d
!COMMANDLINE_ARGS="--share --disable-safe-unpickle --no-half-vae --xformers --reinstall-xformers --enable-insecure-extension-access" REQS_FILE="requirements.txt" python launch.py
```

安装完后查找输出流中的网址 running on public URL: 