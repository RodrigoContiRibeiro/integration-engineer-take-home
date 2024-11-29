import React from "react";
import { IconButton } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

export type DeleteTaskButtonProps = {
  onClick: (evt: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

export const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({
  onClick,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const clickHandler = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);

    await onClick(evt);

    setLoading(false);
  };

  return (
    <IconButton color="red" onClick={clickHandler} loading={loading}>
      <TrashIcon width={16} height={16} />
    </IconButton>
  );
};
