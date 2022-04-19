export interface IChatMessageProps {
  text: string;
}

export interface IChatboxProps {
  isOpen: boolean;
  openCloseChat: () => void;
}
