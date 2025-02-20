import Link from 'next/link'
import Image from 'next/image'

export const metadata={
  title:"Page not found",
}
export default function NotFound() {
  return (
    <div className='px-2 w-full'>
      <div className='mx-auto py-4 flex flex-col justify-center items-center gap-4'>
        <h2 className='text-2xl'>Page Not NotFound</h2>
        <Image 
        className='m-0 rounded-xl'
        src='/images/not-found-1024x1024.png'
        width={300}
        height={300}
        sizes="300px"
        alt="Page Not Found"
        priority={true}
        title="Page Not found"
        /> 
      </div>  
      <Link href="/tickets" className="text-center hover:underline">
        <h3>Go Home</h3>
      </Link>  
    </div>
  )
}