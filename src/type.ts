export interface testItem {
  id: number;
  question: string;
  answer: string[];
  test: string[];
}

export type testsType = {
  english_tests: testItem;
  russian_tests: testItem;
};

export type ThemeContextType = {
  theme: boolean;
  toggleTheme: () => void;
};

export type BallBoxProps = {
  total: number;
  status?: (boolean | undefined)[];
};

export type resultType = { text: string; color: string } | null;
