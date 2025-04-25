# Markdown 测试

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

- ~下标~
- ^上标^
- ==高光==
- **加粗**
- *斜体*
- `inline code`

```python
# python code!!!
print("Hello Markdown!")
```

<!-- 分割线示例 -->

---

## 扩展元素测试

### 链接与图片
[普通链接](https://example.com)  
![来自 squidfunk.github.io/mkdocs-material 的背景图](https://squidfunk.github.io/mkdocs-material/assets/images/layers/1-landscape.avif)  
[参考式链接][1]

### 表格
| 左对齐     | 居中对齐 | 右对齐 |
| :--------- | :------: | -----: |
| Cell1      |  Cell2   |  Cell3 |
| 合并列示例 |          | ¥99.00 |

### 引用块
> 一级引用文本
> > 嵌套引用文本
>
> - 引用中的列表项
> - 引用中的列表项1

### 任务列表
- [x] 已完成任务
- [ ] 未完成任务
- [ ] 高级任务 (需@成员)

### 特殊符号
转义字符示例：\*星号不会被解析\*  
数学公式：$E=mc^2$ (需开启TeX支持)

### 脚注

这是一个带脚注的句子[^1]

这是第二个带脚注的句子[^2]

[^1]: https://example.com/reference-link	"这里是脚注内容"
[^2]: https://example.com/reference-link?2	"这里是第二个脚注内容"

<!-- HTML原生元素 -->
<script>console.log(Math.pow(2, 10))</script>