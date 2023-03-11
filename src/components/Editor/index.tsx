import "grapesjs/dist/css/grapes.min.css";
import GjsWebpagePlugin from "grapesjs-preset-webpage";
import grapesjs from "grapesjs";
import { useEffect, useRef } from "react";
import { freeRangeTextBlock, isFreeRangeText } from "./FreeRangeText";

export default function Editor() {
  const editorRef = useRef(null);

  useEffect(() => {
    const canvasContainer = editorRef.current;
    if (canvasContainer === null) return;
    const editor = renderEditor(canvasContainer, {
      width: "auto",
      height: "100vh",
    });

    editor.onReady(() => {
      // Add new text component with the content "Ngoc" when the Free-Range Text component is seletect
      editor.on("component:selected", (model) => {
        if (isFreeRangeText(model)) {
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
    return function cleanup() {
      const editors = (grapesjs as any).editors;
      editors.filter(
        (e: grapesjs.Editor) =>
          (e.Config as grapesjs.EditorConfig).container !==
          (editor.Config as grapesjs.EditorConfig).container
      );

      /**
       * Though this destroy method might work in production, it causes unexpected type error in development.
       * Since React 18 will trigger useEffect twice in development, grapesjs somehow does not like it and will throw the type error because the previous editor instance is destroyed.
       */
      // editor.destroy();
    };
  }, []);

  return (
    <main>
      <div id="gjs" ref={editorRef}></div>
    </main>
  );
}

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
