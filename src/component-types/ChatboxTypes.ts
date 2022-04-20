export interface IChatMessageProps {
  text: string;
}

export interface IChatboxProps {
  isOpen: boolean;
  initialOpening: boolean;
  openCloseChat: () => void;
}
