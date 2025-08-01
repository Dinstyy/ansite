"use client";
import { useState, useEffect, type FC } from "react";
import CardProject from "@/components/Card/card-project";
import { projects } from "@/utils/datas";

const ListProject: FC = () => {
  const [numToShow, setNumToShow] = useState(6);
  const [loading, setLoading] = useState([]);

  const dataArray = Object.keys(projects).map((key) => {
    return { id: key, ...projects[key] };
  });

  const sortedData = [...dataArray].sort((a, b) => (a.id < b.id ? 1 : -1));

  const handleShowMore = () => {
    setNumToShow(numToShow + 6);
  };

  useEffect(() => {
    if (numToShow > sortedData.length) {
      setNumToShow(sortedData.length);
    }
  }, [numToShow, sortedData.length]);

  const shouldShowMore = () => {
    return numToShow < sortedData.length;
  };

  const handleShowLess = () => {
    setNumToShow(6);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4 xl:grid-cols-3">
        {sortedData.slice(0, numToShow).map((data, index) => (
          <div
            key={data.id}
            className="translate-y-0 cursor-pointer transition-all duration-300 hover:-translate-y-2"
          >
            <CardProject
              loading={loading[index]}
              setLoading={(value) => {
                setLoading((prevLoading) => {
                  const newLoading = [...prevLoading];
                  newLoading[index] = value;
                  return newLoading;
                });
              }}
              name={data.name}
              github={data.repo}
              web={data.web}
              image={data.image}
              desc={data.desc}
              stack={data.stack}
              gif={data.gif}
            />
          </div>
        ))}
      </div>
      <button
        onClick={shouldShowMore() ? handleShowMore : handleShowLess}
        className="rounded-[4px] border-2 border-purple-500 px-7 py-4 font-mono text-purple-500 transition-all duration-300 hover:bg-purple-500 hover:bg-opacity-10"
      >
        {shouldShowMore() ? "Show More" : "Show Less"}
      </button>
    </div>
  );
};

export default ListProject;
