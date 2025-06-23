# jc-emoji-picker

这是一个使用 react 开发的一款 emoji 选择器，兼容移动端和 pc 端。

demo: https://jaydonchow.github.io/jc-emoji-picker/

```js
type props {
  layout: {
    width: string | number; // 组件emoji区域width，default: 400
    height: string | number; // 组件emoji区域height，default：200
    gap: number; // 分类bar item 之间的间距，default：10
    cellSize: number; // 每个表情占用的cell size， default： 40
    highlight: string; // 高亮背景色，default：#ddd
  };
  categoryNames: Array<string>; // 自定义配置分类名字，default：
  onSelect: (value) => void; // 选择emoji的回调
}
```
