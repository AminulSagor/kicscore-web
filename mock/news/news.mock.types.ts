export interface NewsParagraphMock {
  id: string;
  text: string;
}

export interface NewsSectionMock {
  id: string;
  title: string;
  paragraphs: NewsParagraphMock[];
}

export interface NewsItemMock {
  id: string;
  title: string;
  description: string;
  time: string;
  source: string;
  image: string;
  isFeatured?: boolean;
  category: string;
  publishedDate: string;
  author: string;
  detailImage: string;
  detailSections: NewsSectionMock[];
}