interface IPagination {
  current: number;
  totalPage: number;
}


export const Pagination = ({ current = 1, totalPage = 10 }: IPagination) => {

  const line = (page: number, active: string) => (
    <li className={`page-item ${active}`}><a
      className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
      href="#">{page}</a></li>
  )

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item disabled"><a
            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
            href="#" aria-disabled="true">Previous</a></li>

          { new Array(totalPage).map(index => line(index, (current === index ? 'active' : ''))) }

          <li className="page-item"><a
            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  )
}