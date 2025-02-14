"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

type Project = {
  id: string;
  name: string;
  description: string;
  raised: number;
  contributors: number;
  category: string;
};

const ProductPage = ({ params }: { params: { id: string } }) => {
  console.log(params);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.post(`/api/product`, { id: params.id });
        console.log(response.data);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching pro:', error);
      }
    };

    fetchProject();
  }, [params.id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-black'>{project?.name}</h1>

      {/* <p>{project?.description}</p>
      <p>Raised: ${project?.raised}</p>
      <p>Contributors: {project?.contributors}</p>
      <p>Category: {project?.category}</p> */}
    </div>
  );
};

export default ProductPage;

