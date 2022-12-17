import '../node_modules/react-flow-renderer/dist/style.css';

import ColorSelectorNode from './ColorSelectorNode';
import ColorName from './ColorName';
import  { useCallback,useState,useEffect,useMemo } from 'react';
import './index.css';
import ReactFlow, {
  MiniMap,
  Handle,
  Controls,
  Background,
  
  useNodesState,
  useEdgesState,
  addEdge,
//   removeElements,
} from 'react-flow-renderer';
import TextUpdaterNode from './TextUpdaterNode';
const initBgColor = '#008000';

const connectionLineStyle = { stroke: '#0FFF' };
const snapGrid = [20, 20];

 


const CustomNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2' && node.id !== '3') {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        })
      );
    };

    setNodes([
      {
        id: '1',
        type: 'input',
        data: { label: 'An input node' },
        position: { x: 0, y: 50 },
        sourcePosition: 'right',
      },
      {
        id: '2',
        type: 'selectorNode',
        data: { onChange: onChange, color: initBgColor },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 300, y: 50 },
        draggable:'true',
      },
      {
        id: '3',
        type: 'selectorNode2',
        data: { label: bgColor },
        position: { x: 650, y: 25 },
        targetPosition: 'left',
        
      },
      {
        id: '4',
        type: 'output',
        data: { label: 'Output B' },
        position: { x: 650, y: 100 },
        targetPosition: 'left',
      },
      { id: 'node-1', type: 'textUpdater', position: { x: 330, y: -20 }, data: { value: 123 } },
    ]);

    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        targetHandle:'m',
        animated: true,
        style: { stroke: '#fff' },
      },
      {
        id: 'e2b-4',
        source: '2',
        target: '4',
        sourceHandle: 'b',
        animated: true,
        style: { stroke: '#fff' },
      },
    ]);
  });

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    []
  );
  const nodeTypes = useMemo(
    () => ({ 
      selectorNode: ColorSelectorNode
      ,selectorNode2: ColorName
    ,textUpdater: TextUpdaterNode
    }
      // eslint-disable-next-line
      ), []); 
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: bgColor }}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultZoom={1.5}
      fitView
      attributionPosition="bottom-left"
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'selectorNode') return bgColor;
          if (n.type === 'output') return '#ff0072';
        }}
        nodeColor={(n) => {
          if (n.type === 'selectorNode') return bgColor;
          return '#fff';
        }}
      />
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;