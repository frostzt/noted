import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import toast from 'react-hot-toast';
import { PlusCircleIcon } from '@heroicons/react/outline';
import React, { useEffect, useContext, useState } from 'react';

import Card from '../../Components/Card/Card';
import Layout from '../../Components/Layout/Layout';
import TaskStatus from '../../enums/TaskStatus.enum';
import AuthContext from '../../contexts/Auth.context';
import NoteCreator from '../../Components/Form/NoteCreator/NoteCreator';

interface ITask {
  title: string;
  status: TaskStatus;
  description: string;
}

const NotesPage = () => {
  let i = 0;
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const { authToken, isAuthenticated } = useContext(AuthContext);

  // Form
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleIsCreating = () => setIsCreating((prev) => !prev);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
  const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset stuff
    handleIsCreating();
    setTitle('');
    setDescription('');

    try {
      const config = { headers: { Authorization: `Bearer ${authToken}` } };
      const data = { title, description };
      await axios.post(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/tasks`, data, config);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${authToken}` } };
        const response = await axios.get(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/tasks`, config);
        setTasks(response.data);
      } catch (error: any) {
        if (error.response.data.statusCode !== 401) {
          toast.error(error.response.data.message);
        }
      }
    };

    if (!isCreating) {
      fetchData();
    }
  }, [authToken, isCreating]);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.replace('/auth/login');
    }
  }, [isAuthenticated]);

  return (
    <Layout className="px-8 py-4 xl:w-3/4 xl:mx-auto 2xl:w-3/5">
      <Head>
        <title>Your Notes - Noted</title>
      </Head>
      {isCreating && (
        <NoteCreator
          description={description}
          title={title}
          titleHandler={handleTitleChange}
          descriptionHandler={handleDescriptionChange}
          handler={handleIsCreating}
          submitHandler={handleFormSubmit}
        />
      )}
      <div className="bg-slate-50 absolute bottom-6 left-1/2 -translate-x-2/4 cursor-pointer flex items-center py-2 px-4 rounded-full">
        <div className="text-slate-900 h-8 w-8 mr-4">
          <PlusCircleIcon />
        </div>
        <p className="text-slate-900 whitespace-nowrap" onClick={handleIsCreating}>
          New note
        </p>
      </div>
      <div className="mt-10">
        {tasks.length > 0 &&
          tasks.map((task) => <Card key={i++} title={task.title} description={task.description} status={task.status} />)}
      </div>
    </Layout>
  );
};

export default NotesPage;
