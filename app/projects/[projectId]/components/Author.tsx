"use client";

import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { addAuthorValidate } from "@/lib/validation";
import { AddAuthorsValues } from "@/types/index";

const Author = () => {
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  const initialValues: AddAuthorsValues = { email: email };

  const removeMember = (emailToRemove: String) => {
    setMembers(members.filter((member) => member !== emailToRemove));
  };

  const SubmitForm = (
    values: any,
    actions: FormikHelpers<AddAuthorsValues>
  ) => {
    console.log(values.email);
    
    if (!values.email){
      actions.setErrors({email:"Please enter valiid email address"})
    } else if (members.includes(values.email, 0) == false) {
      setMembers([...members, values.email]);
      setEmail("");
      actions.resetForm();
    } else
    actions.setErrors({ email: "Email already exists" })}

  return (
    <div className="h-screen  text-neutral-50">
      <Board />
      <div className="bg-white w-full">
        <Formik
          initialValues={initialValues}
          validate={addAuthorValidate}
          onSubmit={SubmitForm}
        >
          {() => (
            <Form className="pt-4">
              <div className=" flex items-center mx-2 bg-slate-200 border border-black rounded-sm ">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter their email"
                  className=" w-full bg-slate-200 text-black border-none focus:border-none focus:ring-0 focus:outline-none "
                />

                <button
                  className="bg-black text-white rounded-md text-xs p-2 mx-2"
                  type="submit"
                >
                  Add
                </button>
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-900 pl-2 pt-2"
              />
            </Form>
          )}
        </Formik>

        <div className="w-full pb-4 mt-4 bg-white space-y-2 flex flex-col">
          {members.map((member, index) => (
            <div
              className=" mx-2 h-8 flex items-center  text-black bg-green-300 rounded-md pl-4 border border-dashed border-green-400 "
              key={index}
            >
              <span>{member}</span>

              <div className="w-full flex flex-col" >
                <button
                  type="button"
                  className="self-end w-3  rounded-tr-sm rounded-br-sm bg-gray-200 text-black text-lg "
                  onClick={() => removeMember(member)}
                >
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <div>
      <div className="flex flex-col h-full w-full gap-3 overflow-auto m-4">
        <Column
          title="Authors"
          column="Authors"
          headingColor="text-green-900"
          cards={cards}
          setCards={setCards}
        />
        {/* <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      /> */}
      </div>
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-white">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
};

const Card = ({ title, id, column, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-700 bg-white p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-black">{title}</p>
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 pt-0.5 w-full bg-black opacity-0"
    />
  );
};

type ColumnType = "Authors" | "todo";

type CardType = {
  title: string;
  id: string;
  column: ColumnType;
};

const DEFAULT_CARDS: CardType[] = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "Authors" },
  { title: "SOX compliance checklist", id: "2", column: "Authors" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "Authors" },
  { title: "Document Notifications service", id: "4", column: "Authors" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },
];
export default Author;
