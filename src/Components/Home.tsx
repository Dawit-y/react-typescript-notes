import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

type EditTagsModalProps = {
  availableTags: Tag[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

export function Home({
  availableTags,
  notes,
  onDeleteTag,
  onUpdateTag,
}: NoteListProps) {
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
  }, [title, notes, selectedTags]);

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
          <button
            className="mt-2 mr-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              const modalElement = document.getElementById("my_modal_2");
              if (modalElement instanceof HTMLDialogElement) {
                modalElement.showModal();
              } else {
                console.error(
                  "Element with ID 'my_modal_2' does not exist or is not a HTMLDialogElement."
                );
              }
            }}
          >
            Edit Tags
          </button>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4">
        <div className="">
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

        <div className="">
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
            className="max-w-sm rounded overflow-hidden shadow-lg ring-1 ring-inset ring-gray-300"
            key={note.id}
          >
            <Link to={`/${note.id}`}>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{note.title}</div>
              </div>
              <div className="px-6 pt-4 pb-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>

      <EditTagsModal
        availableTags={availableTags}
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
      />
    </>
  );
}

function EditTagsModal({
  availableTags,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Tags</h3>
          <div className="p-3 w-full">
            {availableTags.map((tag) => {
              return (
                <div
                  key={tag.id}
                  className="w-full flex items-center justify-around mb-3 "
                >
                  <input
                    className="w-[80%] px-3.5 py-2.5 outline-1 outline-indigo-600 ring-1 ring-inset ring-gray-300 rounded-md"
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  />

                  <button
                    onClick={() => onDeleteTag(tag.id)}
                    className="rounded-md px-3.5 py-2.5 border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
