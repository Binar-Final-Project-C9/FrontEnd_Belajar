// const Chapter = () => {
//     return (
//         <div className="overflow-x-auto">
//             <table className="table-auto w-full border-collapse">
//                 <thead className="bg-[#EBF3FC] on-primary-text text-sm font-normal">
//                     <tr className="h-12">
//                         <th className="px-3 py-2">No</th>
//                         <th className="px-3 py-2">Nama Chapter</th>
//                         <th className="px-3 py-2">Total Durasi</th>
//                         <th className="px-3 py-2">Link Video</th>
//                         <th className="px-3 py-2">Aksi</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {yourChapterDataArray.map((chapter, index) => (
//                         <tr className="h-12" key={index}>
//                             <td className="text-center text-xs font-bold text-[#4E5566] px-3 py-2">
//                                 {index + 1}
//                             </td>
//                             <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
//                                 {chapter.chapterName}
//                             </td>
//                             <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
//                                 {chapter.totalDuration}
//                             </td>
//                             <td className="text-center text-xs font-bold text-[#4E5566] px-3 py-2">
//                                 <a href={chapter.videoLink} target="_blank" rel="noopener noreferrer">
//                                     {chapter.videoLink}
//                                 </a>
//                             </td>
//                             <td className="text-center text-xs font-bold px-3 py-2">
//                                 <button className="bg-blue-500 px-2 py-1 rounded-md text-white mr-2">
//                                     Video
//                                 </button>
//                                 <button className="bg-green-500 px-2 py-1 rounded-md text-white" onClick={() => handleEditClick(chapter.id)}>
//                                     Ubah
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>

//     )
// }

// export default Chapter