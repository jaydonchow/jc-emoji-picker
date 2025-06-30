import React, { useEffect, useState } from "react";
import { useMouseScroll } from "./hooks";

export default function EmojiCategory(props) {
  const { gap, category, value, categoryNames, onChange } = props;

  const [width, setWidth] = useState(0);
  const [slideStyle, setSlideStyle] = useState({});
  const [nameMap, setNameMap] = useState({});
  useMouseScroll({
    selector: `.emoji_category_swiper`,
    direction: "all",
  });

  useEffect(() => {
    let _width = 0;
    const _gap = parseInt(gap);
    const container = document.querySelector(`.emoji_category_container`);
    if (container) {
      [...container.children].forEach((child) => {
        _width += child.clientWidth;
      });
      _width = _width + (_gap * container.children.length - 1);
      setWidth(_width);
    }
  }, [nameMap, gap]);

  useEffect(() => {
    const nameMaps = category.reduce((pre, cur, index) => {
      return Object.assign(pre, { [cur]: categoryNames[index] || category });
    }, {});
    setNameMap(nameMaps);
  }, [category, categoryNames]);

  useEffect(() => {
    let s = {};
    if (value) {
      const index = category.findIndex((opt) => opt === value);
      const container = document.querySelector(".emoji_category_container");
      if (container) {
        const checkedEle = container.children[index];
        s = {
          width: checkedEle.clientWidth,
          height: checkedEle.clientHeight,
          // left: checkedEle.offsetLeft,
          transform: `translateX(${checkedEle.offsetLeft}px)`,
        };
      }
    }
    setSlideStyle(s);
  }, [value, nameMap]);

  return (
    <div className="emoji_category_swiper">
      <div className="emoji_category_container" style={{ width }}>
        {category.map((cate) => {
          return (
            <div
              key={cate}
              className={`emoji_category_item ${value === cate ? "category_item_active" : ""}`}
              onClick={() => {
                console.time("tab-change");
                onChange(cate);
              }}
            >
              {nameMap[cate]}
            </div>
          );
        })}
      </div>
      <div className="emoji_sliding_block" style={slideStyle}></div>
    </div>
  );
}
