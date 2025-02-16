import { Image } from './image';

type MediaNode = {
  preview: {
    image: Image;
  };
};

export type Media = {
  nodes: MediaNode[];
};
