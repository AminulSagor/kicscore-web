"use client";

import { useEffect, useRef, useState } from "react";

import { mapFootballSearchResults } from "@/components/layout/navbar/_utils/football-search.mapper.utils";
import { searchFootballData } from "@/service/search/football-search.service";
import type {
  FootballSearchResult,
  SearchCategory,
} from "@/types/search/football-search.types";

const MINIMUM_SEARCH_QUERY_LENGTH = 3;
const SEARCH_DEBOUNCE_DELAY = 350;
const SEARCH_CACHE_LIMIT = 30;

type UseNavbarSearchParams = {
  query: string;
  activeCategory: SearchCategory;
  enabled: boolean;
};

type SearchState = {
  key: string;
  status: "idle" | "loading" | "success" | "error";
  items: FootballSearchResult[];
  error: string | null;
};

//======= Build Search Key =======//
const buildSearchKey = (category: SearchCategory, query: string) => {
  return `${category}:${query.trim().toLowerCase()}`;
};

//======= Add Results To Cache =======//
const addResultsToCache = (
  cache: Map<string, FootballSearchResult[]>,
  key: string,
  results: FootballSearchResult[],
) => {
  if (cache.size >= SEARCH_CACHE_LIMIT) {
    const oldestKey = cache.keys().next().value;

    if (oldestKey) {
      cache.delete(oldestKey);
    }
  }

  cache.set(key, results);
};

export const useNavbarSearch = ({
  query,
  activeCategory,
  enabled,
}: UseNavbarSearchParams) => {
  const trimmedQuery = query.trim();
  const hasMinimumQuery = trimmedQuery.length >= MINIMUM_SEARCH_QUERY_LENGTH;

  const [debouncedQuery, setDebouncedQuery] = useState(trimmedQuery);
  const [searchState, setSearchState] = useState<SearchState>({
    key: "",
    status: "idle",
    items: [],
    error: null,
  });

  const cacheRef = useRef<Map<string, FootballSearchResult[]>>(new Map());

  const currentSearchKey = buildSearchKey(activeCategory, trimmedQuery);

  //======= Debounce Query =======//
  useEffect(() => {
    const delay = hasMinimumQuery ? SEARCH_DEBOUNCE_DELAY : 0;

    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(trimmedQuery);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [hasMinimumQuery, trimmedQuery]);

  //======= Fetch Search Results =======//
  useEffect(() => {
    const isQueryReady =
      enabled &&
      debouncedQuery.length >= MINIMUM_SEARCH_QUERY_LENGTH &&
      debouncedQuery === trimmedQuery;

    if (!isQueryReady) return;

    const searchKey = buildSearchKey(activeCategory, debouncedQuery);
    const cachedResults = cacheRef.current.get(searchKey);
    const controller = new AbortController();

    /*
      Schedule state updates outside the synchronous effect body.
      This preserves the current UX while satisfying React's rule.
    */
    const requestTimeoutId = window.setTimeout(() => {
      if (cachedResults !== undefined) {
        setSearchState({
          key: searchKey,
          status: "success",
          items: cachedResults,
          error: null,
        });

        return;
      }

      setSearchState({
        key: searchKey,
        status: "loading",
        items: [],
        error: null,
      });

      const fetchSearchResults = async () => {
        try {
          const sourceData = await searchFootballData({
            query: debouncedQuery,
            category: activeCategory,
            signal: controller.signal,
          });

          if (controller.signal.aborted) return;

          const results = mapFootballSearchResults({
            query: debouncedQuery,
            category: activeCategory,
            sourceData,
          });

          addResultsToCache(cacheRef.current, searchKey, results);

          setSearchState({
            key: searchKey,
            status: "success",
            items: results,
            error: null,
          });
        } catch {
          if (controller.signal.aborted) return;

          setSearchState({
            key: searchKey,
            status: "error",
            items: [],
            error: "Unable to search right now. Please try again.",
          });
        }
      };

      void fetchSearchResults();
    }, 0);

    return () => {
      window.clearTimeout(requestTimeoutId);
      controller.abort();
    };
  }, [activeCategory, debouncedQuery, enabled, trimmedQuery]);

  const isWaitingForDebounce =
    enabled && hasMinimumQuery && debouncedQuery !== trimmedQuery;

  const isQueryReady =
    enabled && hasMinimumQuery && debouncedQuery === trimmedQuery;

  const isCurrentSearchState = searchState.key === currentSearchKey;

  const results =
    isQueryReady && isCurrentSearchState && searchState.status === "success"
      ? searchState.items
      : [];

  const error =
    isQueryReady && isCurrentSearchState && searchState.status === "error"
      ? searchState.error
      : null;

  const isLoading =
    isWaitingForDebounce ||
    (isQueryReady &&
      (!isCurrentSearchState || searchState.status === "loading"));

  return {
    results,
    error,
    isLoading,
    minimumQueryLength: MINIMUM_SEARCH_QUERY_LENGTH,
  };
};
