import React from "react";
import { IconButton } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

export type DeleteTaskButtonProps = {
  onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
};

export const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({
  onClick,
}) => {
  return (
    <IconButton color="red" onClick={onClick}>
      <TrashIcon width={16} height={16} />
    </IconButton>
  );
};
