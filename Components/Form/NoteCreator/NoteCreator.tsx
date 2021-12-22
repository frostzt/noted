import React from 'react';

import Button from '../../Button/Button';
import FormInput from '../FormInput/FormInput';

interface NoteCreatorProps {
  title: string;
  titleHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
  descriptionHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  submitHandler: (e: React.ChangeEvent<HTMLFormElement>) => void;
  handler: () => void;
}

const NoteCreator: React.FC<NoteCreatorProps> = ({
  title,
  titleHandler,
  description,
  descriptionHandler,
  submitHandler,
  handler,
}) => {
  return (
    <div className="w-full h-full fixed top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 shadow-lg shadow-indigo-500/50 text-slate-50 px-4 py-4 z-50 flex justify-center flex-col">
      <h3 className="font-bold text-2xl mb-4 text-center">Take a note!</h3>
      <form onSubmit={submitHandler} className="md:w-3/4 md:mx-auto lg:w-2/4 2xl:w-2/5">
        <FormInput
          value={title}
          label="Title"
          name="form-title"
          placeholder="What do you want to do?"
          type="text"
          required
          setValue={titleHandler}
          className="mb-4 text-slate-900"
        />
        <label htmlFor="form-description" className="block text-base font-medium text-slate-50">
          Description
        </label>
        <textarea
          rows={10}
          cols={30}
          value={description}
          name="form-description"
          onChange={descriptionHandler}
          required
          placeholder="Describe this task in a bit more depth..."
          className="placeholder:italic placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md outline-none py-2 px-4 text-slate-900"
        ></textarea>
        <div className="flex mt-5 justify-evenly">
          <Button className="!bg-slate-50 text-indigo-500">Get it Noted!</Button>
          <Button div={true} handler={handler} className="!bg-slate-50 text-indigo-500">
            Discard
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoteCreator;
