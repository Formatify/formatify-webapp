"use client";

import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

// The main component that renders the whole application
const Text = () => {
  return (
    <div className="h-screen text-neutral-50">
      <Board />
    </div>
  );
};

// The Board component that holds all columns and cards
const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <div className="flex flex-col h-full w-full gap-3 overflow-auto m-4">
      <Column
        title="Backlog"
        columnType="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        columnType="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};

// Type definition for ColumnProps
type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  columnType: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

// The Column component that holds and manages cards
const Column = ({
  title,
  headingColor,
  cards,
  columnType,
  setCards,
}: ColumnProps) => {
  const [isActive, setIsActive] = useState(false);

  // Handle the start of dragging a card
  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  // Handle the end of dragging a card
  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setIsActive(false);
    clearIndicators();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const beforeId = element.dataset.before || "-1";

    if (beforeId !== cardId) {
      let updatedCards = [...cards];

      let cardToMove = updatedCards.find((c) => c.id === cardId);
      if (!cardToMove) return;
      cardToMove = { ...cardToMove, columnType };

      updatedCards = updatedCards.filter((c) => c.id !== cardId);

      const moveToBack = beforeId === "-1";

      if (moveToBack) {
        updatedCards.push(cardToMove);
      } else {
        const insertAtIndex = updatedCards.findIndex((el) => el.id === beforeId);
        if (insertAtIndex === undefined) return;

        updatedCards.splice(insertAtIndex, 0, cardToMove);
      }

      setCards(updatedCards);
    }
  };

  // Handle dragging over a column
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setIsActive(true);
  };

  // Clear the visual indicators for card placement
  const clearIndicators = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  // Highlight the nearest indicator during drag over
  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearIndicators(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  // Get the nearest indicator element based on drag position
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

  // Get all indicator elements for the current column
  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${columnType}"]`
      ) as unknown as HTMLElement[]
    );
  };

  // Handle dragging leaving the column
  const handleDragLeave = () => {
    clearIndicators();
    setIsActive(false);
  };

  const filteredCards = cards.filter((c) => c.columnType === columnType);

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
          isActive ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} columnType={columnType} />
      </div>
    </div>
  );
};

// Type definition for CardProps
type CardProps = CardType & {
  handleDragStart: Function;
};

// The Card component that represents an individual task card
const Card = ({ title, id, columnType, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} columnType={columnType} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, columnType })}
        className="cursor-grab rounded border border-neutral-700 bg-white p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-black">{title}</p>
      </motion.div>
    </>
  );
};

// Type definition for DropIndicatorProps
type DropIndicatorProps = {
  beforeId: string | null;
  columnType: string;
};

// The DropIndicator component that indicates where a card can be dropped
const DropIndicator = ({ beforeId, columnType }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={columnType}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

// Type definition for ColumnType
type ColumnType = "backlog" | "todo";

// Type definition for CardType
type CardType = {
  title: string;
  id: string;
  columnType: ColumnType;
};

// Default cards data
const DEFAULT_CARDS: CardType[] = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", columnType: "backlog" },
  { title: "SOX compliance checklist", id: "2", columnType: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", columnType: "backlog" },
  { title: "Document Notifications service", id: "4", columnType: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    columnType: "todo",
  },
  { title: "Postmortem for outage", id: "6", columnType: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", columnType: "todo" },
];

export default Text;
