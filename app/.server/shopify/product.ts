import { Media } from './media';

export type Product = {
  id: string | null;
  title: string;
  type: string | null;
  untranslatedTitle: string | null;
  url: string | null;
  vendor: string;
  media: Media;
  variantsCount: {
    count: number;
  };
};
