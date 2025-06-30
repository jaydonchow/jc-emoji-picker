# jc-emoji-picker

这是一个使用 react 开发的一款 emoji 选择器，兼容移动端和 pc 端。

demo: https://jaydonchow.github.io/jc-emoji-picker/

安装：
`npm i jc-emoji-picker`

使用:

```js
import EmojiSelect from "jc-emoji-picker";

export default () => {
  const [value, setValue] = useState();
  const displayName = [
    "人物",
    "动物与自然",
    "食物",
    "旅行",
    "活动",
    "工具",
    "标志",
    "旗帜",
  ];

  return (
    <EmojiSelect
      value={value}
      onSelect={(emoji) => {
        setValue(value + emoji);
      }}
      categoryNames={displayName}
      layout={{ highlight: "#5b5fc766", width: "300px", height: "220px" }}
    ></EmojiSelect>
  );
};
```

```js
type props {
  layout: {
    width: string | number; // 组件emoji区域width，default: 400
    height: string | number; // 组件emoji区域height，default：200
    gap: number; // 分类bar item 之间的间距，default：10
    cellSize: number; // 每个表情占用的cell size， default： 40
    highlight: string; // 高亮背景色，default：#ddd
  };
  categoryNames: Array<string>; // 自定义配置分类名字，default：["人物", "动物与自然", "食物", "旅行", "活动", "工具", "标志", "旗帜"];
  onSelect: (value) => void; // 选择emoji的回调
}
```
