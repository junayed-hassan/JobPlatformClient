/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const JobCard = ({ job }) => {
  return (
    <Link
      to={`/job/${job._id}`}
      className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all'
    >
      <div className='flex items-center justify-between'>
        <span className='text-xs font-light text-gray-800 '>
          Deadline: {format(new Date(job?.dateLine), 'P')}
        </span>
        <span className='px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full '>
          Web Development
        </span>
      </div>

      <div>
        <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
          {job?.job_title}
        </h1>

        <p className='mt-2 text-sm text-gray-600 '>
          Dramatically redefine bleeding-edge infrastructures after
          client-focused value. Intrinsicly seize user-centric partnerships
          through out-of-the-box architectures. Distinctively.
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>
          Range: $500 - $600
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>Total Bids: {job?.total_bids}</p>
      </div>
    </Link>
  )
}

export default JobCard
