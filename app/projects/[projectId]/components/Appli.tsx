"use client"

import { useState, useRef } from "react";
import { Reorder } from "framer-motion";


export default function Appli() {

    const [usedComponents, setUsedComponents] = useState([
      "item 1",
      "item 2",
      "item 3",
      "item 4",
    ]);
    const [unusedComponents, setUnusedComponents] = useState([
      "item 5",
      "item 6",
      "item 7",
      "item 8",
    ]);
  
    const handleUsedReorder = (values :any) => {
      setUsedComponents(values);
    };
  
    const handleUnusedReorder = (values:any) => {
      setUnusedComponents(values);
    };


  return (
    <div className="w-full text-orange-600 bg-blue-300 h-screen font-semibold overflow-auto">
      <h2>Used Compo</h2>
      <Reorder.Group onReorder={handleUsedReorder} values={usedComponents}>
        {usedComponents.map((component) => (
          <Reorder.Item key={component} value={component} drag>
            <div key={component} className="mt-6 h-8 flex justify-center items-center bg-purple-200 w-full border border-black rounded-md">
              mai {component}
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <hr />
      <h2>Unused Compo</h2>
      <Reorder.Group onReorder={handleUnusedReorder} values={unusedComponents}>
        {unusedComponents.map((component) => (
          <Reorder.Item key={component} value={component} drag>
            <div key={component} className="mt-6 h-8 flex justify-center items-center bg-purple-200 w-full border border-black rounded-md">
              mai {component}
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      {/* Additional section for clarity */}
      <hr />
      <h2>Combined (for demonstration)</h2>
      <Reorder.Group
        onReorder={(nextOrder) => {
          // Combine used and unused based on nextOrder
          const combined = [...usedComponents, ...unusedComponents];
          const reorderedCombined = combined.slice(0, nextOrder.length);
          setUsedComponents(reorderedCombined);
          setUnusedComponents(combined.slice(nextOrder.length));
        }}
        values={[...usedComponents, ...unusedComponents]}
      >
        { [...usedComponents, ...unusedComponents].map((component) => (
          <Reorder.Item key={component} value={component} drag>
            <div key={component} className="mt-6 h-8 flex justify-center items-center bg-purple-200 w-full border border-black rounded-md">
              mai {component}
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

