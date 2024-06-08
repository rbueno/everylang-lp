/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/R3NZGW0kLgz
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"

export function RecordAudio() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8">
      <div className="text-4xl font-bold" />
      <Button className="bg-gray-900 text-white rounded-full p-8 hover:bg-gray-900/80 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:bg-gray-50 dark:hover:bg-gray-50/80 dark:focus:ring-gray-50">
        <CircleStopIcon className="h-8 w-8" />
      </Button>
      <div className="flex flex-col items-center space-y-4">
        <audio controls src="" />
        <div className="flex space-x-4">
          <Button className="bg-gray-900 text-white rounded-md px-6 py-2 hover:bg-gray-900/80 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:bg-gray-50 dark:hover:bg-gray-50/80 dark:focus:ring-gray-50">
            Send
          </Button>
          <Button className="border border-gray-300 rounded-md px-6 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-700 dark:hover:bg-gray-800">
            Discard
          </Button>
        </div>
      </div>
    </div>
  )
}

function CircleStopIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <rect width="6" height="6" x="9" y="9" />
    </svg>
  )
}