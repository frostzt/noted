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
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
}

const NotesPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const data = { title, description };
      const config = { headers: { Authorization: `Bearer ${authToken}` } };
      await axios.post(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/tasks`, data, config);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  // Delete handler for notes
  const deleteThis = async (id: string) => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${authToken}` } };
      await axios.delete(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/tasks/${id}`, config);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const updateThis = async (id: string, status: TaskStatus) => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${authToken}` } };
      const data = { status: status === TaskStatus.OPEN ? TaskStatus.DONE : TaskStatus.OPEN };
      await axios.patch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/tasks/${id}/status`, data, config);
      setLoading(false);
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

    if (!isCreating && !loading) {
      fetchData();
    }
  }, [authToken, isCreating, loading]);

  useEffect(() => {
    if (!isAuthenticated) {
      Router.replace('/auth/login');
    }
  }, [isAuthenticated]);

  return (
    <Layout className="px-8 xl:w-3/4 xl:mx-auto 2xl:w-3/5 pb-16">
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
      <div className="bg-slate-50 fixed bottom-6 left-1/2 -translate-x-2/4 cursor-pointer flex items-center py-2 px-4 rounded-full text-sm lg:text-base">
        <div className="text-slate-900 h-4 w-4 mr-2">
          <PlusCircleIcon />
        </div>
        <p className="text-slate-900 whitespace-nowrap" onClick={handleIsCreating}>
          New note
        </p>
      </div>
      <div className="mt-10 md:w-3/4 md:mx-auto">
        {tasks.length > 0 &&
          tasks.map((task) => (
            <Card
              id={task.id}
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              deleteTask={deleteThis}
              updateTask={updateThis}
            />
          ))}
      </div>
    </Layout>
  );
};

export default NotesPage;
