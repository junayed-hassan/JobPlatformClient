import axios from "axios";
import { useQuery } from "react-query";

export default function useJobs() {
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/jobs`);
      return data;
    },
  });
  return [jobs];
}
