import Link from 'next/link';
import React from 'react'
import { MdOutlinePostAdd } from "react-icons/md";

function PostjobBtn() {
  return (
   <>
   <Link href={'/Recruiter/dashboard'} className='post-job-btn'>POST JOB<MdOutlinePostAdd className='icon-size' /></Link>
   </>
  )
}

export default PostjobBtn