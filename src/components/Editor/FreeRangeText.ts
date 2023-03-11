import grapesjs from "grapesjs";

const freeRangeTextClassName = "freeRangeText";
const freeRangeTextTypeName = freeRangeTextClassName;

type TBlock = grapesjs.BlockOptions & {
  id: string;
};

export const freeRangeTextBlock: TBlock = {
  id: "free-range-text",
  label: "Free-Range Text",
  content: {
    tagName: "div",
    draggable: true,
    // Make the Free-Range Text component draggable everywhere
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

export function isFreeRangeText(model: any) {
  const rawClassName = model.attributes.attributes.class;
  if (!rawClassName) return;
  const className = String(rawClassName);
  return className.split(/\s/).includes(freeRangeTextTypeName);
}
