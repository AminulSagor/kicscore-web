export interface AdminNewsItem {
  id: string;
  uuid: string;
  title: string;
  description: string;
  snippet: string;
  keywords: string;
  imageUrl: string;
  publishedAt: string;
  url: string;
  categories: string[];
  language: string;
  locale: string;
  source: string;
  mappedEntities: unknown[];
  relevanceScore: number;
}

export interface AdminNewsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAdminNewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    articles: AdminNewsItem[];
    pagination: AdminNewsPagination;
  };
  timestamp: string;
  path: string;
}
