import React, { DragEvent, useEffect, useState } from 'react';
import Box from './Box';
import './index.css';
import { getPathData } from './helper';

interface ConnectorProps {
  startCoords: { x: number, y: number } | undefined
  endCoords: { x: number, y: number } | undefined
  id: number
  parentId: number
}
const Connector = ({ startCoords, endCoords, id, parentId }: ConnectorProps) => {
  const [pathData, setPathData] = useState('')
  useEffect(() => {
    const element = document.getElementById('box-' + id)?.getBoundingClientRect();
    const parentElement = document.getElementById('box-' + parentId)?.getBoundingClientRect();
    const paths = getPathData({ from: { rect: element }, to: { rect: parentElement } }) || []
    const pathData = `M ${paths.map(p => `${p.x} ${p.y}`).join(' ')}`;
    setPathData(pathData)
  }, [startCoords, endCoords, id, parentId])
  return (
    <svg className='line'>
      <path id={"path-" + id + parentId} d={pathData} fill="none" stroke="#000000" strokeWidth="2" strokeDasharray="4" strokeLinejoin="round"></path>
    </svg>
  );
};

interface InitialDataProps {
  id: number
  position: { x: number, y: number }
  parentId: number | null
}
const App = () => {
  const [boxes, setBoxes] = useState<InitialDataProps[]>([
    { id: 1, position: { x: Math.random() * 300, y: Math.random() * 300 }, parentId: null },
  ]);

  const handleDragEnd = (e: DragEvent, id: number) => {
    const { clientX, clientY } = e;
    const newBoxes = boxes.map((box) => {
      if (box.id == id) {
        return { ...box, position: { x: clientX, y: clientY } };
      }
      return box;
    });
    setBoxes(newBoxes);
  };

  const handlePlusClick = (parentId: number) => {
    const newBoxId = boxes.length + 1;
    const newBoxes = [
      ...boxes,
      { id: newBoxId, position: { x: Math.random() * 500, y: Math.random() * 500 }, parentId },
    ];
    setBoxes(newBoxes);
  };

  return (
    <div className="App">
      {boxes.map((box) => (
        <React.Fragment key={box.id}>
          <Box
            id={box.id}
            position={box.position}
            onDragEnd={handleDragEnd}
            onPlusClick={handlePlusClick}
          />
          {box.parentId && (
            <Connector id={box.id} parentId={box.parentId} startCoords={box.position} endCoords={boxes.find((b) => b.id === box.parentId)?.position} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default App;
