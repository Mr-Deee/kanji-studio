import { CSSProperties, useState } from "react";
import styles from "./canvas.module.css";
import { nanoid } from "nanoid/non-secure";
// dynamic import
import dynamic from "next/dynamic";

// export interface CanvasElement {
//   id: number;
//   type: string;
//   styles: CSSProperties;
//     content?: React.ReactNode;
// }

export function Canvas() {
  const [canvasElements, setCanvasElements] = useState<any[]>([]);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);

  function handleCanvasClick(e: any) {
    if (e.target !== e.currentTarget) {
      return;
    }
    setSelectedElement(null);
  }

  function addElement(type: "div" | "text" | "image" = "div") {
    // const id = nanoid();

    const newElement = {
      id: Math.floor(Math.random() * 1000),
      type: type,
      content: type === "text" ? "Text" : null,
      styles: {
        padding: 10,
        border: "1px solid black",
      },
    };
    setCanvasElements((prevElements) => [...prevElements, newElement]);
  }

  function updateStyles(elementId: number, newStyles: any) {
    setCanvasElements((prevElements) =>
      prevElements.map((element) =>
        element.id === elementId ? { ...element, styles: newStyles } : element
      )
    );
  }

  function updateContent(elementId: number, newContent: any) {
    setCanvasElements((prevElements) =>
      prevElements.map((element) =>
        element.id === elementId ? { ...element, content: newContent } : element
      )
    );
  }

  function handleElementClick(elementId: number) {
    setSelectedElement(elementId);
  }

  function renderElementContent(element: any) {
    switch (element.type) {
      case "text":
        return <p style={element.styles}>{element.content} text here</p>;
      case "image":
        return <img src={element.src} alt={element.alt} />;
      default:
        return <div className="placeholder-element">Element</div>;
    }
  }

  return (
    <div className={styles.canvas} onClick={handleCanvasClick}>
      <Navigator
        elements={canvasElements}
        selectedElement={selectedElement}
        setSelectedElement={(id) => setSelectedElement(id)}
      />
      <div
        className="canvas__elements"
        style={{ padding: 20, border: "1px solid black" }}
      >
        {canvasElements.map((element) => (
          <div
            key={element.id}
            className="canvas__element"
            onClick={() => handleElementClick(element.id)}
            style={{
              ...element.styles,
              border:
                selectedElement === element.id
                  ? "2px solid red"
                  : "1px solid black",
            }}
          >
            {renderElementContent(element)}
          </div>
        ))}
        <h4>{JSON.stringify(canvasElements)}</h4>
        <button onClick={() => addElement("div")} style={{ color: "black" }}>
          Add Div
        </button>
        <button onClick={() => addElement("text")} style={{ color: "black" }}>
          Add Text
        </button>
      </div>
      <div className={styles.inspector}>
        <Inspector
          selectedElement={selectedElement}
          elements={canvasElements}
          updateStyles={updateStyles}
          updateContent={updateContent}
        />
      </div>
    </div>
  );
}

function Navigator({
  elements,
  selectedElement,
  setSelectedElement,
}: {
  elements: any[];
  selectedElement: number | null;
  setSelectedElement: (id: number) => void;
}) {
  return (
    <div
      className={styles.navigator}
      style={{ width: "20vw", border: "1px solid green", padding: 10 }}
    >
      <div className="navigator__elements">
        <h3>Navigator</h3>
        {elements.map((element) => (
          <div
            key={element.id}
            className="navigator__element"
            onClick={() => setSelectedElement(element.id)}
            style={{
              border:
                selectedElement === element.id
                  ? "1px solid red"
                  : "1px solid black",
            }}
          >
            {element.type}
          </div>
        ))}
      </div>
    </div>
  );
}

function Inspector({
  selectedElement,
  elements,
  updateStyles,
  updateContent,
}: {
  selectedElement: number | null;
  elements: any[];
  updateStyles: (elementId: number, newStyles: any) => void;
  updateContent: (elementId: number, newContent: any) => void;
}) {
  function handleStylesChange(e: any, px = false) {
    const { name, value } = e.target;
    if (!selectedElement) {
      return;
    }
    updateStyles(selectedElement, {
      ...elements.find((e) => e.id === selectedElement).styles,
      [name]: px ? `${value}px` : value,
    });
  }

  function handleContentChange(e: any) {
    const { value } = e.target;
    if (!selectedElement) {
      return;
    }
    updateContent(selectedElement, value);
  }

  function renderStyles() {
    if (!selectedElement) {
      return null;
    }
    switch (elements.find((e) => e.id === selectedElement).type) {
      case "text":
        return (
          <div>
            <label htmlFor="content">Content</label>
            <input
              type="text"
              name="content"
              id="content"
              onChange={handleContentChange}
              value={elements.find((e) => e.id === selectedElement).content}
            />

            <label htmlFor="color">Color</label>
            <input
              type="color"
              name="color"
              id="color"
              onChange={handleStylesChange}
              value={
                elements.find((e) => e.id === selectedElement).styles.color
              }
            />

            <label htmlFor="fontSize">Font Size</label>
            <input
              type="number"
              name="fontSize"
              id="fontSize"
              onChange={(e) => handleStylesChange(e, true)}
              value={elements
                .find((e) => e.id === selectedElement)
                .styles.fontSize?.replace("px", "")}
            />
          </div>
        );
      case "image":
        return (
          <div>
            <label htmlFor="src">Source</label>
            <input
              type="text"
              name="src"
              id="src"
              onChange={handleStylesChange}
              value={elements.find((e) => e.id === selectedElement).src}
            />
          </div>
        );
      case "div":
        return (
          <div>
            <label htmlFor="backgroundColor">Background Color</label>
            <input
              type="color"
              name="backgroundColor"
              id="backgroundColor"
              onChange={handleStylesChange}
              value={
                elements.find((e) => e.id === selectedElement).styles
                  .backgroundColor
              }
            />
          </div>
        );
      default:
        return null;
    }
  }
  return (
    <div className={styles.inspector}>
      <h3>Inspector</h3>
      <h2>{JSON.stringify(elements.find((e) => e.id === selectedElement))}</h2>
      <h2>{selectedElement}</h2>
      {renderStyles()}
    </div>
  );
}
