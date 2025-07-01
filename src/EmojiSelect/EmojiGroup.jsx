// import { Popover } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLongHover, useLongPress } from "./hooks";
import Tooltip from "rc-tooltip";
import List from "rc-virtual-list";

export default function EmojiGroup(props) {
  const { data, cellSize, height, onSelect } = props;
  const [indexList, setIndexList] = useState([]);
  const ref = useRef();

  useEffect(() => {
    const rowCount = Math.floor(ref.current.clientWidth / cellSize);
    if (rowCount > 0) {
      const maxIndex = Math.ceil(data.length / rowCount);
      const indexList = Array(maxIndex)
        .fill(0)
        .map((v, index) => {
          return {
            id: index,
          };
        });
      setIndexList(indexList);
    }
  }, [cellSize, data]);

  useEffect(() => {
    console.timeEnd("tab-change");
    // debugger
  }, [indexList]);

  const renderChildren = ({ id: index }) => {
    const rowCount = Math.floor(ref.current.clientWidth / cellSize);
    let start = index * rowCount;
    let end = (index + 1) * rowCount;
    // const list = data.slice(start, end);
    const list = [];

    for (; start < data.length; start++) {
      if (start >= end) {
        break;
      }
      const emoji = data[start];
      list.push(
        <EmojiItem
          key={emoji.name}
          data={emoji}
          onSelect={onSelect}
        ></EmojiItem>
      );
    }
    list.push(
      ...[...Array(rowCount - list.length)].map((v) => (
        <div className="emoji_item_hidden"></div>
      ))
    );

    return <div className="emoji-rows">{list}</div>;
  };
  console.log(height);

  return (
    <div className="emoji_container" ref={ref}>
      <List
        data={indexList}
        itemHeight={cellSize}
        height={height}
        showScrollBar={false}
        itemKey="id"
      >
        {renderChildren}
      </List>
    </div>
  );
}

function EmojiItem(props) {
  const { data, onSelect } = props;
  const [open, setOpen] = useState(false);
  const [isHoverPopover, setIsHoverPopover] = useState(false);

  const longPressHandler = useLongPress();
  const longHoverHandler = useLongHover();

  const isTouchDevice = navigator.maxTouchPoints >= 1;
  function handleSelectEmoji(data, skinUnicode = []) {
    const unicode = [...data.unicode, ...skinUnicode].map((code) =>
      code.replace("U+", "0x")
    );
    const result = String.fromCodePoint(...unicode);

    console.log({
      unicode: data.unicode,
      htmlCode: data.htmlCode,
      skinUnicode,
      result,
    }); // 0x1F435

    onSelect(result);
    setOpen(false);
    setIsHoverPopover(false);
  }

  const Content = (emoji) => {
    // emoji.htmlSkin
    const { htmlCode, htmlSkin, unicodeSkin } = emoji;
    if (htmlSkin) {
      return (
        <div
          className="emoji_skin_group"
          onMouseOver={() => {
            setIsHoverPopover(true);
          }}
          onMouseLeave={() => {
            setIsHoverPopover(false);
          }}
        >
          {Object.keys(htmlSkin).map((key) => {
            const value = htmlSkin[key];
            const skinUnicode = unicodeSkin[key];
            return (
              <div
                key={key}
                className="emoji_item"
                dangerouslySetInnerHTML={{ __html: htmlCode.join("") + value }}
                onClick={() => {
                  handleSelectEmoji(emoji, [skinUnicode]);
                }}
              ></div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Tooltip
      visible={open || isHoverPopover}
      showArrow={false}
      overlay={Content(data)}
      placement={"top"}
      getTooltipContainer={(node) => node.parentElement}
      zIndex={999}
      styles={{
        root: {
          opacity: 1,
          background: "transparent",
        },
        body: {
          border: "1px solid #f1f4f7",
          borderRadius: "10px",
          padding: "4px",
        },
      }}
    >
      <div
        tabIndex={-1}
        onBlurCapture={() => {
          console.log("blur");
          setOpen(false);
          setIsHoverPopover(false);
        }}
        className={`emoji_item ${open ? "emoji_active" : ""}`}
        dangerouslySetInnerHTML={{ __html: data.htmlCode.join("") }}
        onClick={(e) => {
          handleSelectEmoji(data);
        }}
        onMouseEnter={(e) => {
          if (data.htmlSkin && !isTouchDevice) {
            longHoverHandler({
              event: e,
              duration: 500,
              callback: () => {
                setOpen(true);
              },
              cancelCallback: () => {
                setTimeout(() => {
                  setOpen(false);
                }, 100);
              },
            });
          }
        }}
        onTouchStart={(e) => {
          if (data.htmlSkin) {
            const target = e.currentTarget || e.target;
            target.focus();
            longPressHandler(e, 500, () => {
              setOpen(true);
            });
          }
        }}
      ></div>
    </Tooltip>
  );
}
