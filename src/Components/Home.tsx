import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type NoteLiatProps = {
  availableTags: Tag[];
  notes: Note[];
};

export function Home({ availableTags, notes }: NoteLiatProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, notes]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notes</h1>
        <div>
          <Link
            to="/new"
            className="mt-2 mr-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </Link>
          <button className="mt-2 mr-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Edit Tags
          </button>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-5">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Tags
          </label>
          <div className="mt-2">
            <ReactSelect
              isMulti
              name="tags"
              id="tags"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={selectedTags.map((tag) => {
                return { label: tag.label, id: tag.id };
              })}
              options={availableTags.map((tag) => {
                return { label: tag.label, id: tag.id };
              })}
              onChange={(tags) =>
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.id };
                  })
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        {filteredNotes.map((note) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-xl"
            key={note.id}
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{note.title}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
              {note.tags.map((tag) => (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
