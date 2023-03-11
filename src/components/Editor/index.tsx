import "grapesjs/dist/css/grapes.min.css";
import GjsWebpagePlugin from "grapesjs-preset-webpage";
import grapesjs from "grapesjs";
import { useEffect, useRef } from "react";

const freeRangeTextClassName = "freeRangeText";

export default function Editor() {
  const editorRef = useRef(null);

  useEffect(() => {
    const canvasContainer = editorRef.current;
    if (canvasContainer === null) return;
    const editor = renderEditor(canvasContainer, {
      width: "auto",
      height: "700px",
    });

    editor.onReady(() => {
      editor.on("component:selected", (model) => {
        const rawClassName = model.attributes.attributes.class;
        if (!rawClassName) return;
        const className = String(rawClassName);
        if (className.split(/\s/).includes(freeRangeTextClassName)) {
          editor.DomComponents.addComponent(
            {
              type: "text",
              content: "Ngoc",
            },
            {}
          );
        }
      });
    });

    // Clean the editor component
    // return function cleanup() {
    //   const editors = (grapesjs as any).editors;
    //   editors.filter(
    //     (e: grapesjs.Editor) =>
    //       (e.Config as grapesjs.EditorConfig).container !==
    //       (editor.Config as grapesjs.EditorConfig).container
    //   );
    //   editor.destroy();
    // };
  }, []);

  return (
    <main>
      <div id="gjs" ref={editorRef}></div>
    </main>
  );
}

const freeRangeTextBlock: grapesjs.BlockOptions & { id: string } = {
  id: "free-range-text",
  label: "Free-Range Text",
  content: {
    tagName: "div",
    draggable: true,
    dmode: "absolute",
    attributes: { class: freeRangeTextClassName },
    styles: `
        .freeRangeText {
            display: inline-block;
            padding: 1rem 2rem;
            border: 1px solid #444;
        }
    `,
    components: [
      {
        tagName: "span",
        content: "hello, my message is: ",
        draggable: false,
      },
      {
        tagName: "span",
        components: "text box",
        type: "text",
        draggable: false,
      },
    ],
  },
};

function renderEditor(
  canvasContainer: HTMLElement,
  options: {
    width: string;
    height: string;
  }
) {
  return grapesjs.init({
    container: canvasContainer,
    // Size of the editor
    height: options.height,
    width: options.width,
    storageManager: false,
    // Avoid any default panel
    panels: { defaults: [] },
    plugins: [GjsWebpagePlugin],
    pluginsOpts: {
      [GjsWebpagePlugin as any]: {
        blocks: [],
      },
    },
    blockManager: {
      blocks: [freeRangeTextBlock],
    },
  });
}
