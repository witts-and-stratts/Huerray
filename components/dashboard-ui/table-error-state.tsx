'use client';

import { motion } from 'motion/react';

interface TableErrorStateProps {
  entity?: string;
  message?: string;
}

export function TableErrorState( { entity = 'data', message }: TableErrorStateProps ) {
  return (
    <motion.div
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
      transition={ { duration: 0.3 } }
      className="w-full p-8 text-center bg-red-50 rounded-xl border border-red-100"
    >
      <h3 className="text-lg font-medium text-red-800">Failed to load { entity }</h3>
      { message && <p className="text-sm text-red-600 mt-1">{ message }</p> }
      <button
        onClick={ () => window.location.reload() }
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Try again
      </button>
    </motion.div>
  );
}
