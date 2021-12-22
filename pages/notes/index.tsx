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

interface ITask {
  title: string;
  status: TaskStatus;
  description: string;
}

const NotesPage = () => {
  let i = 0;
  const [tasks, setTasks] = useState<ITask[]>([]);

  const { authToken, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${authToken}` } };
        const response = await axios.get(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/tasks`, config);
        setTasks(response.data);
        console.log(response);
      } catch (error: any) {
        if (error.status === 401) {
          Router.replace('/auth/login');
        }
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [authToken]);

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
      <div className="bg-slate-50 absolute bottom-6 left-1/2 -translate-x-2/4 cursor-pointer flex items-center py-2 px-4 rounded-full">
        <div className="text-slate-900 h-8 w-8 mr-4">
          <PlusCircleIcon />
        </div>
        <p className="text-slate-900 whitespace-nowrap">New note</p>
      </div>
      <div className="mt-10">
        {tasks.length > 0 &&
          tasks.map((task) => <Card key={i++} title={task.title} description={task.description} status={task.status} />)}
      </div>
    </Layout>
  );
};

export default NotesPage;
