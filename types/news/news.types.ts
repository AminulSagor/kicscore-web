export interface NewsEntity {
  type?: string | null;
  name?: string | null;
  confidence?: number | null;
  matchedText?: string | null;
}

export interface NewsArticle {
  id: string;
  uuid?: string | null;
  title: string;
  description?: string | null;
  keywords?: string | null;
  snippet?: string | null;
  url?: string | null;
  imageUrl?: string | null;
  language?: string | null;
  publishedAt?: string | null;
  source?: string | null;
  categories?: string[];
  locale?: string | null;
  relevanceScore?: number | null;
  mappedEntities?: NewsEntity[];
}

export interface NewsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface NewsResponseData {
  articles: NewsArticle[];
  pagination: NewsPagination;
}

export interface NewsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: NewsResponseData;
  timestamp: string;
  path: string;
}

export interface GetNewsParams {
  page?: number;
  limit?: number;
}

//similar news
export interface SimilarNewsData {
  article: NewsArticle;
  similar: NewsArticle[];
}

export interface SimilarNewsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SimilarNewsData;
  timestamp: string;
  path: string;
}
