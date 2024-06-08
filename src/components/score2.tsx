/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZUT1l0zQQlx
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Pronunciation Score</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">87</span>
            <span className="text-gray-500 dark:text-gray-400">/ 100</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative h-6 w-full rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className="absolute left-0 h-full rounded-full bg-gradient-to-r from-[#FFD600] to-[#FF9500] w-[87%]"
              title="Excellent"
            >
              <div className="flex h-full items-center justify-end pr-2">
                <span className="text-gray-50">🎉</span>
              </div>
            </div>
            <div
              className="absolute left-0 h-full rounded-full bg-gradient-to-r from-[#FF9500] to-[#FF6B00] w-[12%]"
              title="Good"
            >
              <div className="flex h-full items-center justify-end pr-2">
                <span className="text-gray-50">👍</span>
              </div>
            </div>
            <div
              className="absolute left-0 h-full rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF3B00] w-[1%]"
              title="Needs Improvement"
            >
              <div className="flex h-full items-center justify-end pr-2">
                <span className="text-gray-50">😕</span>
              </div>
            </div>
            <div
              className="absolute left-0 h-full rounded-full bg-gradient-to-r from-[#FF3B00] to-[#FF0000] w-[0%]"
              title="Poor"
            >
              <div className="flex h-full items-center justify-end pr-2">
                <span className="text-gray-50">😞</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}