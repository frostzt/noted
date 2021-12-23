import React from 'react';
import { CheckCircleIcon as CheckCircleIconOutline } from '@heroicons/react/outline';
import { CheckCircleIcon as CheckCircleIconSolid, TrashIcon } from '@heroicons/react/solid';

import TaskStatus from '../../enums/TaskStatus.enum';

interface CardProps {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  deleteTask: (id: string) => void;
  updateTask: (id: string, status: TaskStatus) => void;
}

const Card: React.FC<CardProps> = ({ id, title, description, status, deleteTask, updateTask }) => {
  return (
    <div className="p-4 bg-rose-500 rounded flex flex-col mb-5">
      <h3 className="font-bold mb-4 text-lg text-slate-50">{title}</h3>
      <p className="text-slate-100">{description}</p>
      <div className="text-slate-50 self-end mt-4 flex">
        <div className="w-5 h-5 cursor-pointer" onClick={() => updateTask(id, status)}>
          {status === TaskStatus.DONE && <CheckCircleIconSolid />}
          {status === TaskStatus.OPEN && <CheckCircleIconOutline />}
        </div>
        <div className="w-5 h-5 cursor-pointer" onClick={() => deleteTask(id)}>
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};

export default Card;
