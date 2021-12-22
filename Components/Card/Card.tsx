import React from 'react';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/solid';
import { CheckCircleIcon as CheckCircleIconOutline } from '@heroicons/react/outline';

import TaskStatus from '../../enums/TaskStatus.enum';

interface CardProps {
  title: string;
  status: TaskStatus;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description, status }) => {
  return (
    <div className="p-4 bg-rose-500 rounded flex flex-col">
      <h3 className="font-bold mb-4 text-lg text-slate-50">{title}</h3>
      <p className="text-slate-100">{description}</p>
      <div className="w-6 h-6 text-slate-50 self-end mt-4">
        {status === TaskStatus.DONE && <CheckCircleIconSolid />}
        {status === TaskStatus.OPEN && <CheckCircleIconOutline />}
      </div>
    </div>
  );
};

export default Card;
