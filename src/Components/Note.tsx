import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};

const Note = ({ onDelete }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-mono">{note.title}</h1>
        <div className="flex items-center justify-between">
          <Link
            to={`/${note.id}/edit`}
            className="mt-2 mr-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </Link>
          <button
            onClick={() => {
              onDelete(note.id);
              navigate("/");
            }}
            className="mt-2 mr-2 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>
          <Link
            to="/"
            className="mt-2 mr-2 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="mt-3 p-2">
        {note.tags.map((tag) => (
          <span
            key={tag.id}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {tag.label}
          </span>
        ))}
      </div>

      <ReactMarkdown className="mt-3 p-2">{note.markdown}</ReactMarkdown>
    </div>
  );
};

export default Note;
