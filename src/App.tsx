import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNote from "./Components/CreateNote";
import { Home } from "./Components/Home";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [tags, notes]);

  function onCreate({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }
  return (
    <div className="p-4 mx-64">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home availableTags={tags} notes={notesWithTags} />}
          />
          <Route
            path="new"
            element={
              <CreateNote
                onSubmit={onCreate}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
