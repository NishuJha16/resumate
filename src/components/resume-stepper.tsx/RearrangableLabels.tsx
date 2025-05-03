import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/material";

const RearrangableLabels = ({
  onDragEnd,
  formSteps,
  activeStep,
  updateStep,
}: any) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="steps">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            className="flex flex-col text-xs  pt-4 bg-[white] dark:bg-[rgb(24,124,120,0.2)] "
          >
            {formSteps?.map((value: any, index: number) => (
              <Draggable
                key={`${value.id}-${index}`}
                draggableId={`${value.id}-${index}`}
                index={index}
              >
                {(provided) => (
                  <Box
                    key={index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex gap-1 px-6 p-2 items-center cursor-pointer hover:bg-[rgb(245,124,6,0.07)] ${
                      value.id === activeStep &&
                      "bg-[rgb(245,124,6,0.2)] font-bold"
                    }`}
                    onClick={() => updateStep(value.id)}
                  >
                    <Menu fontSize="small" color="primary" />
                    <Box>{value.label}</Box>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default RearrangableLabels;
