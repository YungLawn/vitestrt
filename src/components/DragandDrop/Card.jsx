import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export const Card = ({ lbl, num, mass, col, id, index, moveCard }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: "Tile",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "Tile",
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))
  return (
    <div className={isDragging ? 'Tile dragging' : 'Tile'} style={{backgroundColor: col}} ref={ref} data-handler-id={handlerId}>
      <div className='mass'> {mass} </div>
      <div className='lbl'> {lbl} </div>
      <div className='num'> {num} </div>
    </div>
  )
}
