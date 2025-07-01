import "./App.css";
import EmojiSelect from "./lib/jc-emoji-picker";
// import EmojiSelect from 'jc-emoji-picker';

import { useState } from "react";

function Input({ label, value, type, onChange }) {
  return (
    <div style={{ marginRight: 20 }}>
      {label}:
      <input
        style={{ width: 100 }}
        type={type || "input"}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

const Demo = () => {
  const [input, setInput] = useState("😀");
  const [width, setWidth] = useState(380);
  const [gap, setGap] = useState(10);
  const [height, setHeight] = useState(200);
  const [cellSize, setcellsize] = useState(40);
  const [highlight, setHighlight] = useState("#5b5fc766");
  const [categoryNames, setCategoryNames] = useState([
    "人物",
    "动物与自然",
    "食物",
    "旅行",
    "活动",
    "工具",
    "标志",
    "旗帜",
  ]);

  const [prop, setProp] = useState({
    categoryNames,
    layout: {
      width,
      height,
      gap,
      cellSize,
      highlight,
    },
  });

  const controller = <div
    style={{
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 20,
      fontSize: "20px",
      margin: "auto",
      marginTop: 20,
    }}
  >
    <Input value={width} label={"width"} onChange={(value) => setWidth(value)}></Input>
    <Input value={height} label={"height"} onChange={(value) => setHeight(value)}></Input>
    <Input value={gap} label={"gap"} onChange={(value) => setGap(value)}></Input>
    <Input value={cellSize} label={"cell size"} onChange={(value) => setcellsize(value)}></Input>
    <Input value={highlight} label={"high light"} onChange={(value) => setHighlight(value)}></Input>
    <div>
      category names:
      <textarea

        rows="4"
        cols="30"
        value={JSON.stringify(categoryNames)}
        onChange={(e) => {
          setCategoryNames(JSON.parse(e.target.value));
        }}
      ></textarea>
    </div>
  </div>

  return (
    <div>
      <h2 className="shining-gradient-text">JC-EMOJI-PICKER</h2>
      <h3>A react component for selecting emoji emoticons</h3>
      <div style={{ display: 'flex', gap: 40, borderRadius: 10, background: '#1f2227', padding: '20px', justifyContent: 'space-evenly' }}>
        <div>
          {controller}
          <div style={{ textAlign: "center" }}>
            <button
              style={{ height: 40 }}
              onClick={() => {
                setProp({
                  categoryNames,
                  layout: {
                    width,
                    height,
                    gap,
                    cellSize,
                    highlight,
                  },
                });
              }}
            >
              click to change
            </button>
          </div>
        </div>
        <div>
          <div>your choose:</div>
          <div style={{ fontSize: 40, textAlign: "center", margin: 20 }}>
            <input
              style={{ fontSize: 40, width: 350 }}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            ></input>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <EmojiSelect
              value={input}
              onSelect={(emoji) => {
                setInput(input + emoji);
              }}
              {...prop}
            ></EmojiSelect>
          </div>
        </div>
      </div>
      <div style={{ fontSize: 12, marginTop: 20 }}>
        <a target="_blank" href="https://www.npmjs.com/package/jc-emoji-picker?activeTab=readme">npm registy</a>
        <br></br>
        <a target="_blank" href="https://github.com/jaydonchow/jc-emoji-picker.git">github</a>
      </div>
    </div>
  );
};


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Demo></Demo>
      </header>
    </div>
  );
}

export default App;
