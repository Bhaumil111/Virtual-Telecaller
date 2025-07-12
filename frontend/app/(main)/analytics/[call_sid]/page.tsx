import dbConnect from "@/lib/mongodb";
import Item from "@/models/Item";


import Link from "next/link";

type MessageProps = {
    label: string,
    text: string,
}



// export default async function AnalyticsDetailPage({ params }: AnalyticsSidProps) {
export default async function AnalyticsDetailPage({params}:{params: Promise<{call_sid:string}>}){

    const { call_sid } = await params;
    await dbConnect();
    const data = await Item.find({ call_sid: call_sid }).lean();


    const callText = data[0]?.call_text;
    // console.log("Call Text:", callText);
    //now make a message array where you find ai_bot and user messages
    const messages = callText.split('\n').map((line: string) => {
        const [label, text] = line.split(':');

        if (label && text) {

            return { label: label?.trim(), text: text?.trim() };
        }
        return undefined;
    }).filter(Boolean)




    if (!data) {
        return (<div className="min-h-screen flex items-center justify-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">No data found for this call SID</h3>
        </div>)
    }

    return (
        <div className="min-h-screen min-w-full  ">
            <div className='flex flex-col items-center justify-start h-screen p-1'>

                <h1 className='text-2xl font-bold dark:text-white mb-2 text-gray-950'>{call_sid}</h1>


                <div className="min-w-full max-w-2xl">


                    <div className="p-6 rounded-2xl h-[70vh] w-full overflow-y-auto">
                        {messages.map((msg: MessageProps, index:number) => (



                            <div key={index} className='mb-7 p-6 rounded-lg bg-gray-200 dark:bg-gray-700 shadow-md hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200'>
                                <strong className='bg-gray-400 dark:bg-gray-800 text-black dark:text-white font-bold p-2 rounded-md mr-3'>
                                    {msg.label}
                                </strong>

                                <span className='text-gray-900 dark:text-gray-100 text-lg'>
                                    {msg.text}
                                </span>

                            </div>
                        ))}
                    </div>

                </div>
                <div className='flex items-center justify-center mt-4'>

                        <button
                        className='bg-green-500 text-white dark:bg-green-700 px-4 py-2 rounded-md shadow-md hover:bg-green-600 dark:hover:bg-green:800 transistion-colors duration-200'>

                             <Link href='/analytics' className='text-white dark:text-white font-semibold'>
                            Go to Analytics
                            </Link> 
                            
                        </button>


                </div>






            </div>

        </div>
    )

}