export interface News {
  id: number;
  date: string;
  status: string;
  title: string;
  content: string;
  mediumImage: string;
  thumbnailImage: string;
  author: {
    href: string;
  },
}
