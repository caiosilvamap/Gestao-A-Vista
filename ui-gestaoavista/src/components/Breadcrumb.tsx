import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
  sinter?: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {

  useEffect(() => {

  }, []);

  return (<>
    {/* <div className={`${bgSinter}  text-white px-2 py-4 rounded-lg mb-2 text-title-lg font-bold`} >Sinter</div>*/}
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/"> Home /</Link>
          </li>
          <li className="text-primary">{pageName} </li>
        </ol>
      </nav>
    </div>
  </>
  );
};

export default Breadcrumb;
