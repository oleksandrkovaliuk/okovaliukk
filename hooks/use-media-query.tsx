import * as React from "react";

export function useMediaQuery(query: string) {
  const [isMatched, setIsMatched] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mql = window.matchMedia(query);

    const onChange = (event: MediaQueryListEvent) => {
      setIsMatched(event.matches);
    };

    setIsMatched(mql.matches);

    mql.addEventListener("change", onChange, { passive: true });

    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return isMatched;
}
