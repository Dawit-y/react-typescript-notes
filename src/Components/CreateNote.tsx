import { NoteData, Tag } from "../App";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const CreateNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Create Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag}  availableTags={availableTags} />
    </div>
  );
};

export default CreateNote;
