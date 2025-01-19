import { useQuery } from "@tanstack/react-query"
import axios from "axios"


function useJobs() {
  const { data: jobs = [] } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const data = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`)
      return data
    },
  })

  return jobs
}

export default useJobs