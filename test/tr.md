请翻译以下文章为中文。要求保留原文排版，语句通顺，不修改内容。

# 9Patch Images

Docs exist for the mysterious 9patch images [here](https://developer.android.com/guide/topics/graphics/2d-graphics.html#nine-patch) and [there](https://developer.android.com/tools/help/draw9patch.html). These docs though are meant for developers and lack information for those who work with already compiled 3rd party applications. There you can find information how to create them, but no information about how they actually work.

The official docs miss one point that 9patch images come in two forms: source & compiled.

- **source** - You know this one. You find it in the source of an application or freely available online. These are images with a black border around them.
- **compiled** - The mysterious form found in apk files. There are no borders and the 9patch data is written into a binary chunk called `npTc`. You can't see or modify it easily, but Android OS can as its quicker to read.

There are problems related to the above two points.

- You can't move 9patch images between both types without a conversion. If you try and unpack 9patch images from an apk and use it in the source of another, you will get errors during build. Also vice versa, you cannot take source 9patch images directly into an apk.
- 9patch binary chunk isn't recognized by modern image processing tools. So modifying the compiled image will more than likely break the `npTc` chunk, thus breaking the image on the device.

The only solution to this problem is to easily convert between these two types. The encoder (which takes source to compiled) is built into the aapt tool and is automatically used during build. This means we only need to build a decoder which has been in apktool since `v1.3.0` and is automatically ran on all 9patch images during decode.

So if you want to modify 9patch images, don't do it directly. Use apktool to decode the application (including the 9patch images) and then modify the images. At that point when you build the application back, the source 9patch images will be compiled.