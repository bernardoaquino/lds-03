import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Option } from '../components/Atoms/FormField/Select';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */

type UseCourseListResponse = {
  courses?: Option[];
  isLoading: boolean;
  error: boolean;
  refetch: Function;
}

const BASE_API_URL = `${process.env.REACT_APP_API_BASE_URL}/course`;

export const useCoursesList = (institutionId?: string): UseCourseListResponse => {
  const { session } = useSession();
  const [courses, setCourses] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getCoursesData = useCallback(async (keepIsLoadingState = false, institutionId?: number) => {
    !keepIsLoadingState && setIsLoading(true);

    const responseData = await fetch(`${BASE_API_URL}/${institutionId}`, {
        headers: session.authHeaders
    })

    if (responseData.status === 200) {
        const _courses: any[] = (await responseData.json())?.courses;

        const mappedCourses: Option[] = _courses?.map(course => ({
          label: course.nome as string,
          value: course.id as number
        }))

        setCourses(mappedCourses);
        setError(false);
    } else {
        setError(true);
        toast.error('Ocorreu um erro ao recuperar os dados');
    }

    setIsLoading(false);
  }, [session.authHeaders]);

  useEffect(() => {
    if (institutionId) {
      getCoursesData(false, Number(institutionId));
    }
  }, [getCoursesData, institutionId]);

  return {
    courses,
    isLoading,
    error,
    refetch: (newInstitutionId: number) => getCoursesData(true, newInstitutionId),
  };
}
