# vue2-mini-core

## 手写vue2数据双向绑定模型，分析视图更新原理

vue2的基本原理相信大家都耳熟能详了。

虽然vue3早已发布，成为默认版本。但通过手写一个vue2原理还是能够提升自己的编码能力。

花了一点时间进行手写。

**参考文章: [这一次，彻底搞懂vue双向绑定原理](https://juejin.cn/post/7065967379095748638)**
 
## 调试

1. clone项目 && 安装依赖
 
```shell

git clone https://github.com/GiveMe-A-Name/vue2-mini-core.git

cd vue2-mini-core && pnpm i

```

2. 调试项目

```shell
pnpm start
```
浏览器打开 http://localhost:3000/， 进行调试 