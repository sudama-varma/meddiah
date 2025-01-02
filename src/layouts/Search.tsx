import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import {
  humanize,
  slugify,
  removeSpecialChars,
} from "@lib/utils/textConverter";
import Fuse from "fuse.js";
import { useEffect, useRef, useState } from "react";
import { BiCalendarEdit, BiCategoryAlt } from "react-icons/bi/index.js";
const { summary_length } = config.settings;

export type SearchItem = {
  slug: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = new Fuse(searchList, {
    keys: ["title", "content"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  });

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    let inputResult = inputVal.length > 2 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <div className="min-h-[45vh]">
      <input
        className="form-input w-full text-left focus:border-[#DB3334]"
        placeholder="Type here to search"
        type="text"
        name="search"
        value={inputVal}
        onChange={handleChange}
        autoComplete="off"
        autoFocus
        ref={inputRef}
      />

      {inputVal.length > 1 && (
        <div className="my-6 text-center">
          Found {searchResults?.length}
          {searchResults?.length && searchResults?.length === 1
            ? " result"
            : " results"}{" "}
          for '{inputVal}'
        </div>
      )}

      <div className="row">
        {searchResults?.map(({ item }) => (
          <div key={item.slug} className={"col-12 mb-8 sm:col-6"}>
            {item.imageUrl && (
              <a
                href={`/${item.slug}/`}
                className="rounded-lg block overflow-hidden group"
              >
                <img
                  className="group-hover:scale-[1.03] transition duration-300 w-full"
                  src={item.imageUrl}
                  alt={item.title}
                  width={445}
                  height={230}
                />
              </a>
            )}

            <h3 className="my-2 text-[#000]">
              <a
                href={`/${item.slug}/`}
                className="block transition duration-300"
              >
                {item.title}
              </a>
            </h3>
            <p className="text-text mb-1">
              {removeSpecialChars(
                item.content?.slice(0, Number(summary_length)),
              )}
              ...
            </p>
            <span className="text-primary my-4 px-3 py-0 border-primary rounded-md opacity-70 border-2 w-fit">
              {item.category && item.category.toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
