import { DragEvent } from "react";

interface BoxProps {
  id: number;
  position: { x: number; y: number };
  onDragEnd: (e: DragEvent, id: number) => void;
  onPlusClick: (parentId: number) => void;
}
const Box = ({ id, position, onDragEnd, onPlusClick }: BoxProps) => {

  const handleDragEnd = (e: DragEvent) => {
    const target = e.target as HTMLDivElement;
    target.style.cursor = 'move';
    target.style.opacity = '1';
    onDragEnd(e, id);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    onDragEnd(e, id);
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.style.cursor = 'move';
    target.style.opacity = '0';
    onDragEnd(e, id);
  }

  return (
    <div
      className="box rounded bg-blue-500 p-2 flex flex-col justify-between items-center"
      id={"box-" + id}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      draggable
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      {id}
      <button className="bg-white rounded font-bold px-2 text-blue-500 w-full" onClick={() => onPlusClick(id)}>+</button>
    </div>
  );
};

export default Box;
