import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Project() {
  const initialData = {
    tasks: {
      "task-1": { id: "task-1", content: "Take out the garbage" },
      "task-2": { id: "task-2", content: "Watch my favorite show" },
      "task-3": { id: "task-3", content: "Charge my phone" },
      "task-4": { id: "task-4", content: "Cook dinner" },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: ["task-1", "task-2", "task-3", "task-4"],
      },
    },
    columnOrder: ["column-1"],
  };

  const onDragEnd = (result: any) => {};

  return (
    <div className="w-full text-orange-600 font-semibold h-full bg-blue-200">
      Project
      <DragDropContext onDragEnd={onDragEnd}>
        {initialData.columnOrder.map((columnId) => {
          const column: any = initialData.columns[columnId];
          const tasks: any = column.taskIds.map(
            (taskId) => initialData.tasks[taskId]
          );
          return (
            <div key={column.id} className=" border border-black bg-orange-200">
              <h3 className="font-semibold p-8">{column.title}</h3>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div className="bg-green-100 p-2">
                    innerRef={provided.innerRef}
                    {/* {...provided.droppableProps} */}
                    {tasks.map((task: any) => (
                      <div
                        key={task.id}
                        className="m-3 p-1 bg-yellow-200 border border-black rounded-sm flex justify-center"
                      >
                        {task.content}
                      </div>
                    ))}
                  </div>
                )}
              </Droppable>
              ,
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
