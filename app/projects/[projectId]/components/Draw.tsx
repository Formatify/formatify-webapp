"use client"

import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];

export default function Draw() {

const [stores, setStores] = React.useState(DATA)
const handleDragDrop = (result: any) => {
  const {source, destination, type} = result;
  if (!destination) return;

  if (type === 'group') {
    const renderedStores = Array.from(stores);
    
    const [removed] = renderedStores.splice(source.index, 1);
    renderedStores.splice(destination.index, 0, removed);
    setStores(renderedStores);
  }
};

  return (
    <DragDropContext onDragEnd={handleDragDrop }> 
    <div className='w-full text-orange-600 font-semibold'>Draw
    <Droppable droppableId="Root" type='group'>
    {(provided)=> (
      <div {...provided.droppableProps} ref={provided.innerRef}> 
        {stores.map((store,index) => (
      <div key={store.id} className='bg-blue-200 p-4 m-4'>
        <h2>{store.name} </h2>
        <ul>
          <Draggable draggableId={store.id} key={store.id} index={index}>
          {(provided) => (
            <div className='bg-red-200'{...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
              {store.items.map((item) => (
            <li className='bg-orange-200 border border-black rounded-sm p-2 m-3' key={item.id}>{item.name}</li>
          ))} 
            </div>
          )}
          </Draggable>
        </ul>
      </div>
    ))}
      </div>
    )}
    </Droppable>
    </div>
    </DragDropContext>
  )
}
