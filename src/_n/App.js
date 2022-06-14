
import { useState } from 'react'


import { parse } from '@babel/parser'

import Node from './Node'

function App() {

  const [code, setCode ] = useState('const a = null')
  const [nodes, setNodes] = useState(renderNodes(code))

  function renderNodes(_code) {
    try {
      const ast = parse(_code, { errorRecovery: true, createParenthesizedExpressions: true}) 
      
      return ast.program.body
    } catch(e) {
      console.error('ast err : ', e);
      return null
    }
  }

  function onTextChange(e) {
    const text = e.target.value
    setCode(text)
    const _nodes = renderNodes(text)
    if(_nodes) setNodes(_nodes)

  }

  return (
    <div className="w-screen h-screen">
      <div className=" bg-slate-600 w-full h-4/5">
        {
          nodes.map(node => <Node node={node}/>)
        }
      </div>
      <div className="w-full h-1/5 bg-white">
        <textarea className="w-full h-full px-6" value={code} onChange={onTextChange}></textarea>
      </div>
    </div>
    
  );
}

export default App;
