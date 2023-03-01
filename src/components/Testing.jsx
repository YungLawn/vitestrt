import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { usePreview } from 'react-dnd-preview';
import StringtoImage from "./StringtoImage"
import DragDrop from "./DragDrop";
import { nuclides } from "./Nuclides";

const MyPreview = () => {
  const preview = usePreview()
  if (!preview.display) {
    return null
  }
  const {itemType, item, style} = preview;
  return <div className="item-list__item" style={style}>{itemType}</div>
}

export default function Testing() {
  const opts = {enableMouseEvents: true}

  const elementIndex = 1;

  let Isotopes = [];
  for (let i = 1; i < nuclides.length; i++) {
    if (elementIndex === nuclides[i].y) {
      Isotopes.push(nuclides[i]);
    }
  }

  const Tiles = Array.from({ length: Isotopes.length }, (_, i) => ({
    id: Isotopes[i].id + (parseInt(Isotopes[i].x, 10) + 1),
    src: StringtoImage(
      Isotopes[i].id,
      Isotopes[i].col,
      parseInt(Isotopes[i].y, 10) + parseInt(Isotopes[i].x, 10),
      Isotopes[i].y
    ),
    x: parseInt(Isotopes[i].x, 10),
  }));

  for (let i = 0; i < 2; i++) {
    Tiles.sort(() => Math.random() - 0.5);
  }
  console.log(Tiles)

  return (
    <DndProvider options={HTML5toTouch}>
      <div className="activityWrapper">
        <DragDrop Tiles={Tiles}/>
      </div>
      <MyPreview/>
    </DndProvider>
  )
}
