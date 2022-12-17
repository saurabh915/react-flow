import { useCallback } from 'react';
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
// import { Handle } from 'reactflow';


const initialNodes = [
  { id: '1', position: { x: 600, y: 0 }, data: { label: 'HOME PAGE' } },
  { id: '2', position: { x: 300, y: 100 }, data: { label: 'About me' } },
  { id: '3', position: { x: 900, y: 100 }, data: { label: 'Contact' } },
  { id: '4', position: { x: 600, y: 100 },  data: null,    style: {
    width: 170,
    height: 170,backgroundColor: '#9acd32',
  },},
  { id: '5', position: { x: 8, y: 8 }, data: { label: 'project-1' } , parentNode: '4',
  extent: 'parent',},
  { id: '6',position: { x: 8, y: 58 }, data: { label: 'project-2' } ,parentNode: '4',
  extent: 'parent', },
  { id: '7', position: { x: 8, y: 108 }, data: { label: 'project-3' }, parentNode: '4',
  extent: 'parent', },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e1-4', source: '1', target: '4' },
    // { id: 'e4-5', source: '4', target: '5' },
    { id: 'e5-6', source: '5', target: '6' },
    { id: 'e6-7', source: '6', target: '7' },
    
    // { id: 'e1-3', source: '1', target: '3' }
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


const targetHandleWithValidation = (
    <Handle
      type="target"
      position="left"
      isValidConnection={(connection) => connection.source === 'some-id'}
      onConnect={(params) => console.log('handle onConnect', params)}
      style={{ background: '#fff' }}
    />
  );
  return (
    <>
   
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
  
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
    </>
   
  );
}

export default Flow